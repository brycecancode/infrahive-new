'use client'
import { useTranslation } from 'react-i18next'
import { useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import { AtSymbolIcon, CubeTransparentIcon, UserIcon, UsersIcon } from '@heroicons/react/24/outline'
import { UserIcon as UserIconSolid, UsersIcon as UsersIconSolid } from '@heroicons/react/24/solid'

import { useSearchParams } from 'next/navigation'
import { Database03 } from '@/app/components/base/icons/src/vender/line/development'
import { Database03 as Database03Solid } from '@/app/components/base/icons/src/vender/solid/development'
import AccountPage from '@/app/components/header/account-setting/account-page'
import DataSourcePage from '@/app/components/header/account-setting/data-source-page'
import IntegrationsPage from '@/app/components/header/account-setting/Integrations-page'
import MembersPage from '@/app/components/header/account-setting/members-page'
import ProviderPage from '@/app/components/header/account-setting/provider-page'

const iconClassName = `
  w-4 h-4 ml-3 mr-2
`

const scrolledClassName = `
  border-b shadow-xs bg-white/[.98]
`

type IAccountSettingProps = {
  onCancel: () => void
  activeTab?: string
}
export default function AccountSetting() {
  const searchParam = useSearchParams()
  const [activeMenu, setActiveMenu] = useState(searchParam.get('tab') || 'account')
  const { t } = useTranslation()
  const menuItems = [
    {
      key: 'account-group',
      name: t('common.settings.accountGroup'),
      items: [
        {
          key: 'account',
          name: t('common.settings.account'),
          icon: <UserIcon className={iconClassName} />,
          activeIcon: <UserIconSolid className={iconClassName} />,
        },
        {
          key: 'integrations',
          name: t('common.settings.integrations'),
          icon: <AtSymbolIcon className={iconClassName} />,
          activeIcon: <AtSymbolIcon className={iconClassName} />,
        },
        // {
        //   key: 'language',
        //   name: t('common.settings.language'),
        //   icon: <GlobeAltIcon className={iconClassName} />,
        //   activeIcon: <GlobalAltIconSolid className={iconClassName} />,
        // },
      ],
    },
    {
      key: 'workspace-group',
      name: t('common.settings.workplaceGroup'),
      items: [
        {
          key: 'members',
          name: t('common.settings.members'),
          icon: <UsersIcon className={iconClassName} />,
          activeIcon: <UsersIconSolid className={iconClassName} />,
        },
        {
          key: 'provider',
          name: t('common.settings.provider'),
          icon: <CubeTransparentIcon className={iconClassName} />,
          activeIcon: <CubeTransparentIcon className={iconClassName} />,
        },
        {
          key: 'data-source',
          name: t('common.settings.dataSource'),
          icon: <Database03 className={iconClassName} />,
          activeIcon: <Database03Solid className={iconClassName} />,
        },
        // {
        //   key: 'plugin',
        //   name: t('common.settings.plugin'),
        //   icon: <PuzzlePiece01 className={iconClassName} />,
        //   activeIcon: <PuzzlePiece01Solid className={iconClassName} />,
        // },
      ],
    },
  ]
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const scrollHandle = (e: any) => {
    if (e.target.scrollTop > 0)
      setScrolled(true)

    else
      setScrolled(false)
  }
  useEffect(() => {
    const targetElement = scrollRef.current
    targetElement?.addEventListener('scroll', scrollHandle)
    return () => {
      targetElement?.removeEventListener('scroll', scrollHandle)
    }
  }, [])

  return (

    <div className='flex  bg-white ' style={{ minHeight: '95vh' }}>
      <div className=' border-r border-gray-100 bg-white' style={{ minWidth: '300px' }}>
        <div className='mb-8 ml-5 text-lg font-medium leading-6 text-gray-900 '>{t('common.userProfile.settings')}</div>
        <div>
          {
            menuItems.map(menuItem => (
              <div key={menuItem.key} className='mb-4'>
                <div className='ml-2 px-2 mb-[6px] text-base font-medium text-gray-300'>{menuItem.name}</div>
                <div>
                  {
                    menuItem.items.map(item => (
                      <div
                        key={item.key}
                        className={`
                            p-4 pl-10 pr-10
                            flex items-center h-[37px] mb-[2px] text-sm cursor-pointer 
                            ${activeMenu === item.key ? 'font-semibold  bg-amber-400' : 'font-light text-gray-700'}
                          `}
                        onClick={() => setActiveMenu(item.key)}
                      >
                        {item.name}
                      </div>
                    ))
                  }
                </div>
              </div>
            ))
          }
        </div>
      </div>
      <div ref={scrollRef} className=' pb-4 overflow-y-auto w-full'>
        <div className={cn('sticky top-0 px-6 py-4 flex items-center justify-between h-14 mb-4 bg-white text-base font-medium text-gray-900 w-full', scrolled && scrolledClassName)}>
          {[...menuItems[0].items, ...menuItems[1].items].find(item => item.key === activeMenu)?.name}
          {/* <XMarkIcon className='w-4 h-4 cursor-pointer' onClick={onCancel} /> */}
        </div>
        <div className='px-6 w-full'>
          {activeMenu === 'account' && <AccountPage />}
          {activeMenu === 'members' && <MembersPage />}
          {activeMenu === 'integrations' && <IntegrationsPage />}
          {/* {activeMenu === 'language' && <LanguagePage />} */}
          {activeMenu === 'provider' && <ProviderPage />}
          {activeMenu === 'data-source' && <DataSourcePage />}
          {/* {activeMenu === 'plugin' && <PluginPage />} */}
        </div>
      </div>
    </div>

  )
}
