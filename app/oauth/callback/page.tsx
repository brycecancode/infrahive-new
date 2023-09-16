'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

export default function CalbackPage() {
  const router = useRouter()
  useEffect(() => {
    const url = window.location.href
    const params = new URL(url).searchParams
    const access_token = params.get('access_token')
    const referesh_token = params.get('refresh_token')
    localStorage.setItem('mainToken', access_token || '')
    router.push('/apps')
  }, [router])
  return <div>Please wait ...</div>
}
