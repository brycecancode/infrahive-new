'use client'
import type { FC } from 'react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TrashIcon } from '@heroicons/react/24/outline'
import { useBoolean } from 'ahooks'
import Panel from '../base/feature-panel'
import OperationBtn from '../base/operation-btn'
import VarIcon from '../base/icons/var-icon'
import EditModel from './config-model'
import s from './style.module.css'
import type { PromptVariable } from '@/models/debug'
import { DEFAULT_VALUE_MAX_LEN, getMaxVarNameLength } from '@/config'
import { checkKeys, getNewVar } from '@/utils/var'
import Switch from '@/app/components/base/switch'
import Toast from '@/app/components/base/toast'

export type IConfigVarProps = {
  promptVariables: PromptVariable[]
  readonly?: boolean
  onPromptVariablesChange?: (promptVariables: PromptVariable[]) => void
}

const ConfigVar: FC<IConfigVarProps> = ({ promptVariables, readonly, onPromptVariablesChange }) => {
  const { t } = useTranslation()
  const hasVar = promptVariables.length > 0
  const promptVariableObj = (() => {
    const obj: Record<string, boolean> = {}
    promptVariables.forEach((item) => {
      obj[item.key] = true
    })
    return obj
  })()

  const updatePromptVariable = (key: string, updateKey: string, newValue: any) => {
    if (!(key in promptVariableObj))
      return
    const newPromptVariables = promptVariables.map((item) => {
      if (item.key === key) {
        return {
          ...item,
          [updateKey]: newValue,
        }
      }

      return item
    })

    onPromptVariablesChange?.(newPromptVariables)
  }

  const batchUpdatePromptVariable = (key: string, updateKeys: string[], newValues: any[]) => {
    if (!(key in promptVariableObj))
      return
    const newPromptVariables = promptVariables.map((item) => {
      if (item.key === key) {
        const newItem: any = { ...item }
        updateKeys.forEach((updateKey, i) => {
          newItem[updateKey] = newValues[i]
        })
        return newItem
      }

      return item
    })

    onPromptVariablesChange?.(newPromptVariables)
  }

  const updatePromptKey = (index: number, newKey: string) => {
    const { isValid, errorKey, errorMessageKey } = checkKeys([newKey], true)
    if (!isValid) {
      Toast.notify({
        type: 'error',
        message: t(`appDebug.varKeyError.${errorMessageKey}`, { key: errorKey }),
      })
      return
    }
    const newPromptVariables = promptVariables.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          key: newKey,
        }
      }

      return item
    })

    onPromptVariablesChange?.(newPromptVariables)
  }

  const updatePromptNameIfNameEmpty = (index: number, newKey: string) => {
    if (!newKey)
      return
    const newPromptVariables = promptVariables.map((item, i) => {
      if (i === index && !item.name) {
        return {
          ...item,
          name: newKey,
        }
      }
      return item
    })

    onPromptVariablesChange?.(newPromptVariables)
  }

  const handleAddVar = () => {
    const newVar = getNewVar('')
    onPromptVariablesChange?.([...promptVariables, newVar])
  }

  const handleRemoveVar = (index: number) => {
    onPromptVariablesChange?.(promptVariables.filter((_, i) => i !== index))
  }

  const [currKey, setCurrKey] = useState<string | null>(null)
  const currItem = currKey ? promptVariables.find(item => item.key === currKey) : null
  const [isShowEditModal, { setTrue: showEditModal, setFalse: hideEditModal }] = useBoolean(false)
  const handleConfig = (key: string) => {
    setCurrKey(key)
    showEditModal()
  }

  return (
    <Panel
      className="mt-4"
      headerIcon={
        <VarIcon />
      }
      title={
        <div className='flex items-center gap-2'>
          <div>{t('appDebug.variableTitle')}</div>
        </div>
      }
      headerRight={!readonly ? <OperationBtn type="add" onClick={handleAddVar} /> : null}
      hasHeaderBottomBorder={true}
    >
      {!hasVar && (
        <div className='pt-2 pb-1 text-xs text-gray-500'>{t('appDebug.notSetVar')}</div>
      )}
      {hasVar && (
        <div className='rounded-lg  border-gray-200 bg-white'>
          <table className={`${s.table} w-full border-collapse border-0 rounded-lg text-sm`}>
            <thead className="border-b  border-gray-200 text-gray-500 text-xs font-medium">
              <tr className='uppercase'>
                <td>Variables</td>
                <td>Data</td>
                {!readonly && (
                  <>
                    <td>{t('appDebug.variableTable.optional')}</td>
                    <td>{t('appDebug.variableTable.action')}</td>
                  </>
                )}

              </tr>
            </thead>
            <tbody className="text-gray-700">
              {promptVariables.map(({ key, name, type, required }, index) => (
                <tr key={index} className="h-9 leading-9">
                  <td className="w-[160px] border-b border-gray-100 pl-3">
                    <div className='flex items-center space-x-1'>

                      {!readonly
                        ? (
                          <input
                            type="text"
                            placeholder="key"
                            value={key}
                            onChange={e => updatePromptKey(index, e.target.value)}
                            onBlur={e => updatePromptNameIfNameEmpty(index, e.target.value)}
                            maxLength={getMaxVarNameLength(name)}
                            className="h-6 leading-6 block w-full rounded-md border p-3 text-gray-900  placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-gray-200"
                          />
                        )
                        : (
                          <div className='h-6 leading-6 text-[13px] text-gray-700'>{key}</div>
                        )}
                    </div>
                  </td>
                  <td className="py-1 border-b border-gray-100">
                    {!readonly
                      ? (
                        <input
                          type="text"
                          placeholder={key}
                          value={name}
                          onChange={e => updatePromptVariable(key, 'name', e.target.value)}
                          maxLength={getMaxVarNameLength(name)}
                          className="h-6 leading-6 block w-full rounded-md border p-3 text-gray-900  placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-gray-200"
                        />)
                      : (
                        <div className='h-6 leading-6 text-[13px] text-gray-700'>{name}</div>
                      )}
                  </td>
                  {!readonly && (
                    <>
                      <td className='w-[84px] border-b border-gray-100'>
                        <div className='flex items-center h-full'>
                          <Switch defaultValue={!required} size='md' onChange={value => updatePromptVariable(key, 'required', !value)} />
                        </div>
                      </td>
                      <td className='w-20  border-b border-gray-100'>
                        <div className='flex h-full items-center space-x-1'>
                          <div className='flex items-center justify-items-center justify-center  content-center  leading-5 rounded-lg px-4 py-2 text-base bg-amber-400 hover:bg-amber-400/75 cursor-pointer text-white hover:shadow-sm shrink-0 w-[70px] !text-[13px] font-medium h-5' onClick={() => handleConfig(key)}>
                            Modify
                          </div>
                          <div className='flex items-center justify-items-center w-6 h-6 text-gray-500 cursor-pointer' onClick={() => handleRemoveVar(index)} >
                            <TrashIcon width={16} height={16} />
                          </div>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isShowEditModal && (
        <EditModel
          payload={currItem as PromptVariable}
          isShow={isShowEditModal}
          onClose={hideEditModal}
          onConfirm={({ type, value }) => {
            if (type === 'string')
              batchUpdatePromptVariable(currKey as string, ['type', 'max_length'], [type, value || DEFAULT_VALUE_MAX_LEN])

            else
              batchUpdatePromptVariable(currKey as string, ['type', 'options'], [type, value || []])

            hideEditModal()
          }}
        />
      )}

    </Panel>
  )
}
export default React.memo(ConfigVar)
