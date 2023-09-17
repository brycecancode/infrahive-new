'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

type IAccountSettingProps = {
  onCancel: () => void
  activeTab?: string
}
export default function AccountSetting({
  onCancel,
  activeTab = 'account',

}: IAccountSettingProps) {
  const router = useRouter()
  useEffect(() => {
    router.push(`/settings?tab=${activeTab}`)
  }, [router])

  return <></>
}
