import { PropsWithChildren } from 'react'

import { cn } from '../utils'

export function PageContainer({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={cn('flex flex-col w-full min-h-0', className)}>
      {children}
    </div>
  )
}
