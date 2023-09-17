'use client'
import type { FC } from 'react'
import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import { useTranslation } from 'react-i18next'
import { useBoolean, useClickAway } from 'ahooks'
import { ChevronDownIcon, Cog8ToothIcon, InformationCircleIcon } from '@heroicons/react/24/outline'
import { Dialog } from '@mui/material'
import ParamItem from './param-item'
import ModelIcon from './model-icon'
import Radio from '@/app/components/base/radio'
import type { CompletionParams } from '@/models/debug'
import { AppType, ProviderType } from '@/types/app'
import { MODEL_LIST, TONE_LIST } from '@/config'
import Toast from '@/app/components/base/toast'
import { AlertTriangle } from '@/app/components/base/icons/src/vender/solid/alertsAndFeedback'
import { formatNumber } from '@/utils/format'
import Button from '@/app/components/base/button'
export type IConifgModelProps = {
  mode: string
  modelId: string
  setModelId: (id: string, provider: ProviderType) => void
  completionParams: CompletionParams
  onCompletionParamsChange: (newParams: CompletionParams) => void
  disabled: boolean
  canUseGPT4: boolean
  onShowUseGPT4Confirm: () => void
}

const options = MODEL_LIST

const getMaxToken = (modelId: string) => {
  if (['claude-instant-1', 'claude-2'].includes(modelId))
    return 30 * 1000

  if (['gpt-4', 'gpt-3.5-turbo-16k'].includes(modelId))
    return 8000

  return 4000
}

const ConifgModel: FC<IConifgModelProps> = ({
  mode,
  modelId,
  setModelId,
  completionParams,
  onCompletionParamsChange,
  disabled,
  canUseGPT4,
  onShowUseGPT4Confirm,
}) => {
  const { t } = useTranslation()
  const isChatApp = mode === AppType.chat
  const availableModels = options.filter(item => item.type === mode)
  const [isShowConfig, { setFalse: hideConfig, toggle: toogleShowConfig }] = useBoolean(false)
  const [maxTokenSettingTipVisible, setMaxTokenSettingTipVisible] = useState(false)
  const configContentRef = React.useRef(null)
  const currModel = options.find(item => item.id === modelId)
  // useClickAway(() => {
  //   hideConfig()
  // }, configContentRef)

  const params = [
    {
      id: 1,
      name: t('common.model.params.temperature'),
      key: 'temperature',
      tip: t('common.model.params.temperatureTip'),
      max: 2,
    },
    {
      id: 2,
      name: t('common.model.params.topP'),
      key: 'top_p',
      tip: t('common.model.params.topPTip'),
      max: 1,
    },
    {
      id: 3,
      name: t('common.model.params.presencePenalty'),
      key: 'presence_penalty',
      tip: t('common.model.params.presencePenaltyTip'),
      min: -2,
      max: 2,
    },
    {
      id: 4,
      name: t('common.model.params.frequencyPenalty'),
      key: 'frequency_penalty',
      tip: t('common.model.params.frequencyPenaltyTip'),
      min: -2,
      max: 2,
    },
    {
      id: 5,
      name: t('common.model.params.maxToken'),
      key: 'max_tokens',
      tip: t('common.model.params.maxTokenTip'),
      step: 100,
      max: getMaxToken(modelId),
    },
  ]

  const selectModelDisabled = false // chat  gpt-3.5-turbo, gpt-4; text generation text-davinci-003, gpt-3.5-turbo

  const selectedModel = { name: modelId } // options.find(option => option.id === modelId)
  const [isShowOption, { setFalse: hideOption, toggle: toogleOption }] = useBoolean(false)
  const triggerRef = React.useRef(null)
  useClickAway(() => {
    hideOption()
  }, triggerRef)

  const handleSelectModel = (id: string, provider = ProviderType.openai) => {
    return () => {
      if (id === 'gpt-4' && !canUseGPT4) {
        hideConfig()
        hideOption()
        onShowUseGPT4Confirm()
        return
      }
      const nextSelectModelMaxToken = getMaxToken(id)
      if (completionParams.max_tokens > nextSelectModelMaxToken) {
        Toast.notify({
          type: 'warning',
          message: t('common.model.params.setToCurrentModelMaxTokenTip', { maxToken: formatNumber(nextSelectModelMaxToken) }),
        })
        onCompletionParamsChange({
          ...completionParams,
          max_tokens: nextSelectModelMaxToken,
        })
      }
      setModelId(id, provider)
    }
  }

  function matchToneId(completionParams: CompletionParams): number {
    const remvoedCustomeTone = TONE_LIST.slice(0, -1)
    const CUSTOM_TONE_ID = 4
    const tone = remvoedCustomeTone.find((tone) => {
      return tone.config?.temperature === completionParams.temperature
        && tone.config?.top_p === completionParams.top_p
        && tone.config?.presence_penalty === completionParams.presence_penalty
        && tone.config?.frequency_penalty === completionParams.frequency_penalty
    })
    return tone ? tone.id : CUSTOM_TONE_ID
  }

  // tone is a preset of completionParams.
  const [toneId, setToneId] = React.useState(matchToneId(completionParams)) // default is Balanced
  // set completionParams by toneId
  const handleToneChange = (id: number) => {
    if (id === 4)
      return // custom tone
    const tone = TONE_LIST.find(tone => tone.id === id)
    if (tone) {
      setToneId(id)
      onCompletionParamsChange({
        ...tone.config,
        max_tokens: completionParams.max_tokens,
      } as CompletionParams)
    }
  }

  useEffect(() => {
    setToneId(matchToneId(completionParams))
  }, [completionParams])

  const handleParamChange = (id: number, value: number) => {
    const key = params.find(item => item.id === id)?.key

    if (key) {
      onCompletionParamsChange({
        ...completionParams,
        [key]: value,
      })
    }
  }
  const ableStyle = 'bg-indigo-25 border-[#2A87F5] cursor-pointer'
  const diabledStyle = 'bg-[#FFFCF5] border-[#F79009]'

  useEffect(() => {
    const max = params[4].max
    if (currModel?.provider !== ProviderType.anthropic && completionParams.max_tokens > max * 2 / 3)
      setMaxTokenSettingTipVisible(true)
    else
      setMaxTokenSettingTipVisible(false)
  }, [params, completionParams.max_tokens, setMaxTokenSettingTipVisible])

  return (
    <div className='relative' ref={configContentRef}>
      <div
        className={cn('flex items-center border h-8 px-2.5 space-x-2 rounded-lg', disabled ? diabledStyle : ableStyle)}
        onClick={() => !disabled && toogleShowConfig()}
      >
        <ModelIcon modelId={currModel?.id as string} />
        <div className='text-[13px] text-gray-900 font-medium'>{selectedModel.name}</div>
        {disabled ? <InformationCircleIcon className='w-3.5 h-3.5 text-[#F79009]' /> : <Cog8ToothIcon className='w-3.5 h-3.5 text-gray-500' />}
      </div>
      {isShowConfig && (
        <Dialog
          open={isShowConfig}
          onClose={hideConfig}
          title={'App Config'}

        ><>
            <div className='py-3 pl-10 pr-6 text-md'>
              <div className="flex items-center justify-between my-5 h-9">
                <div>{t('appDebug.modelConfig.model')}</div>
                {/* model selector */}
                <div className="relative" style={{ zIndex: 30 }}>
                  <div ref={triggerRef} onClick={() => !selectModelDisabled && toogleOption()} className={cn(selectModelDisabled ? 'cursor-not-allowed' : 'cursor-pointer', 'flex items-center h-9 px-3 space-x-2 rounded-lg bg-gray-50 ')}>
                    <ModelIcon modelId={currModel?.id as string} />
                    <div className="text-sm gray-900">{selectedModel?.name}</div>
                    {!selectModelDisabled && <ChevronDownIcon className={cn(isShowOption && 'rotate-180', 'w-[14px] h-[14px] text-gray-500')} />}
                  </div>
                  {isShowOption && (
                    <div className={cn(isChatApp ? 'min-w-[159px]' : 'w-[179px]', 'absolute right-0 bg-gray-50 rounded-lg shadow')}>
                      {availableModels.map(item => (
                        <div key={item.id} onClick={handleSelectModel(item.id, item.provider)} className="flex items-center h-9 px-3 rounded-lg cursor-pointer hover:bg-gray-100">
                          <ModelIcon className='shrink-0 mr-2' modelId={item?.id} />
                          <div className="text-sm gray-900 whitespace-nowrap">{item.name}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="border-b border-gray-100"></div>

              {/* Response type */}
              <div className="mt-5 mb-4">
                <div className="mb-4 text-sm text-gray-900">{t('appDebug.modelConfig.setTone')}</div>
                <Radio.Group value={toneId} onChange={handleToneChange}>
                  <>
                    {TONE_LIST.slice(0, 3).map(tone => (
                      <Radio key={tone.id} value={tone.id} className="grow !px-0 !justify-center">{t(`common.model.tone.${tone.name}`) as string}</Radio>
                    ))}
                  </>
                  <div className="ml-[2px] mr-[3px] h-5 border-r border-gray-200"></div>
                  <Radio value={TONE_LIST[3].id}>{t(`common.model.tone.${TONE_LIST[3].name}`) as string}</Radio>
                </Radio.Group>
              </div>

              {/* Params */}
              <div className="mt-4 space-y-4">
                {params.map(({ key, ...param }) => (<ParamItem key={key} {...param} value={(completionParams as any)[key] as any} onChange={handleParamChange} />))}
              </div>
              <Button className='float-right mt-4' type='primary' onClick={hideConfig}>Save</Button>
            </div>

            {
              maxTokenSettingTipVisible && (
                <div className='flex py-2 pr-4 pl-5 bg-[#FFFAEB] border-t border-[#FEF0C7]'>
                  <AlertTriangle className='shrink-0 mr-2 mt-[3px] w-3 h-3 text-[#F79009]' />
                  <div className='mr-2 text-xs font-medium text-gray-700'>{t('common.model.params.maxTokenSettingTip')}</div>
                </div>
              )
            }
          </>
        </Dialog>
      )}
    </div>

  )
}

export default React.memo(ConifgModel)
