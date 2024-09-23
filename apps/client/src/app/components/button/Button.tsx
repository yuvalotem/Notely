import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from '@mui/material'
import { PropsWithChildren, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

type ButtonVariant = 'primary' | 'secondary' | 'text' | 'outlined' | 'danger'
export type ButtonProps = PropsWithChildren<{
  className?: string
  onClick?: () => void
  /**
   * @default 'primary'
   */
  variant?: ButtonVariant
  disabled?: boolean
}>

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant = 'primary', ...props }, ref) => {
    return (
      <button
        className={twMerge(baseButtonStyle, buttonStyles[variant], className)}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)

const baseButtonStyle = 'w-fit py-1 px-4 rounded'

const buttonStyles: Record<ButtonVariant, string> = {
  outlined: 'border-2 border-black',
  primary: 'bg-blue-500 text-white hover:bg-blue-700',
  secondary: 'bg-white text-black',
  text: 'text-black hover:bg-gray-200',
  danger: 'text-white bg-red-500 hover:bg-red-700',
}
