'use client'

import { styled } from '@mui/material/styles'

// import Banner from 'ui-component/extended/Banner';

import { useEffect, useState } from 'react'
import { redirect } from 'next/navigation'
import { Loading } from './components/base/icons/src/public/thought'
import ApiServices from '@/app/components/landingpage/ApiServices'
import AppBar from '@/app/components/landingpage/AppBar'

import DiverseSupport from '@/app/components/landingpage/DiverseSupport'
import EasyToUse from '@/app/components/landingpage/EasyToUse'
import EmbededDirectly from '@/app/components/landingpage/EmbededDirectly'
import EndlessPossibilities from '@/app/components/landingpage/EndlessPossibilities'
import Footer from '@/app/components/landingpage/Footer'
import LanguageCodeType from '@/app/components/landingpage/LanguageCodeType'
import NextExperience from '@/app/components/landingpage/NextExperience'
import OptimizeStreamline from '@/app/components/landingpage/OptimizeStreamline'
import PowerOfDataSet from '@/app/components/landingpage/PowerOfDataSet'
import ProductPhilosophy from '@/app/components/landingpage/ProductPhilosophy'
import PromptEngineering from '@/app/components/landingpage/PromptEngineering'

// import NewHeader from 'components/landingpage/NewHeader';
const HeaderWrapper = styled('div')(({ theme }) => ({
  overflowX: 'hidden',
  overflowY: 'clip',
  backgroundColor: '#0E0C15',
}))

const SecondWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  paddingTop: 30,
  backgroundColor: '#0E0C15',
  [theme.breakpoints.down('md')]: {
    paddingTop: 60,
  },
}))
const ThirdWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  paddingTop: 60,
  backgroundColor: '#0E0C15',
  [theme.breakpoints.down('md')]: {
    paddingTop: 30,
  },
}))

const FourthWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  paddingTop: 60,
  backgroundColor: '#0E0C15',
  [theme.breakpoints.down('lg')]: {
    paddingTop: 30,
  },
}))
const FullyWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  // paddingTop: 100,
  backgroundColor: '#0E0C15',
  [theme.breakpoints.down('md')]: {
    paddingTop: 30,
  },
}))
const LastWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  // paddingTop: 100,
  backgroundColor: '#0E0C15',
  [theme.breakpoints.down('md')]: {
    paddingTop: 30,
  },
}))
const SecondLastWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  // paddingTop: 100,
  backgroundColor: '#0E0C15',
  [theme.breakpoints.down('md')]: {
    paddingTop: 30,
  },
}))
// =============================|| LANDING MAIN ||============================= //

const Landing = () => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
    redirect('/apps')
  }, [])
  return <Loading />
  return mounted && (
    <>
      <HeaderWrapper id="home">
        {/* <Banner /> */}
        <AppBar background={'transparent'} />
        {/* <Box
          component={'img'}
          src="/assets/images/header/background.svg"
          sx={{
            position: 'absolute',
            top: '40px',
            maxWidth: '100%',
            zIndex: 1,
            width: '100%'
          }}
          alt="InfraHive - Background"
        /> */}

        {/* <NewHeader /> */}
      </HeaderWrapper>
      <FullyWrapper>
        <ProductPhilosophy />
      </FullyWrapper>
      <FullyWrapper>
        <EndlessPossibilities />
      </FullyWrapper>
      <SecondWrapper>
        <EasyToUse />
      </SecondWrapper>

      <ThirdWrapper>
        <DiverseSupport />
      </ThirdWrapper>
      <ThirdWrapper>
        <ApiServices />
      </ThirdWrapper>
      <FourthWrapper>
        <EmbededDirectly />
      </FourthWrapper>
      <FullyWrapper>
        <PromptEngineering />
      </FullyWrapper>
      <FullyWrapper>
        <NextExperience />
      </FullyWrapper>
      <FullyWrapper>
        <LanguageCodeType />
      </FullyWrapper>
      <LastWrapper>
        <PowerOfDataSet />
      </LastWrapper>

      {/*  */}

      <LastWrapper>
        <OptimizeStreamline />
      </LastWrapper>
      {/*  */}

      <ThirdWrapper>
        {/* <Notification /> */}
        <Footer />
      </ThirdWrapper>
      {/* <Customization /> */}
    </>
  )
}

export default Landing
