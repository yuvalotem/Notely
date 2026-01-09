import { PropsWithChildren } from 'react'

import { cn } from '../utils'

export function PageContainer({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={cn(
        'flex flex-col w-full h-full overflow-hidden pt-6',
        className
      )}
      style={{
        paddingLeft: 'var(--app-margin-x)',
        paddingRight: 'var(--app-margin-x)',
      }}
    >
      {children}
    </div>
  )
}
