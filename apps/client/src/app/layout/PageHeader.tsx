import { ReactNode } from 'react'

type PageHeaderProps = {
  title: string
  actions?: ReactNode
}
export function PageHeader({ title, actions }: PageHeaderProps) {
  return (
    <div className="flex w-full flex-row justify-between h-20 items-center bg-white/40 backdrop-blur-xl border-b border-white/10 sticky top-16 z-40 shrink-0 px-[var(--app-margin-x)]">
      <h1 className="text-3xl font-bold text-ios-dark tracking-tight pr-2 pb-1">
        {title}
      </h1>
      {actions}
    </div>
  )
}
