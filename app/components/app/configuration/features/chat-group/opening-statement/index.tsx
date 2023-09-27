/* eslint-disable multiline-ternary */
'use client'
import type { FC } from 'react'
import React, { useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import { useContext } from 'use-context-selector'
import produce from 'immer'
import { useTranslation } from 'react-i18next'
import { useBoolean } from 'ahooks'
import ConfigContext from '@/context/debug-configuration'
import Panel from '@/app/components/app/configuration/base/feature-panel'
import Button from '@/app/components/base/button'
import OperationBtn from '@/app/components/app/configuration/base/operation-btn'
import { getInputKeys } from '@/app/components/base/block-input'
import ConfirmAddVar from '@/app/components/app/configuration/config-prompt/confirm-add-var'
import { getNewVar } from '@/utils/var'
import { varHighlightHTML } from '@/app/components/app/configuration/base/var-highlight'

export type IOpeningStatementProps = {
  value: string
  readonly?: boolean
  onChange?: (value: string) => void
}

// regex to match the {{}} and replace it with a span
const regex = /\{\{([^}]+)\}\}/g

const OpeningStatement: FC<IOpeningStatementProps> = ({
  value = '',
  readonly,
  onChange,
}) => {
  const { t } = useTranslation()
  const {
    modelConfig,
    setModelConfig,
  } = useContext(ConfigContext)
  const promptVariables = modelConfig.configs.prompt_variables
  const [notIncludeKeys, setNotIncludeKeys] = useState<string[]>([])

  const hasValue = !!(value || '').trim()
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const [isFocus, { setTrue: didSetFocus, setFalse: setBlur }] = useBoolean(false)
  const setFocus = () => {
    didSetFocus()
    setTimeout(() => {
      const input = inputRef.current
      if (input) {
        input.focus()
        input.setSelectionRange(input.value.length, input.value.length)
      }
    }, 0)
  }

  const [tempValue, setTempValue] = useState(value)
  useEffect(() => {
    setTempValue(value || '')
  }, [value])

  const coloredContent = (tempValue || '')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(regex, varHighlightHTML({ name: '$1' })) // `<span class="${highLightClassName}">{{$1}}</span>`
    .replace(/\n/g, '<br />')

  const handleEdit = () => {
    if (readonly)
      return
    setFocus()
  }

  const [isShowConfirmAddVar, { setTrue: showConfirmAddVar, setFalse: hideConfirmAddVar }] = useBoolean(false)

  const handleCancel = () => {
    setBlur()
    setTempValue(value)
  }

  const handleConfirm = () => {
    const keys = getInputKeys(tempValue)
    const promptKeys = promptVariables.map(item => item.key)
    let notIncludeKeys: string[] = []

    if (promptKeys.length === 0) {
      if (keys.length > 0)
        notIncludeKeys = keys
    }
    else {
      notIncludeKeys = keys.filter(key => !promptKeys.includes(key))
    }

    if (notIncludeKeys.length > 0) {
      setNotIncludeKeys(notIncludeKeys)
      showConfirmAddVar()
      return
    }
    setBlur()
    onChange?.(tempValue)
  }

  const cancelAutoAddVar = () => {
    onChange?.(tempValue)
    hideConfirmAddVar()
    setBlur()
  }

  const autoAddVar = () => {
    const newModelConfig = produce(modelConfig, (draft) => {
      draft.configs.prompt_variables = [...draft.configs.prompt_variables, ...notIncludeKeys.map(key => getNewVar(key))]
    })
    onChange?.(tempValue)
    setModelConfig(newModelConfig)
    hideConfirmAddVar()
    setBlur()
  }

  const headerRight = !readonly ? (
    <OperationBtn type='edit' actionName={hasValue ? '' : 'Add Message'} onClick={handleEdit} />
  ) : null

  return (
    <Panel
      className={cn(isShowConfirmAddVar && 'h-[220px]', 'relative mt-4')}
      title={'Message'}

      headerRight={headerRight}
      hasHeaderBottomBorder={!hasValue}
      isFocus={isFocus}
    >
      <div className='text-gray-700 text-sm'>
        {(hasValue || (!hasValue && isFocus)) ? (
          <>
            {isFocus
              ? (
                <textarea
                  ref={inputRef}
                  value={tempValue}
                  rows={3}
                  onChange={e => setTempValue(e.target.value)}
                  className="w-full px-0 text-sm  border-0 bg-transparent  focus:outline-none "
                  placeholder={t('appDebug.openingStatement.placeholder') as string}
                >
                </textarea>
              )
              : (
                <div dangerouslySetInnerHTML={{
                  __html: coloredContent,
                }}></div>
              )}

            {/* Operation Bar */}
            {isFocus && (
              <div className='mt-2 flex items-center justify-between'>
                <div className='text-xs text-gray-500'>{t('appDebug.openingStatement.varTip')}</div>

                <div className='flex gap-2'>
                  <Button className='!h-8 text-sm' onClick={handleCancel}>{t('common.operation.cancel')}</Button>
                  <Button className='!h-8 text-sm' onClick={handleConfirm} type="primary">{t('common.operation.save')}</Button>
                </div>
              </div>
            )}

          </>) : (
          <div className='pt-2 pb-1 text-xs text-gray-500'>{t('appDebug.openingStatement.noDataPlaceHolder')}</div>
        )}

        {isShowConfirmAddVar && (
          <ConfirmAddVar
            varNameArr={notIncludeKeys}
            onConfrim={autoAddVar}
            onCancel={cancelAutoAddVar}
            onHide={hideConfirmAddVar}
          />
        )}

      </div>
    </Panel>
  )
}
export default React.memo(OpeningStatement)
