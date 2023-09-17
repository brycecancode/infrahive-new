'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'
import EmbeddingProcess from '../embedding-process'

import { FieldInfo } from '../../documents/detail/metadata'
import s from './index.module.css'
import type { FullDocumentDetail, createDocumentResponse } from '@/models/datasets'

type StepThreeProps = {
  datasetId?: string
  datasetName?: string
  indexingType?: string
  creationCache?: createDocumentResponse
}

const StepThree = ({ datasetId, datasetName, indexingType, creationCache }: StepThreeProps) => {
  const { t } = useTranslation()

  return (
    <div className='flex w-full h-full p-5 '>
      <div className={'h-full w-full border  p-5 '}>
        <div className='max-w-[636px]'>

          <div className="flex flex-col items-center py-5">
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
              <circle cx="30" cy="30" r="30" fill="#7ED19F" />
              <path d="M42.5009 18L23.951 39.2L16.001 31.25" fill="#7ED19F" />
              <path
                d="M42.5009 18L23.951 39.2L16.001 31.25"
                stroke="white"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p className='mt-4'>Dataset Created</p>
          </div>
          {datasetId && <FieldInfo
            label={'Dataset Name'}
            displayedValue={datasetName || creationCache?.dataset?.name}

          />}

          <EmbeddingProcess
            datasetId={datasetId || creationCache?.dataset?.id || ''}
            batchId={creationCache?.batch || ''}
            documents={creationCache?.documents as FullDocumentDetail[]}
            indexingType={indexingType || creationCache?.dataset?.indexing_technique}
          />
        </div>
      </div>
      <div className='h-full w-full border  p-5 '>
        <div className={s.title}>{t('datasetCreation.stepThree.sideTipTitle')}</div>
        <div className={s.dividerLine} />
        <div className={s.content}>{t('datasetCreation.stepThree.sideTipContent')}</div>
      </div>
    </div>
  )
}

export default StepThree
