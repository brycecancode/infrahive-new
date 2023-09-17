import type { FC } from 'react'
import React from 'react'
import ExploreClient from '@/app/components/explore'
import CommingSoon from '@/app/components/comming-soon'
export type IAppDetail = {
  children: React.ReactNode
}

const AppDetail: FC<IAppDetail> = ({ children }) => {
  return <CommingSoon />
  return (
    <ExploreClient>
      {children}
    </ExploreClient>
  )
}

export default React.memo(AppDetail)
