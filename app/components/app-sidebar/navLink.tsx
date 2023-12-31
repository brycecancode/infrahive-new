'use client'
import { useSelectedLayoutSegment } from 'next/navigation'
import classNames from 'classnames'
import Link from 'next/link'

export default function NavLink({
  name,
  href,
  iconMap,
}: {
  name: string
  href: string
  iconMap: { selected: any; normal: any }
}) {
  const segment = useSelectedLayoutSegment()
  const isActive = href.toLowerCase().split('/')?.pop() === segment?.toLowerCase()
  const NavIcon = isActive ? iconMap.selected : iconMap.normal

  return (
    <Link
      key={name}
      href={href}
      className={classNames(
        isActive ? 'bg-primary-50 text-primary-600 font-semibold' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-700',
        'group flex items-center rounded-md px-2 py-2 text-sm font-normal',
      )}
    >

      {name}
    </Link>
  )
}
