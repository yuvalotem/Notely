import { ReactNode } from 'react'

type PageHeaderProps = {
  title: string
  actions?: ReactNode
}
export function PageHeader({ title, actions }: PageHeaderProps) {
  return (
    <div
      className="flex w-full flex-row justify-between h-20 items-center bg-transparent shrink-0"
      style={{
        paddingLeft: 'var(--app-margin-x)',
        paddingRight: 'var(--app-margin-x)',
      }}
    >
      <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-ios-dark to-ios-gray-600 tracking-tight pr-2 pb-1">
        {title}
      </h1>
      {actions}
    </div>
  )
}
