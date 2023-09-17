'use client'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import s from './index.module.css'

type IStepsNavBarProps = {
  step: number
  datasetId?: string
}

const StepsNavBar = ({
  step,
  datasetId,
}: IStepsNavBarProps) => {
  const { t } = useTranslation()
  const router = useRouter()
  const navBackHandle = () => {
    if (!datasetId)
      router.replace('/datasets')

    else
      router.replace(`/datasets/${datasetId}/documents`)
  }

  return (
    <div className='w-full px-10 border-t  text-sm '>

      <div className="bg-white w-full px-4 mt-6">
        <div className={s.stepsHeader}>
          <div onClick={navBackHandle} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 5, borderRadius: '50%', cursor: 'pointer' }} >
            <ArrowBackIosIcon />
          </div>
          <div className='text-lg'>
            {!datasetId ? t('datasetCreation.steps.header.creation') : t('datasetCreation.steps.header.update')}
          </div>

        </div>
        <div className="my-2 relative py-5">
          {step === 1
            ? (
              <div className=" w-full h-1 bg-[#F6F6F9] "></div>
            )
            : step === 2
              ? (
                <div className=" w-full h-1 flex flex-row ">
                  <div className="w-[50%] h-full bg-[#FEC200]"></div>
                  <div className="w-[50%] h-full bg-[#F6F6F9]"></div>
                </div>
              )
              : (
                <div className=" w-full h-1 bg-[#FEC200] "></div>
              )}
          <div className="absolute  top-[10%] w-full flex flex-row justify-between  ">
            <div className="p-1 rounded-full bg-[#FEC200] cursor-pointer" >
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="15" viewBox="0 0 17 15" fill="none" className="w-5 h-5">
                <path
                  d="M15.3673 2L6.01019 12.6972L2 8.68572"
                  stroke="white"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            {step >= 2
              ? (
                <div className="p-1 rounded-full bg-[#FEC200] cursor-pointer" >
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="15" viewBox="0 0 17 15" fill="none" className="w-5 h-5">
                    <path
                      d="M15.3673 2L6.01019 12.6972L2 8.68572"
                      stroke="white"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              )
              : (
                <div className="w-6 h-6 bg-[#F6F6F9] rounded-full"></div>
              )}
            {step === 3
              ? (
                <div className="p-1 rounded-full bg-[#FEC200] cursor-pointer" >
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="15" viewBox="0 0 17 15" fill="none" className="w-5 h-5">
                    <path
                      d="M15.3673 2L6.01019 12.6972L2 8.68572"
                      stroke="white"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              )
              : (
                <div className="w-6 h-6 bg-[#F6F6F9] rounded-full"></div>
              )}
          </div>
          <div className="flex flex-row justify-between mt-7">
            <p className="text-[#FEC200]">Choose Data Source</p>
            <p className={`${step >= 2 && 'text-[#FEC200]'}`}>Text Preprocessing and Cleaning</p>
            <p className={`${step === 3 && 'text-[#FEC200]'}`}>Execute and finish</p>
          </div>
        </div>
      </div>
      {/* <div className={cn(s.stepList)}>
        <div className={cn(s.stepItem, s.step1, step === 1 && s.active, step !== 1 && s.done)}>
          <div className={cn(s.stepNum)}>{step === 1 ? 1 : ''}</div>
          <div className={cn(s.stepName)}>{t('datasetCreation.steps.one')}</div>
        </div>
        <div className={cn(s.stepItem, s.step2, step === 2 && s.active, step === 3 && s.done)}>
          <div className={cn(s.stepNum)}>{step !== 3 ? 2 : ''}</div>
          <div className={cn(s.stepName)}>{t('datasetCreation.steps.two')}</div>
        </div>
        <div className={cn(s.stepItem, s.step3, step === 3 && s.active)}>
          <div className={cn(s.stepNum)}>3</div>
          <div className={cn(s.stepName)}>{t('datasetCreation.steps.three')}</div>
        </div>
      </div> */}
    </div >
  )
}

export default StepsNavBar
