'use client'
import type { ReactElement } from 'react'
import React from 'react'

// material-ui
import { styled, useTheme } from '@mui/material/styles'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  AppBar as MuiAppBar,
  Stack,
  Toolbar,
  Typography,
  useScrollTrigger,
} from '@mui/material'
import type { TooltipProps } from '@mui/material/Tooltip'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'

// project imports

// assets
import MenuIcon from '@mui/icons-material/Menu'
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits'
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import AppShortcutIcon from '@mui/icons-material/AppShortcut'
import Diversity3Icon from '@mui/icons-material/Diversity3'
import EditNoteIcon from '@mui/icons-material/EditNote'
import ScrollBar from 'react-perfect-scrollbar'
import ContactPageIcon from '@mui/icons-material/ContactPage'

// elevation scroll
type ElevationScrollProps = {
  children: ReactElement
  window?: Window | Node
}

const TooltipButton = ({ text, image }: { text: String; image: String }) => {
  return (
    <Stack direction={'row'} alignItems={'center'} gap={'10px'}>
      <Box
        sx={{
          width: '40px',
          height: '40px',
          cursor: 'pointer',
          borderRadius: '50%',
          display: 'flex',
          backgroundColor: 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box component={'img'} src={`/assets/images/${image}.png`} width={'100%'} height={'auto'} />
      </Box>
      <Typography sx={{ color: 'rgb(255, 255, 255)' }} variant="h4">
        {text}
      </Typography>
    </Stack>
  )
}
function ElevationScroll({ children, window }: ElevationScrollProps) {
  const theme = useTheme()
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window!,
  })
  const darkBorder = theme.palette.grey[200]

  return React.cloneElement(children, {
    elevation: trigger ? 2 : 0,
    style: {
      backgroundColor: theme.palette.background.default,
      borderColor: trigger ? '' : darkBorder,
      color: 'white',
    },
  })
}

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => <Tooltip {...props} classes={{ popper: className }} />)(
  ({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: 'transparent',
      color: 'rgba(0, 0, 0, 0.87)',
      fontSize: theme.typography.pxToRem(12),
      maxWidth: 800,
    },
  }),
)
// ==============================|| MINIMAL LAYOUT APP BAR ||============================== //

const MenuAccordion = (props: any) => {
  const [expanded, setExpanded] = React.useState(false)

  const handleAccordionChange = () => {
    setExpanded(!expanded)
  }
  return (
    <Accordion
      expanded={expanded}
      sx={{
        'backgroundColor': 'transparent',
        'marginTop': 0,
        'paddingTop': 0,
        'border': 'none',
        'boxShadow': 'none',
        '&:before': {
          display: 'none',
        },
      }}
      onClick={handleAccordionChange}
    >
      <AccordionSummary sx={{ color: 'white' }}>
        <ListItemText
          secondary={
            <>
              {props.icon} &nbsp; {props.title}
            </>
          }
        />
      </AccordionSummary>
      <AccordionDetails className="max-h-[300px]">
        <ScrollBar style={{ maxHeight: '300px' }}>
          {props.data.map((i: any) => {
            return (
              <Button className="justify -start flex  w-[100%]">
                <TooltipButton text={i.text} image={i.image} />
              </Button>
            )
          })}
        </ScrollBar>
      </AccordionDetails>
    </Accordion>
  )
}

const fdata = [
  { text: 'Generative AI', image: 'solutions/generative-ai' },
  { text: 'LangChain Apps', image: 'solutions/langchain' },
  { text: 'LLMs Fine Tune', image: 'solutions/llm' },
  { text: 'ChatGPT Plugins', image: 'solutions/plugins' },
]

const Sdata = [
  { text: 'Open AI', image: 'partnerships/open-ai' },
  { text: 'Co:here', image: 'partnerships/cohere' },
  { text: 'Anthropic', image: 'partnerships/anthropic' },
  { text: 'Stability AI', image: 'partnerships/stability-ai' },
  { text: 'Customer Support', image: 'partnerships/customer-support' },
  { text: 'Data Analysis', image: 'partnerships/data-analysis' },
  { text: 'Data Transformer', image: 'partnerships/data-transformer' },
  { text: 'Data Annotation', image: 'partnerships/data-annotation' },
  { text: 'Data Classification', image: 'partnerships/data-classification' },
  { text: 'Chrome Extension', image: 'partnerships/chrome' },
  { text: 'Google Sheets', image: 'partnerships/google-sheets' },
  { text: 'REST API', image: 'partnerships/api' },
  { text: 'Snowflake', image: 'partnerships/snowflake' },
]

const AppBar = ({ ...others }) => {
  const [drawerToggle, setDrawerToggle] = React.useState<boolean>(false)
  /** Method called on multiple components with different event types */
  const drawerToggler = (open: boolean) => (event: any) => {
    if (event.type! === 'keydown' && (event.key! === 'Tab' || event.key! === 'Shift'))
      return

    setDrawerToggle(open)
  }

  return (
    <ElevationScroll {...others} >
      <MuiAppBar
        position="relative"
        sx={{
          background: `${others.background} !important`,
        }}
      >
        <Container>
          <Toolbar sx={{ padding: '10px' }}>
            <Typography component="div" sx={{ flexGrow: 1, textAlign: 'left' }}>
              <div className='main-logo'></div>
            </Typography>
            <Stack direction="row" sx={{ display: { xs: 'none', sm: 'block' } }} spacing={2}>

              {/* <a href="/vision">

                Vision

              </a>
              <a href="/apps">
                <Button
                  color="inherit"
                  sx={{ '&:hover': { backgroundColor: 'transparent' }, 'color': 'rgb(255, 255, 255);' }}
                  component={Link}
                  target="_blank"
                >
                  Pre-Built Apps
                </Button>
              </a>

              <a href="https://blog.infrahive.io/" target={'_blank'}>
                <Button
                  color="inherit"
                  sx={{ '&:hover': { backgroundColor: 'transparent' }, 'color': 'rgb(255, 255, 255);' }}
                  component={Link}
                  target="_blank"
                >
                  Blog
                </Button>
              </a>
              <Link href="/contact">
                <Button
                  color="inherit"
                  sx={{ '&:hover': { backgroundColor: 'transparent' }, 'color': 'rgb(255, 255, 255);' }}
                  component={Link}
                  target="_blank"
                >
                  Contact Us
                </Button>
              </Link> */}
              <Button
                className="my-auto mt-4"
                sx={{
                  color: '#000000',
                  fontWeight: 'bold',
                  background: '#ffffff',
                  height: '3rem',
                }}
                variant="contained"
                href="/apps"
              >
                Go To App
              </Button>
            </Stack>
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
              <IconButton sx={{ color: 'white' }} onClick={drawerToggler(true)} size="large">
                <MenuIcon />
              </IconButton>
              <Drawer anchor="top" open={drawerToggle} onClose={drawerToggler(false)}>
                {drawerToggle && (
                  <Box sx={{ width: 'auto', backgroundColor: 'black', color: 'white !important' }} role="presentation">
                    <List>
                      {/* <div className="mb-4 w-full text-center md:mb-0 md:w-1/2 md:text-left lg:w-1/3">
                        <Image width={255} height={80} src="/footer/InfraHiveLogo.svg" alt="InfraHiveLogo" />
                      </div> */}

                      <MenuAccordion title="Product" icon={<ProductionQuantityLimitsIcon />} data={fdata}></MenuAccordion>
                      <MenuAccordion title="Solutions" icon={<EmojiObjectsIcon />} data={Sdata}></MenuAccordion>
                      <Link style={{ textDecoration: 'none' }} href="/vision">
                        <ListItemButton component="a">
                          <ListItemIcon>
                            <RemoveRedEyeIcon />
                          </ListItemIcon>
                          <ListItemText
                            secondary="Vision"
                            secondaryTypographyProps={{
                              sx: {
                                color: 'white',
                              },
                            }}
                          />
                        </ListItemButton>
                      </Link>
                      <Link style={{ textDecoration: 'none' }} href="/apps">
                        <ListItemButton component="a">
                          <ListItemIcon>
                            <AppShortcutIcon />
                          </ListItemIcon>
                          <ListItemText
                            secondary="Pre-Built Apps"
                            secondaryTypographyProps={{
                              sx: {
                                color: 'white',
                              },
                            }}
                          />
                        </ListItemButton>
                      </Link>
                      <Link style={{ textDecoration: 'none' }} href="/join">
                        <ListItemButton component="a">
                          <ListItemIcon>
                            <Diversity3Icon />
                          </ListItemIcon>
                          <ListItemText
                            secondary="Join Us"
                            secondaryTypographyProps={{
                              sx: {
                                color: 'white',
                              },
                            }}
                          />
                        </ListItemButton>
                      </Link>
                      <Link style={{ textDecoration: 'none' }} href="https://blog.infrahive.io/">
                        <ListItemButton component="a">
                          <ListItemIcon>
                            <EditNoteIcon />
                          </ListItemIcon>
                          <ListItemText
                            secondary="Blog"
                            secondaryTypographyProps={{
                              sx: {
                                color: 'white',
                              },
                            }}
                          />
                        </ListItemButton>
                      </Link>
                      <Link style={{ textDecoration: 'none' }} href="/contact">
                        <ListItemButton component="a">
                          <ListItemIcon>
                            <ContactPageIcon />
                          </ListItemIcon>
                          <ListItemText
                            secondary="Contact Now"
                            secondaryTypographyProps={{
                              sx: {
                                color: 'white',
                              },
                            }}
                          />
                        </ListItemButton>
                      </Link>
                    </List>
                  </Box>
                )}
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </MuiAppBar>
    </ElevationScroll >
  )
}

export default AppBar
