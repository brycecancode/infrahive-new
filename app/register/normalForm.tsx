'use client'
import React, { useEffect, useReducer, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'
import classNames from 'classnames'
import useSWR from 'swr'
import Link from 'next/link'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import Toast from '../components/base/toast'
import style from './page.module.css'
// import Tooltip from '@/app/components/base/tooltip/index'
import { apiPrefix } from '@/config'
import Button from '@/app/components/base/button'
import { oauth, register } from '@/service/common'
const validEmailReg = /^[\w\.-]+@([\w-]+\.)+[\w-]{2,}$/

type IState = {
  formValid: boolean
  github: boolean
  google: boolean
}

function reducer(state: IState, action: { type: string; payload: any }) {
  switch (action.type) {
    case 'login':
      return {
        ...state,
        formValid: true,
      }
    case 'login_failed':
      return {
        ...state,
        formValid: true,
      }
    case 'github_login':
      return {
        ...state,
        github: true,
      }
    case 'github_login_failed':
      return {
        ...state,
        github: false,
      }
    case 'google_login':
      return {
        ...state,
        google: true,
      }
    case 'google_login_failed':
      return {
        ...state,
        google: false,
      }
    default:
      throw new Error('Unknown action.')
  }
}

const NormalForm = () => {
  const { t } = useTranslation()
  const router = useRouter()

  const [state, dispatch] = useReducer(reducer, {
    formValid: false,
    github: false,
    google: false,
  })

  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const handleEmailPasswordRegister = async () => {
    if (!validEmailReg.test(email)) {
      Toast.notify({
        type: 'error',
        message: t('login.error.emailInValid'),
      })
      return
    }
    if (!firstName || !lastName || !password) {
      Toast.notify({
        type: 'error',
        message: 'Please fill all required fields.',
      })
      return
    }
    try {
      setIsLoading(true)
      const data = await register({
        url: '/register',
        body: {
          email,
          password,
          fname: firstName,
          lname: lastName,
          remember_me: true,
        },
      })
      if (data?.result === 'success') {
        Toast.notify({
          type: 'success',
          message: data.message,
        })
        router.push('/signin')
      }
      else {
        Toast.notify({
          type: 'error',
          message: data.message,
        })
      }
    }
    finally {
      setIsLoading(false)
    }
  }

  const { data: github, error: github_error } = useSWR(state.github
    ? ({
      url: '/oauth/login/github',
      // params: {
      //   provider: 'github',
      // },
    })
    : null, oauth)

  const { data: google, error: google_error } = useSWR(state.google
    ? ({
      url: '/oauth/login/google',
      // params: {
      //   provider: 'google',
      // },
    })
    : null, oauth)

  useEffect(() => {
    if (github_error !== undefined)
      dispatch({ type: 'github_login_failed', payload: null })
    if (github)
      window.location.href = github.redirect_url
  }, [github, github_error])

  useEffect(() => {
    if (google_error !== undefined)
      dispatch({ type: 'google_login_failed', payload: null })
    if (google)
      window.location.href = google.redirect_url
  }, [google, google])

  return (
    <>
      <div className="w-full mx-auto">
        <div className="text-[32px] font-bold text-gray-900">Register</div>
      </div>

      <div className="w-full mx-auto mt-2">
        <div className="bg-white ">

          <form onSubmit={() => { }}>
            <div className='mb-5'>
              <label htmlFor="email" className="my-2 block text-sm font-medium text-gray-900">
                First Name
              </label>
              <div className="mt-1">
                <input
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  id="name"
                  type="text"
                  autoComplete="name"
                  placeholder={'First Name'}
                  className={'appearance-none block w-full rounded-lg pl-[14px] px-3 py-2 border border-gray-200 hover:border-gray-300 hover:shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 placeholder-gray-400 caret-primary-600 sm:text-sm'}
                />
              </div>
            </div>
            <div className='mb-5'>
              <label htmlFor="email" className="my-2 block text-sm font-medium text-gray-900">
                Last Name
              </label>
              <div className="mt-1">
                <input
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  id="lastName"
                  type="string"
                  autoComplete="lastName"
                  placeholder={'Last Name'}
                  className={'appearance-none block w-full rounded-lg pl-[14px] px-3 py-2 border border-gray-200 hover:border-gray-300 hover:shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 placeholder-gray-400 caret-primary-600 sm:text-sm'}
                />
              </div>
            </div>
            <div className='mb-5'>
              <label htmlFor="email" className="my-2 block text-sm font-medium text-gray-900">
                {t('login.email')}
              </label>
              <div className="mt-1">
                <input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder={t('login.emailPlaceholder') || ''}
                  className={'appearance-none block w-full rounded-lg pl-[14px] px-3 py-2 border border-gray-200 hover:border-gray-300 hover:shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 placeholder-gray-400 caret-primary-600 sm:text-sm'}
                />
              </div>
            </div>

            <div className='mb-4'>
              <label htmlFor="password" className="my-2 flex items-center justify-between text-sm font-medium text-gray-900">
                <span>{t('login.password')}</span>
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <input
                  id="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder={t('login.passwordPlaceholder') || ''}
                  className={'appearance-none block w-full rounded-lg pl-[14px] px-3 py-2 border border-gray-200 hover:border-gray-300 hover:shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 placeholder-gray-400 caret-primary-600 sm:text-sm pr-10'}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500"
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </button>
                </div>
              </div>
            </div>

            <div className='mb-2'>
              <Button
                type='primary'
                onClick={handleEmailPasswordRegister}
                disabled={isLoading}
                className="w-full !fone-medium !text-sm"
              >Register</Button>
            </div>
          </form>
          <div className="relative mt-6">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 text-gray-300 bg-white">OR</span>
            </div>
          </div>
          <div className="flex flex-col gap-3 mt-6">
            {/*  <div className='w-full'>
              <a href={`${apiPrefix}/oauth/login/github`}>
                <Button
                  type='default'
                  disabled={isLoading}
                  className='w-full hover:!bg-gray-50 !text-sm !font-medium'
                >
                  <>
                    <span className={
                      classNames(
                        style.githubIcon,
                        'w-5 h-5 mr-2',
                      )
                    } />
                    <span className="truncate text-gray-800">{t('login.withGitHub')}</span>
                  </>
                </Button>
              </a>
            </div> */}
            <div className='w-full'>
              <a href={`${apiPrefix}/oauth/login/google`}>
                <Button
                  type='default'
                  disabled={isLoading}
                  className='w-full hover:!bg-gray-50 !text-sm !font-medium'
                >
                  <>
                    <span className={
                      classNames(
                        style.googleIcon,
                        'w-5 h-5 mr-2',
                      )
                    } />
                    <span className="truncate text-gray-800">{t('login.withGoogle')}</span>
                  </>
                </Button>
              </a>
            </div>
          </div>
          <div className="w-hull text-center block mt-2 text-xs text-gray-600">
            Already have an account ?
            <Link
              className='text-primary-600'
              href='/signin'
            >SignIn</Link>

          </div>

        </div>
      </div>

    </>
  )
}

export default NormalForm
