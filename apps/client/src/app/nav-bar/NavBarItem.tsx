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
      className="flex flex-row gap-4 cursor-pointer border-b-[1px] py-2 pl-2 hover:bg-gray-200"
      onClick={onClick}
      onKeyDown={onClick}
      role="button"
      tabIndex={0}
    >
      <span>{icon}</span>
      {label}
    </div>
  )
}
