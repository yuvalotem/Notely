import { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

export function PageBody({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={twMerge('w-full h-full p-4', className)}>{children}</div>
  )
}
