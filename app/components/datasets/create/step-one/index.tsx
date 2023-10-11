'use client'
import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Grid } from '@mui/material'
import FilePreview from '../file-preview'
import FileUploader from '../file-uploader'
import NotionPagePreview from '../notion-page-preview'
import EmptyDatasetCreationModal from '../empty-dataset-creation-modal'
import s from './index.module.css'
import type { File } from '@/models/datasets'
import type { DataSourceNotionPage } from '@/models/common'
import { DataSourceType } from '@/models/datasets'
import Button from '@/app/components/base/button'
import { NotionPageSelector } from '@/app/components/base/notion-page-selector'
import { useDatasetDetailContext } from '@/context/dataset-detail'
const FromFileIcon = '/assets/images/datasets/fromFile.png'
const FromNotion = '/assets/images/datasets/fromNotion.png'
const FromWebsite = '/assets/images/datasets/fromWeb.png'
type IStepOneProps = {
  datasetId?: string
  dataSourceType?: DataSourceType
  dataSourceTypeDisable: Boolean
  hasConnection: boolean
  onSetting: () => void
  files: any[]
  updateFileList: (files: any[]) => void
  updateFile: (fileItem: any, progress: number, list: any[]) => void
  notionPages?: any[]
  updateNotionPages: (value: any[]) => void
  onStepChange: () => void
  changeType: (type: DataSourceType) => void
}

type Page = DataSourceNotionPage & { workspace_id: string }

type NotionConnectorProps = {
  onSetting: () => void
}
export const NotionConnector = ({ onSetting }: NotionConnectorProps) => {
  const { t } = useTranslation()

  return (
    <div className={s.notionConnectionTip}>
      <span className={s.notionIcon} />
      <div className={s.title}>{t('datasetCreation.stepOne.notionSyncTitle')}</div>
      <div className={s.tip}>{t('datasetCreation.stepOne.notionSyncTip')}</div>
      <Button className='h-8' type='primary' onClick={onSetting}>{t('datasetCreation.stepOne.connect')}</Button>
    </div>
  )
}

const StepOne = ({
  datasetId,
  dataSourceType,
  dataSourceTypeDisable,
  changeType,
  hasConnection,
  onSetting,
  onStepChange,
  files,
  updateFileList,
  updateFile,
  notionPages = [],
  updateNotionPages,
}: IStepOneProps) => {
  const { dataset } = useDatasetDetailContext()
  const [showModal, setShowModal] = useState(false)
  const [currentFile, setCurrentFile] = useState<File | undefined>()
  const [currentNotionPage, setCurrentNotionPage] = useState<Page | undefined>()
  const { t } = useTranslation()

  const modalShowHandle = () => setShowModal(true)
  const modalCloseHandle = () => setShowModal(false)

  const updateCurrentFile = (file: File) => {
    setCurrentFile(file)
  }
  const hideFilePreview = () => {
    setCurrentFile(undefined)
  }

  const updateCurrentPage = (page: Page) => {
    setCurrentNotionPage(page)
  }

  const hideNotionPagePreview = () => {
    setCurrentNotionPage(undefined)
  }

  const shouldShowDataSourceTypeList = !datasetId || (datasetId && !dataset?.data_source_type)

  const nextDisabled = useMemo(() => {
    if (!files.length)
      return true
    if (files.some(file => !file.file.id))
      return true
    return false
  }, [files])
  return (
    <div className='flex w-full h-full'>
      <div className='grow overflow-y-auto relative'>

        <Grid container className="mt-2 px-20 " spacing={2} >
          <Grid item xs={12} md={6}>
            {
              shouldShowDataSourceTypeList && (
                <>
                  <button onClick={() => {
                    if (dataSourceTypeDisable)
                      return
                    changeType(DataSourceType.FILE)
                    hideFilePreview()
                    hideNotionPagePreview()
                  }} className="w-full hover:bg-[#F4F9FB] my-2 bg-[#F6F6F9] rounded-xl">
                    <Box
                      sx={{
                        padding: '10px 20px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        borderRadius: '10px',
                        alignItems: 'center',
                      }}
                    >
                      <div className="flex gap-2 items-center">
                        <div className="border-2 rounded-md p-4 w-[70px]">
                          <img alt="image" src={FromFileIcon} width={20} height={20} style={{ marginTop: 4 }} />
                        </div>
                        <div className="w-[80%]">
                          <p className="text-[#202224]">Import from text file</p>
                        </div>
                      </div>

                      <div>
                        {dataSourceType === DataSourceType.FILE && (
                          <div className="bg-[#7ED19F] p-1 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="15" viewBox="0 0 17 15" fill="none">
                              <path d="M15.3673 2L6.01019 12.6972L2 8.68572" fill="#7ED19F" />
                              <path
                                d="M15.3673 2L6.01019 12.6972L2 8.68572"
                                stroke="white"
                                stroke-width="3"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    </Box>
                  </button>
                  <button onClick={() => {
                    if (dataSourceTypeDisable)
                      return
                    changeType(DataSourceType.WEB)
                    hideFilePreview()
                    hideNotionPagePreview()
                  }} className="w-full hover:bg-[#F4F9FB] my-2 bg-[#F6F6F9] rounded-xl">
                    <Box
                      sx={{
                        padding: '10px 20px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        borderRadius: '10px',
                        alignItems: 'center',
                      }}
                    >
                      <div className="flex gap-2 items-center">
                        <div className="border-2 rounded-md p-4 w-[70px]">
                          <img alt="image" src={FromWebsite} width={20} height={20} style={{ marginTop: 4 }} />
                        </div>
                        <div className="w-[80%]">
                          <p className="text-[#202224]">Import from Web</p>
                        </div>
                      </div>

                      <div>
                        {dataSourceType === DataSourceType.WEB && (
                          <div className="bg-[#7ED19F] p-1 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="15" viewBox="0 0 17 15" fill="none">
                              <path d="M15.3673 2L6.01019 12.6972L2 8.68572" fill="#7ED19F" />
                              <path
                                d="M15.3673 2L6.01019 12.6972L2 8.68572"
                                stroke="white"
                                stroke-width="3"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    </Box>
                  </button>
                </>

              )
            }
          </Grid>
          <Grid item xs={12} md={6}>
            {dataSourceType === DataSourceType.FILE && (
              <div className='flex flex-col'>
                <FileUploader
                  fileList={files}
                  titleClassName={!shouldShowDataSourceTypeList ? 'mt-[30px] !mb-[44px] !text-lg !font-semibold !text-gray-900' : undefined}
                  prepareFileList={updateFileList}
                  onFileListUpdate={updateFileList}
                  onFileUpdate={updateFile}
                  onPreview={updateCurrentFile}
                />
                <Button disabled={nextDisabled} className={s.submitButton} type='primary' onClick={onStepChange}>Next</Button>
              </div>
            )}
            {dataSourceType === DataSourceType.WEB && (
              <div className='flex flex-col'>
                <FileUploader
                  isWebsite={true}
                  fileList={files}
                  titleClassName={!shouldShowDataSourceTypeList ? 'mt-[30px] !mb-[44px] !text-lg !font-semibold !text-gray-900' : undefined}
                  prepareFileList={updateFileList}
                  onFileListUpdate={updateFileList}
                  onFileUpdate={updateFile}
                  onPreview={updateCurrentFile}
                />
                <Button disabled={nextDisabled} className={s.submitButton} type='primary' onClick={onStepChange}>Next</Button>
              </div>
            )}
            {dataSourceType === DataSourceType.NOTION && (
              <div className='flex'>
                {!hasConnection && <NotionConnector onSetting={onSetting} />}
                {hasConnection && (
                  <>
                    <div className='mb-8 w-[640px]'>
                      <NotionPageSelector value={notionPages.map(page => page.page_id)} onSelect={updateNotionPages} onPreview={updateCurrentPage} />
                    </div>
                    <Button disabled={!notionPages.length} className={s.submitButton} type='primary' onClick={onStepChange}>{t('datasetCreation.stepOne.button')}</Button>
                  </>
                )}
              </div>
            )}
            {!datasetId && (
              <>
                <div className={s.dividerLine} />
                <div onClick={modalShowHandle} className={s.OtherCreationOption}>{t('datasetCreation.stepOne.emptyDatasetCreation')}</div>
              </>
            )}
          </Grid>
          <EmptyDatasetCreationModal show={showModal} onHide={modalCloseHandle} />
        </Grid>
      </div>
      {currentFile && <FilePreview file={currentFile} hidePreview={hideFilePreview} />}
      {currentNotionPage && <NotionPagePreview currentPage={currentNotionPage} hidePreview={hideNotionPagePreview} />}
    </div>
  )
}

export default StepOne
