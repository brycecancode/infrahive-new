import React from 'react'
import Main from '@/app/components/app/log'
import CommingSoon from '@/app/components/comming-soon'

export type IProps = {
  params: { appId: string }
}

const Logs = async ({
  params: { appId },
}: IProps) => {
  return <CommingSoon />
  return (
    <Main appId={appId} />
  )
}

export default Logs
