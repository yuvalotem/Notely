import { cx } from 'class-variance-authority'
import { FC, PropsWithChildren } from 'react'

type CardElementProps = PropsWithChildren<{ className?: string }>

type CardElementType = FC<CardElementProps> & {
  Header: FC<CardElementProps>
  Body: FC<CardElementProps>
}

const Card: CardElementType = ({ children, className }) => {
  return (
    <div className={cx('w-full border-[1px] rounded-md', className)}>
      {children}
    </div>
  )
}

Card.Header = ({ children, className }) => {
  return (
    <div className={cx('w-full border-solid border-b-[1px] p-2', className)}>
      {children}
    </div>
  )
}

Card.Body = ({ children, className }) => {
  return <div className={cx('w-full p-2', className)}>{children}</div>
}

export default Card
