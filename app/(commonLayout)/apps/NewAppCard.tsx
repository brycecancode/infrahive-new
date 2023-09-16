'use client'

import { Box, Button, Grid, Paper, useTheme } from '@mui/material'
import { forwardRef, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import NewAppDialog from './NewAppDialog'
export type CreateAppCardProps = {
  onSuccess?: () => void
}

const CreateAppCard = forwardRef<HTMLAnchorElement, CreateAppCardProps>(({ onSuccess }, ref) => {
  const theme = useTheme()

  const [showNewAppDialog, setShowNewAppDialog] = useState(false)
  return (
    <Paper onClick={() => setShowNewAppDialog(true)}>
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
              <span style={{ marginLeft: '5px', color: '#202224' }}>Create New App</span>
            </Button>
            <NewAppDialog show={showNewAppDialog} onSuccess={onSuccess} onClose={() => setShowNewAppDialog(false)} />
          </Grid>
        </Grid>
      </Box>
    </Paper>

  )
})

export default CreateAppCard
