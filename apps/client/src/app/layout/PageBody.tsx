import { motion } from 'framer-motion'
import { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

export function PageBody({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className={twMerge(
        'w-full h-full overflow-y-auto no-scrollbar',
        className
      )}
      initial={{ opacity: 0, y: 10 }}
      style={{
        paddingLeft: 'var(--app-margin-x)',
        paddingRight: 'var(--app-margin-x)',
      }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
