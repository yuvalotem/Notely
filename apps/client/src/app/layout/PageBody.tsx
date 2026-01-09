import { motion } from 'framer-motion'
import { PropsWithChildren } from 'react'

import { cn } from '../utils'

export function PageBody({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className={cn('w-full h-full overflow-y-auto no-scrollbar', className)}
      initial={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
