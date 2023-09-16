'use client'
import React from 'react'

import style from './page.module.css'

const Header = () => {
  return <div className='flex items-center justify-between p-6 w-full'>
    <div className={style.logo}></div>
  </div>
}

export default Header
