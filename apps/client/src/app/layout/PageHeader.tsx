import { ReactNode } from 'react'

type PageHeaderProps = {
  title: string
  actions?: ReactNode
}
export const PageHeader = ({ title, actions }: PageHeaderProps) => {
  return (
    <div className="flex w-full flex-row justify-between border-y-2 h-12 items-center px-4">
      {title}
      {actions}
    </div>
  )
}
