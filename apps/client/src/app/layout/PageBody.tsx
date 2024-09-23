import { FC, PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

export const PageBody: FC<PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => {
  return (
    <div className={twMerge('w-full h-full p-4', className)}>{children}</div>
  )
}
