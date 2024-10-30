import { cva } from 'class-variance-authority'
import { PropsWithChildren, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

type ButtonVariant = 'primary' | 'secondary' | 'text' | 'danger'
export type ButtonProps = PropsWithChildren<{
  className?: string
  onClick?: () => void
  /**
   * @default 'primary'
   */
  variant?: ButtonVariant
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
}>

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant, size, disabled, ...props }, ref) => {
    return (
      <button
        className={twMerge(
          buttonStyles({ intent: variant, size, disabled }),
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)

const buttonStyles = cva(
  ['font-semibold', 'border', 'rounded', 'cursor-pointer'],
  {
    variants: {
      intent: {
        primary: [
          'bg-blue-500',
          'text-white',
          'border-transparent',
          'hover:bg-blue-600',
        ],
        secondary: [
          'bg-white',
          'text-gray-800',
          'border-gray-400',
          'hover:bg-gray-100',
        ],
        text: ['text-black', 'border-none', 'hover:bg-gray-200'],
        danger: ['text-white', 'bg-red-500', 'hover:bg-red-700'],
      },
      size: {
        small: ['text-xs', 'py-0.5', 'px-1'],
        medium: ['text-sm', 'py-1', 'px-2'],
        large: ['text-base', 'py-2', 'px-4'],
      },
      disabled: {
        true: ['cursor-not-allowed', 'opacity-50'],
      },
    },
    compoundVariants: [
      {
        intent: 'primary',
        size: 'medium',
      },
    ],
    defaultVariants: {
      intent: 'primary',
      size: 'medium',
    },
  }
)
