import { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

export type NavBarItemProps = {
  label: string
  path: string
  icon: ReactNode
}
export function NavBarItem({ label, path, icon }: NavBarItemProps) {
  const navigate = useNavigate()

  const onClick = () => {
    navigate(path)
  }

  return (
    <div
      className="group flex flex-row items-center gap-2 cursor-pointer py-2 px-4 rounded-xl transition-all duration-300 hover:bg-white/50 hover:shadow-sm active:scale-95"
      onClick={onClick}
      onKeyDown={onClick}
      role="button"
      tabIndex={0}
    >
      <span className="text-ios-gray-600 group-hover:text-ios-blue transition-colors duration-300">
        {icon}
      </span>
      <span className="hidden sm:inline font-medium text-sm text-ios-dark/80 group-hover:text-ios-dark tracking-wide">
        {label}
      </span>
    </div>
  )
}
