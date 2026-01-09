import { cx } from 'class-variance-authority'
import { PropsWithChildren } from 'react'

type CardElementProps = PropsWithChildren<{ className?: string }>

function Card({ children, className }: CardElementProps) {
  return (
    <div
      className={cx(
        'w-full bg-white/40 backdrop-blur-xl border border-white/20 shadow-xl rounded-3xl overflow-hidden transition-transform hover:scale-[1.01] duration-300',
        className
      )}
    >
      {children}
    </div>
  )
}

Card.Header = function Header({ children, className }: CardElementProps) {
  return (
    <div
      className={cx(
        'w-full border-b border-white/10 p-2 text-xl font-semibold text-ios-dark/90',
        className
      )}
    >
      {children}
    </div>
  )
}

Card.Body = function Body({ children, className }: CardElementProps) {
  return <div className={cx('w-full p-2', className)}>{children}</div>
}

export default Card
