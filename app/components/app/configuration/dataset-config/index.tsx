'use client'
import type { FC } from 'react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useContext } from 'use-context-selector'
import { useBoolean } from 'ahooks'
import { isEqual } from 'lodash-es'
import produce from 'immer'
import FeaturePanel from '../base/feature-panel'
import OperationBtn from '../base/operation-btn'
import CardItem from './card-item'
import SelectDataSet from './select-dataset'
import ConfigContext from '@/context/debug-configuration'
import type { DataSet } from '@/models/datasets'

const Icon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-file" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#9FC4FF" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M14 3v4a1 1 0 0 0 1 1h4"></path><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"></path></svg>
)

const DatasetConfig: FC = () => {
  const { t } = useTranslation()
  const {
    dataSets: dataSet,
    setDataSets: setDataSet,
    setFormattingChanged,
  } = useContext(ConfigContext)
  const selectedIds = dataSet.map(item => item.id)

  const hasData = dataSet.length > 0
  const [isShowSelectDataSet, { setTrue: showSelectDataSet, setFalse: hideSelectDataSet }] = useBoolean(false)
  const handleSelect = (data: DataSet[]) => {
    if (isEqual(data.map(item => item.id), dataSet.map(item => item.id))) {
      hideSelectDataSet()
      return
    }

    setFormattingChanged(true)
    if (data.find(item => !item.name)) { // has not loaded selected dataset
      const newSelected = produce(data, (draft) => {
        data.forEach((item, index) => {
          if (!item.name) { // not fetched database
            const newItem = dataSet.find(i => i.id === item.id)
            if (newItem)
              draft[index] = newItem
          }
        })
      })
      setDataSet(newSelected)
    }
    else {
      setDataSet(data)
    }
    hideSelectDataSet()
  }
  const onRemove = (id: string) => {
    setDataSet(dataSet.filter(item => item.id !== id))
    setFormattingChanged(true)
  }

  return (
    <FeaturePanel
      className='mt-3'
      headerIcon={Icon}
      title={'Additional Info'}
      headerRight={<OperationBtn type="add" onClick={showSelectDataSet} />}
      hasHeaderBottomBorder={true}
    >
      {hasData
        ? (
          <div className='flex flex-wrap justify-between'>
            {dataSet.map(item => (
              <CardItem
                className="mb-2"
                key={item.id}
                config={item}
                onRemove={onRemove}
              />
            ))}
          </div>
        )
        : (
          <div className='pt-2 pb-1 text-xs text-gray-500'>You can import datasets as additional knowledge for the AI to use.</div>
        )}

      {isShowSelectDataSet && (
        <SelectDataSet
          isShow={isShowSelectDataSet}
          onClose={hideSelectDataSet}
          selectedIds={selectedIds}
          onSelect={handleSelect}
        />
      )}
    </FeaturePanel>
  )
}
export default React.memo(DatasetConfig)
