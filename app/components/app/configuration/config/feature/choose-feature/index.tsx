'use client'
import type { FC } from 'react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import FeatureGroup from '../feature-group'
import MoreLikeThisIcon from '../../../base/icons/more-like-this-icon'
import FeaturePanel from '../../../base/feature-panel'
import type { IOpeningStatementProps } from '../../../features/chat-group/opening-statement'
import FeatureItem from './feature-item'
import SuggestedQuestionsAfterAnswerIcon from '@/app/components/app/configuration/base/icons/suggested-questions-after-answer-icon'
type IConfig = {
  openingStatement: boolean
  moreLikeThis: boolean
  suggestedQuestionsAfterAnswer: boolean
  speechToText: boolean
}

export type IChooseFeatureProps = {

  config: IConfig
  isChatApp: boolean
  onChange: (key: string, value: boolean) => void
  showSpeechToTextItem?: boolean
  openingStatementConfig?: IOpeningStatementProps

}

const OpeningStatementIcon = (
  <svg width="30" height="27.429" viewBox="0 0 30 27.429" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m3.617 15.067 -0.024 2.408 4.385 -2.409h8.452c1.143 0 2.069 -0.847 2.069 -1.894V5.811c0 -1.047 -0.926 -1.895 -2.068 -1.895H3.617c-1.143 0 -2.069 0.848 -2.069 1.895v7.359c0 1.048 0.926 1.896 2.068 1.896Z" fill="#FEC200" /><path d="M3.593 17.854a0.435 0.435 0 0 1 -0.206 -0.05 0.375 0.375 0 0 1 -0.214 -0.33l0.02 -2.062c-1.173 -0.184 -2.066 -1.119 -2.066 -2.241V5.812c0 -1.253 1.117 -2.272 2.489 -2.272h12.812c1.372 0 2.489 1.019 2.489 2.272v7.359c0 1.253 -1.117 2.272 -2.489 2.272h-8.331L3.814 17.797a0.478 0.478 0 0 1 -0.22 0.057ZM3.617 4.294c-0.909 0 -1.648 0.681 -1.648 1.518v7.359c0 0.837 0.741 1.519 1.652 1.519a0.437 0.437 0 0 1 0.298 0.111 0.363 0.363 0 0 1 0.122 0.268l-0.017 1.729 3.737 -2.055a0.459 0.459 0 0 1 0.221 -0.054h8.452c0.911 0 1.652 -0.681 1.652 -1.519V5.812c0 -0.837 -0.741 -1.519 -1.652 -1.519H3.617Z" fill="#717579" /><path d="m26.115 20.559 0.032 3.051 -5.676 -3.051h-10.946c-1.479 0 -2.681 -1.077 -2.681 -2.403V8.831c0 -1.326 1.202 -2.403 2.682 -2.403h16.589c1.48 0 2.681 1.077 2.681 2.403v9.327c0 1.324 -1.198 2.4 -2.681 2.4Z" fill="#FAFCFC" /><path d="M26.146 23.988a0.456 0.456 0 0 1 -0.218 -0.055l-5.574 -2.998H9.525c-1.709 0 -3.102 -1.245 -3.102 -2.78V8.831c0 -1.532 1.39 -2.78 3.103 -2.78h16.589c1.709 0 3.102 1.245 3.102 2.78v9.327c0 1.405 -1.167 2.566 -2.676 2.754l0.029 2.699a0.372 0.372 0 0 1 -0.212 0.33 0.544 0.544 0 0 1 -0.212 0.047ZM9.525 6.806c-1.245 0 -2.26 0.908 -2.26 2.025v9.327c0 1.116 1.012 2.026 2.26 2.026h10.946c0.075 0 0.151 0.017 0.218 0.054l5.035 2.707 -0.023 -2.379c0 -0.102 0.043 -0.198 0.122 -0.268a0.45 0.45 0 0 1 0.298 -0.111c1.245 0 2.261 -0.909 2.261 -2.026V8.831c0 -1.115 -1.013 -2.025 -2.261 -2.025h-16.594Z" fill="#717579" /><path d="M11.197 13.452c0 0.309 0.144 0.605 0.401 0.823 0.257 0.219 0.607 0.342 0.971 0.342 0.364 0 0.713 -0.123 0.97 -0.341 0.257 -0.219 0.403 -0.514 0.403 -0.824 0 -0.309 -0.146 -0.606 -0.403 -0.824a1.506 1.506 0 0 0 -0.97 -0.341c-0.364 0 -0.713 0.123 -0.971 0.341 -0.257 0.219 -0.402 0.514 -0.402 0.823Z" fill="#F7B64B" /><path d="M16.449 13.452c0 0.309 0.144 0.605 0.401 0.823 0.257 0.219 0.607 0.342 0.971 0.342 0.363 0 0.713 -0.123 0.97 -0.341 0.257 -0.219 0.403 -0.514 0.403 -0.824 0 -0.309 -0.146 -0.606 -0.403 -0.824a1.506 1.506 0 0 0 -0.97 -0.341c-0.364 0 -0.713 0.123 -0.971 0.341 -0.257 0.219 -0.402 0.514 -0.402 0.823Z" fill="#F7B64B" /><path d="M21.698 13.452c0 0.309 0.146 0.605 0.403 0.823 0.257 0.219 0.606 0.342 0.97 0.342 0.363 0 0.713 -0.123 0.97 -0.341 0.257 -0.219 0.403 -0.514 0.403 -0.824 0 -0.309 -0.146 -0.606 -0.403 -0.824a1.506 1.506 0 0 0 -0.97 -0.341c-0.364 0 -0.713 0.123 -0.971 0.341 -0.257 0.219 -0.402 0.514 -0.402 0.823Z" fill="#F7B64B" /></svg>

)

const ChooseFeature: FC<IChooseFeatureProps> = ({

  isChatApp,
  config,
  onChange,
  showSpeechToTextItem,
  openingStatementConfig,
}) => {
  const { t } = useTranslation()

  return (
    <>
      <div className='mt-5'>
        {/* Chat Feature */}
        {isChatApp && (
          <FeaturePanel
            title={'Chatbot Features'}

            headerIcon={<svg width="30" height="27" viewBox="0 0 30 27" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M16.9028 25.6826L17.6858 24.4972C18.2931 23.5777 18.5968 23.1179 19.0846 22.8637C19.5724 22.6095 20.1864 22.6001 21.4148 22.5812C23.2282 22.5531 24.3654 22.4535 25.3191 22.0995C27.0889 21.4427 28.4947 20.1829 29.2278 18.5971C29.7776 17.4079 29.7776 15.9001 29.7776 12.8847V11.5904C29.7776 7.35351 29.7776 5.23506 28.7133 3.67884C28.1178 2.80804 27.3008 2.07591 26.3289 1.54228C24.5921 0.588623 22.228 0.588623 17.4998 0.588623H13.1664C8.43816 0.588623 6.07401 0.588623 4.3373 1.54228C3.3655 2.07591 2.54845 2.80804 1.95294 3.67884C0.888672 5.23506 0.888672 7.35351 0.888672 11.5904V12.8847C0.888672 15.9001 0.888672 17.4079 1.43843 18.5971C2.17144 20.1829 3.57742 21.4427 5.34706 22.0995C6.30085 22.4535 7.4381 22.5531 9.2514 22.5812C10.4797 22.6001 11.0938 22.6095 11.5816 22.8637C12.0694 23.1181 12.3731 23.5777 12.9804 24.4972L13.7634 25.6826C14.4614 26.7392 16.2048 26.7392 16.9028 25.6826ZM15.3331 6.08951C15.9314 6.08951 16.4164 6.52413 16.4164 7.06025V17.4149C16.4164 17.951 15.9314 18.3856 15.3331 18.3856C14.7348 18.3856 14.2498 17.951 14.2498 17.4149V7.06025C14.2498 6.52413 14.7348 6.08951 15.3331 6.08951ZM10.6387 9.64891C10.6387 9.11278 10.1536 8.67816 9.55534 8.67816C8.95704 8.67816 8.472 9.11278 8.472 9.64891V14.8262C8.472 15.3623 8.95704 15.797 9.55534 15.797C10.1536 15.797 10.6387 15.3623 10.6387 14.8262V9.64891ZM21.1109 8.67816C21.7092 8.67816 22.1942 9.11278 22.1942 9.64891V14.8262C22.1942 15.3623 21.7092 15.797 21.1109 15.797C20.5126 15.797 20.0276 15.3623 20.0276 14.8262V9.64891C20.0276 9.11278 20.5126 8.67816 21.1109 8.67816Z" fill="#09BD3C" />
            </svg>
            }
            hasHeaderBottomBorder={true}
          >
            <div className='text-xs font-normal text-gray-500 my-4'>You can add more features for the chatbot</div>

            <>
              <FeatureItem
                icon={OpeningStatementIcon}
                previewImgClassName='openingStatementPreview'
                title={'Default Messages'}
                description={'Create specific sentences for the AI to follow. For example, first sentence that the AI will use as welcome message'}
                value={config.openingStatement}
                onChange={value => onChange('openingStatement', value)}
                openingStatementConfig={
                  openingStatementConfig
                }
              />
              <FeatureItem
                icon={<SuggestedQuestionsAfterAnswerIcon />}
                previewImgClassName='suggestedQuestionsAfterAnswerPreview'
                title={t('appDebug.feature.suggestedQuestionsAfterAnswer.title')}
                description={'Enable suggestions for the follow up questions to ask with AI'}
                value={config.suggestedQuestionsAfterAnswer}
                onChange={value => onChange('suggestedQuestionsAfterAnswer', value)}

              />
              {/* {
                showSpeechToTextItem && (
                  <FeatureItem
                    icon={<Microphone01 className='w-4 h-4 text-[#fbbf24]' />}
                    previewImgClassName='speechToTextPreview'
                    title={'Receive Audio Input'}
                    description={'Enable the AI to understand audio recordings instead of just text messages from users'}
                    value={config.speechToText}
                    onChange={value => onChange('speechToText', value)}
                  />
                )
              } */}
            </>
          </FeaturePanel>
        )}

        {/* Text Generation Feature */}
        {!isChatApp && (
          <FeatureGroup title={t('appDebug.feature.groupExperience.title')}>
            <>
              <FeatureItem
                icon={<MoreLikeThisIcon />}
                previewImgClassName='moreLikeThisPreview'
                title={t('appDebug.feature.moreLikeThis.title')}
                description={t('appDebug.feature.moreLikeThis.description')}
                value={config.moreLikeThis}
                onChange={value => onChange('moreLikeThis', value)}
              />
            </>
          </FeatureGroup>
        )}
      </div>

    </>
  )
}
export default React.memo(ChooseFeature)
