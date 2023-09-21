'use client'
import type { FC } from 'react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useBoolean } from 'ahooks'
import cn from 'classnames'
import ConfirmAddVar from './confirm-add-var'
import s from './style.module.css'
import BlockInput from '@/app/components/base/block-input'
import type { PromptVariable } from '@/models/debug'
import type { AppType } from '@/types/app'
import { getNewVar } from '@/utils/var'

export type IPromptProps = {
  mode: AppType
  promptTemplate: string
  promptVariables: PromptVariable[]
  readonly?: boolean
  onChange?: (promp: string, promptVariables: PromptVariable[]) => void
}

const Prompt: FC<IPromptProps> = ({
  mode,
  promptTemplate,
  promptVariables,
  readonly = false,
  onChange,
}) => {
  const { t } = useTranslation()
  const promptVariablesObj = (() => {
    const obj: Record<string, boolean> = {}
    promptVariables.forEach((item) => {
      obj[item.key] = true
    })
    return obj
  })()

  const [newPromptVariables, setNewPromptVariables] = React.useState<PromptVariable[]>(promptVariables)
  const [newTemplates, setNewTemplates] = React.useState('')
  const [isShowConfirmAddVar, { setTrue: showConfirmAddVar, setFalse: hideConfirmAddVar }] = useBoolean(false)

  const handleChange = (newTemplates: string, keys: string[]) => {
    console.log('handleChange', newTemplates, keys)
    const previousKeys = promptVariables.filter(input => keys.includes(input.key))
    const newPromptVariables = keys.filter(key => !(key in promptVariablesObj)).map(key => getNewVar(key))

    if (newPromptVariables.length > 0 || previousKeys.length > 0) {
      setNewPromptVariables([...newPromptVariables, ...previousKeys])
      setNewTemplates(newTemplates)
      showConfirmAddVar()
      return
    }
    onChange?.(newTemplates, [])
  }

  const handleAutoAdd = (isAdd: boolean) => {
    return () => {
      onChange?.(newTemplates, isAdd ? newPromptVariables : [])
      hideConfirmAddVar()
    }
  }

  return (
    <div className={cn(!readonly ? `${s.gradientBorder}` : 'bg-gray-50', 'relative rounded-xl')}>

      <BlockInput
        readonly={readonly}
        value={promptTemplate}
        onConfirm={(value: string, vars: string[]) => {
          handleChange(value, vars)
        }}
      />

      {isShowConfirmAddVar && (
        <ConfirmAddVar
          varNameArr={newPromptVariables.map(v => v.name)}
          onConfrim={handleAutoAdd(true)}
          onCancel={handleAutoAdd(false)}
          onHide={hideConfirmAddVar}
        />
      )}
    </div>
  )
}

export default React.memo(Prompt)
