import React from 'react'

import Configuration from '@/app/components/app/configuration'
import { RouteChangesProvider } from '@/hooks/useRouteChangeEvents'
const IConfiguration = async () => {
  return (
    <RouteChangesProvider>
      <Configuration />
    </RouteChangesProvider>

  )
}

export default IConfiguration
