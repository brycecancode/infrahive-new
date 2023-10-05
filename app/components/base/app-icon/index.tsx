import type { FC } from 'react'
import classNames from 'classnames'

import data from '@emoji-mart/data'
import { init } from 'emoji-mart'
import style from './style.module.css'

init({ data })

export type AppIconProps = {
  size?: 'tiny' | 'small' | 'medium' | 'large'
  rounded?: boolean
  icon?: string
  background?: string
  className?: string
  innerIcon?: React.ReactNode
  onClick?: () => void
  isIcon?: boolean
  image?: string
}

const AppIcon: FC<AppIconProps> = ({
  size = 'medium',
  rounded = false,
  icon,
  background,
  className,
  innerIcon,
  isIcon = true,
  image,

  onClick,
}) => {
  if (isIcon) {
    return (
      <span
        className={classNames(
          style.appIcon,
          size !== 'medium' && style[size],
          rounded && style.rounded,
          className ?? '',
        )}
        style={{
          background,
        }}
        onClick={onClick}
      >

        {innerIcon || ((icon && icon !== '') ? <em-emoji id={icon} /> : <em-emoji id='🤖' />)}
      </span>
    )
  }
  else {
    return <img src={image} className={classNames(
      style.appIcon,
      size !== 'medium' && style[size],
      rounded && style.rounded,
      className ?? '',
    )} />
  }
}

export default AppIcon
