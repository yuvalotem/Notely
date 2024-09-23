import { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

export type NavBarItemProps = {
  label: string
  path: string
  icon: ReactNode
}
export const NavBarItem = ({ label, path, icon }: NavBarItemProps) => {
  const navigate = useNavigate()
  return (
    <div
      onClick={() => navigate(path)}
      className="flex flex-row gap-4 cursor-pointer border-t-2 py-2 pl-2 hover:bg-gray-200"
    >
      <span>{icon}</span>
      {label}
    </div>
  )
}
