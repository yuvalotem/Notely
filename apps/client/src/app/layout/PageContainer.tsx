import { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

export function PageContainer({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={twMerge(
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
