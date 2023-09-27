'use client'

import { forwardRef, useState } from 'react'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { Box, Button, Grid, Paper, useTheme } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

import style from '../list.module.css'
const CreateAppCard = forwardRef<HTMLAnchorElement>((_, ref) => {
  const theme = useTheme()

  const { t } = useTranslation()
  const [showNewAppDialog, setShowNewAppDialog] = useState(false)

  return (
    <a ref={ref} className={classNames(style.listItem, style.newItemCard)} href='/datasets/create'>
      <Paper >
        <Box sx={{ p: 1.5, height: '160px' }} >
          <Grid
            container
            direction="column"
            sx={{
              height: '100%',
              borderRadius: '5px',
              border: '1px dashed rgba(113, 117, 121, 0.30)',
              display: 'flex',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <Grid item sx={{ width: '100%', display: 'flex', margin: 'auto', textAlign: 'center', justifyContent: 'center' }}>
              <Button
                sx={{
                  fontWeight: 500,
                  color: theme.palette.mode === 'dark' ? theme.palette.text.secondary : '#717579',
                  borderRadius: '10px',
                  border: '1px dashed #809FB8',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '8px',
                  height: '100%',
                  background: '#F4F9FB',
                  width: '80%',
                }}

              >
                <Box sx={{ padding: '2px', border: '1px solid #D9E1E7', borderRadius: '10px' }}>
                  <AddIcon style={{ color: '#FDC201' }} />
                </Box>
                <span style={{ marginLeft: '5px', color: '#202224' }}>Create New Dataset</span>
              </Button>

            </Grid>
          </Grid>
        </Box>
      </Paper>

      {/* <div className='text-xs text-gray-500'>{t('app.createFromConfigFile')}</div> */}
    </a>
  )
})

export default CreateAppCard
