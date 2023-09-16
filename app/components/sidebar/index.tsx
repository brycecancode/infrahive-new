'use client'
import { Box, Drawer, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard'
import Storage from '@mui/icons-material/Storage'
import Explore from '@mui/icons-material/Explore'
import DatasetIcon from '@mui/icons-material/Dataset'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import { useSelectedLayoutSegment } from 'next/navigation'
import s from './index.module.css'
type SidebarProps = {
  children: React.ReactNode
}

const SideBar = (props: SidebarProps) => {
  const selectedSegment = useSelectedLayoutSegment()
  const matchUpMd = true
  const isSelected = (id: string) => {
    return selectedSegment && id.includes(selectedSegment)
  }

  const drawerWidth = 240
  const icons = {
    SpaceDashboardIcon,
    Explore,
    Storage,
    DatasetIcon,

  }
  const items = [{
    id: 'apps',
    title: 'InfraBuilder',
    type: 'item',
    url: '/apps',
    icon: icons.SpaceDashboardIcon,
    breadcrumbs: false,
  },
  {
    id: 'explore',
    title: 'Explore',
    type: 'item',
    url: '/explore/apps',
    icon: icons.Explore,
    breadcrumbs: false,
  },
  {
    id: 'datasets',
    title: 'Datasets',
    type: 'item',
    url: '/datasets',
    icon: icons.DatasetIcon,
    breadcrumbs: false,
  },
  ]
  return (
    <Box>

      <Drawer
        variant='persistent'
        anchor='left'
        open={true}
        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            borderRight: 'none',
            boxShadow: '7px 0px 80px 0px rgba(0, 0, 0, 0.05)',
          },
        }}
        ModalProps={{ keepMounted: true }}
        color="inherit"
      >
        <Box
          component="div"
          style={{
            height: !matchUpMd ? 'calc(100vh - 56px)' : 'calc(100vh - 88px)',
            paddingLeft: '16px',
            paddingRight: '16px',
            paddingTop: '16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div className='flex flex-col'>
            <div className='flex items-center mb-8 '>
              <Link href="/apps" className='flex items-center '>
                <div className={s.logo} />
              </Link>

            </div>

            {/* <ExploreNav className={navClassName} />
            <AppNav />
            <PluginNav className={navClassName} />
            <DatasetNav /> */}
            {items.map((item) => {
              const Icon = item?.icon!
              const itemIcon = item?.icon
                ? (
                  <Icon stroke={1.5} size="20px" />
                )
                : (
                  <FiberManualRecordIcon
                    sx={{
                      width: isSelected(item.id) ? 8 : 6,
                      height: isSelected(item.id) ? 8 : 6,
                    }}
                    fontSize={'medium'}
                  />
                )
              return <div style={{ position: 'relative' }}>
                <Link href={item.url} >
                  <Box
                    sx={{
                      width: '9px',
                      height: '100%',
                      backgroundColor: '#FEC200',
                      borderRadius: '0px 57px 57px 0px',
                      position: 'absolute',
                      left: '0px',
                      zIndex: '1',
                      display: isSelected(item.id) ? 'block' : 'none',
                      color: isSelected(item.id) ? '#FEC200 !important' : '#717579',
                    }}
                  ></Box>
                  <ListItemButton

                    sx={{
                      'borderBottomRightRadius': '40px',
                      'borderTopRightRadius': '10px', // `${borderRadius}px`,
                      'mb': 0.5,
                      'alignItems': 'flex-start',
                      'backgroundColor': isSelected(item.id) ? '#F8F8F8 !important' : 'inherit',
                      'color': isSelected(item.id) ? '#FEC200 !important' : '#717579 !important',

                      '&:hover': {
                        background: '#F8F8F8 !important',
                      },
                    }}
                    selected={isSelected(item.id)}

                  >
                    <ListItemIcon
                      sx={{
                        my: 'auto',
                        minWidth: !item?.icon ? 18 : 36,
                        color: isSelected(item.id) ? '#FEC200 !important' : '#717579 !important',
                      }}
                    >
                      {itemIcon}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography

                          color={isSelected(item.id) ? '#FEC200' : '#717579'}
                          fontWeight={isSelected(item.id) ? 'bold' : 'normal'}
                        >
                          {item.title}
                        </Typography>
                      }

                    />

                  </ListItemButton>
                </Link>
              </div>
            })}
          </div>

          <div className='flex flex-col'>
            Test
          </div>

        </Box>
      </Drawer >
      <Box ml={30}>
        {props.children}
      </Box>
    </Box >
  )
}

export default SideBar
