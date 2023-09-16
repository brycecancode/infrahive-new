'use client'
import React, { useEffect } from 'react'
import type { FC } from 'react'
import { Box, Tab, Tabs } from '@mui/material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export type IAppDetailNavProps = {
  iconType?: 'app' | 'dataset' | 'notion'
  title: string
  desc: string
  icon: string
  icon_background: string
  navigation: Array<{
    name: string
    href: string
    icon: any
    selectedIcon: any
  }>
  extraInfo?: React.ReactNode
}
function samePageLinkNavigation(
  event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
) {
  if (
    event.defaultPrevented
    || event.button !== 0 // ignore everything but left-click
    || event.metaKey
    || event.ctrlKey
    || event.altKey
    || event.shiftKey
  )
    return false

  return true
}
const AppDetailNav: FC<IAppDetailNavProps> = ({ title, desc, icon, icon_background, navigation, extraInfo, iconType = 'app' }) => {
  const [value, setValue] = React.useState(0)
  const path = usePathname()

  useEffect(() => {
    navigation.map((item, index) => {
      if (item.href.includes(path) || path.includes(item.href))
        setValue(index)
      return item
    })
  }, [navigation, path])

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    // event.type can be equal to focus with selectionFollowsFocus.
    if (
      event.type !== 'click'
      || (event.type === 'click'
        && samePageLinkNavigation(
          event as React.MouseEvent<HTMLAnchorElement, MouseEvent>,
        ))
    )
      setValue(newValue)
  }
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Box sx={{ display: 'flex' }}>
        <Tabs value={value} onChange={handleChange} TabIndicatorProps={{
          style: {
            backgroundColor: '#FDC201',
          },
        }}>
          {navigation.map((item, index) => {
            return (
              <Link href={item.href} key={index} passHref>
                <Tab component="a" label={item.name} />
              </Link>
            )
          },
          )}

        </Tabs>

      </Box>

    </Box>

  )
}

export default React.memo(AppDetailNav)
