import { cva } from 'class-variance-authority'
import { ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { isRouteActive } from '../routes'

const containerStyles = cva(
  'group flex flex-row items-center gap-2 cursor-pointer py-2 px-4 rounded-xl transition-all duration-300 active:scale-95',
  {
    variants: {
      isActive: {
        true: 'bg-white/60 shadow-sm',
        false: 'hover:bg-white/50 hover:shadow-sm',
      },
    },
  }
)

const iconStyles = cva('transition-colors duration-300', {
  variants: {
    isActive: {
      true: 'text-ios-blue/80',
      false: 'text-ios-gray-600 group-hover:text-ios-blue/80',
    },
  },
})

const labelStyles = cva(
  'hidden sm:inline font-medium text-sm tracking-wide transition-colors duration-300',
  {
    variants: {
      isActive: {
        true: 'text-ios-blue/80',
        false: 'text-ios-dark/70 group-hover:text-ios-blue/80',
      },
    },
  }
)

export type NavBarItemProps = {
  label: string
  path: string
  icon: ReactNode
}

export function NavBarItem({ label, path, icon }: NavBarItemProps) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const isActive = isRouteActive(path, pathname)

  const onClick = () => {
    navigate(path)
  }

  return (
    <div
      className={containerStyles({ isActive })}
      onClick={onClick}
      onKeyDown={onClick}
      role="button"
      tabIndex={0}
    >
      <span className={iconStyles({ isActive })}>{icon}</span>
      <span className={labelStyles({ isActive })}>{label}</span>
    </div>
  )
}
