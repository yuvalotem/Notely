import { cx } from 'class-variance-authority'
import { PropsWithChildren } from 'react'

type CardElementProps = PropsWithChildren<{ className?: string }>

function Card({ children, className }: CardElementProps) {
  return (
    <div className={cx('w-full border-[1px] rounded-md', className)}>
      {children}
    </div>
  )
}

Card.Header = function Header({ children, className }: CardElementProps) {
  return (
    <div className={cx('w-full border-solid border-b-[1px] p-2', className)}>
      {children}
    </div>
  )
}

Card.Body = function Body({ children, className }: CardElementProps) {
  return <div className={cx('w-full p-2', className)}>{children}</div>
}

export default Card
