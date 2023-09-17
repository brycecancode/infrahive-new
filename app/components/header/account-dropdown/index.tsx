'use client'
import { useTranslation } from 'react-i18next'
import { Fragment, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useContext } from 'use-context-selector'
import classNames from 'classnames'
import Link from 'next/link'
import { Menu, Transition } from '@headlessui/react'
import AccountSetting from '../account-setting'
import WorkplaceSelector from './workplace-selector'
import I18n from '@/context/i18n'
import Avatar from '@/app/components/base/avatar'
import { useAppContext } from '@/context/app-context'
import { ChevronDown } from '@/app/components/base/icons/src/vender/line/arrows'
import { LogOut01 } from '@/app/components/base/icons/src/vender/line/general'

export default function AppSelector() {
  const itemClassName = `
    flex items-center w-full h-9 px-3 text-gray-700 text-[14px]
    rounded-lg font-normal hover:bg-gray-50 cursor-pointer
  `
  const router = useRouter()
  const [settingVisible, setSettingVisible] = useState(false)
  const [aboutVisible, setAboutVisible] = useState(false)

  const { locale } = useContext(I18n)
  const { t } = useTranslation()
  const { userProfile, langeniusVersionInfo } = useAppContext()

  const handleLogout = async () => {
    localStorage.setItem('mainToken', '')
    router.push('/signin')
  }

  return (
    <div className="">
      <Menu as="div" className="relative inline-block text-left ">
        {
          ({ open }) => (
            <>
              <div>
                <Menu.Button
                  className={`
                    inline-flex items-center
                    rounded-[20px] py-1 pr-2.5 pl-1 text-sm
                  text-gray-700 hover:bg-gray-200
                    ${open && 'bg-gray-200'}
                  `}
                >
                  <Avatar name={userProfile.name} className='mr-2' size={32} />
                  {userProfile.name}
                  <ChevronDown className="w-3 h-3 ml-1 text-gray-700" />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items
                  className="
                    absolute right-0 mt-1.5 w-60 max-w-80
                    divide-y divide-gray-100 origin-top-right rounded-lg bg-white
                    shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.05)]
                  "
                >
                  <Menu.Item>
                    <div className='flex flex-nowrap items-center px-4 py-[13px]'>
                      <Avatar name={userProfile.name} size={36} className='mr-3' />
                      <div className='grow'>
                        <div className='leading-5 font-normal text-[14px] text-gray-800 break-all'>{userProfile.name}</div>
                        <div className='leading-[18px] text-xs font-normal text-gray-500 break-all'>{userProfile.email}</div>
                      </div>
                    </div>
                  </Menu.Item>
                  <div className='px-1 py-1'>
                    <div className='mt-2 px-3 text-xs font-medium text-gray-500'>{t('common.userProfile.workspace')}</div>
                    <WorkplaceSelector />
                  </div>
                  <div className="px-1 py-1">
                    <Menu.Item>
                      <div className={itemClassName} onClick={() => setSettingVisible(true)}>
                        <div>{t('common.userProfile.settings')}</div>
                      </div>
                    </Menu.Item>
                    <Menu.Item>
                      <Link
                        href=""
                        className={classNames(itemClassName, 'group justify-between')}
                        target='_blank'>
                        <div>{t('common.userProfile.helpCenter')}</div>
                        {/* <ArrowUpRight className='hidden w-[14px] h-[14px] text-gray-500 group-hover:flex' /> */}
                      </Link>
                    </Menu.Item>
                    <Menu.Item>
                      <div className={classNames(itemClassName, 'justify-between')} >
                        <div>{t('common.userProfile.about')}</div>
                      </div>
                    </Menu.Item>
                  </div>
                  <Menu.Item>
                    <div className='p-1' onClick={() => handleLogout()}>
                      <div
                        className='flex items-center justify-between h-9 px-3 rounded-lg cursor-pointer group hover:bg-gray-50'
                      >
                        <div className='font-normal text-[14px] text-gray-700'>{t('common.userProfile.logout')}</div>
                        <LogOut01 className='hidden w-[14px] h-[14px] text-gray-500 group-hover:flex' />
                      </div>
                    </div>
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </>
          )
        }
      </Menu>
      {
        settingVisible && <AccountSetting onCancel={() => setSettingVisible(false)} />
      }
      {
        // aboutVisible && <AccountAbout onCancel={() => setAboutVisible(false)} langeniusVersionInfo={langeniusVersionInfo} />
      }
    </div >
  )
}