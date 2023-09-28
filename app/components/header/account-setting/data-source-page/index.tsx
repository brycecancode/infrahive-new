import { useTranslation } from 'react-i18next'
import cn from 'classnames'
import DataSourceNotion from './data-source-notion'
import s from './style.module.css'

export default function DataSourcePage() {
  const { t } = useTranslation()
  // const { data } = useSWR({ url: 'data-source/integrates' }, fetchDataSource)
  // const notionWorkspaces = data?.data.filter(item => item.provider === 'notion') || []

  return (
    <div className='mb-8'>
      <div className='mb-2 text-sm font-medium text-gray-900'>{t('common.dataSource.add')}</div>
      <DataSourceNotion workspaces={[]} />
      <div className='mb-2 border-[0.5px] border-gray-200 bg-gray-50 rounded-xl'>
        <div className='flex items-center px-3 py-[9px]'>
          <div className={cn(s['github-icon'], 'w-8 h-8 mr-3 border border-gray-100 rounded-lg')} />
          <div className='grow'>
            <div className='leading-5 text-sm font-medium text-gray-800'>
              Github
            </div>
            <div className='leading-5 text-sm font-medium text-gray-200'>
              Comming Soon
            </div>
          </div>
        </div>
      </div>
      <div className='mb-2 border-[0.5px] border-gray-200 bg-gray-50 rounded-xl'>
        <div className='flex items-center px-3 py-[9px]'>
          <div className={cn(s['slack-icon'], 'w-8 h-8 mr-3 border border-gray-100 rounded-lg')} />
          <div className='grow'>
            <div className='leading-5 text-sm font-medium text-gray-800'>
              Slack
            </div>
            <div className='leading-5 text-sm font-medium text-gray-200'>
              Comming Soon
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
