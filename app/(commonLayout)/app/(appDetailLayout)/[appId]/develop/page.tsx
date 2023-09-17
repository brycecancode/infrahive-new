import React from 'react'
import { getDictionary } from '@/i18n/server'
import { type Locale } from '@/i18n'
import DevelopMain from '@/app/components/develop'
import CommingSoon from '@/app/components/comming-soon'

export type IDevelopProps = {
  params: { locale: Locale; appId: string }
}

const Develop = async ({
  params: { locale, appId },
}: IDevelopProps) => {
  const dictionary = await getDictionary(locale)
  return <CommingSoon />
  return <DevelopMain appId={appId} dictionary={dictionary} />
}

export default Develop
