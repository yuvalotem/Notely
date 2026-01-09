import { cva } from 'class-variance-authority'
import { forwardRef, PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

const buttonStyles = cva(
  [
    'font-medium',
    'border',
    'rounded-xl',
    'cursor-pointer',
    'transition-all',
    'duration-200',
    'active:scale-95',
    'flex',
    'items-center',
    'justify-center',
  ],
  {
    variants: {
      intent: {
        primary: [
          'bg-ios-blue',
          'text-white',
          'border-transparent',
          'hover:bg-ios-blue/90',
          'shadow-md',
          'hover:shadow-lg',
        ],
        secondary: [
          'bg-ios-gray-200',
          'text-ios-dark',
          'border-transparent',
          'hover:bg-ios-gray-300',
          'shadow-sm',
        ],
        text: ['text-ios-blue', 'border-none', 'hover:bg-ios-blue/10'],
        danger: [
          'text-white',
          'bg-ios-red',
          'hover:bg-ios-red/90',
          'shadow-md',
        ],
      },
      size: {
        small: ['text-xs', 'py-1', 'px-3'],
        medium: ['text-sm', 'py-1.5', 'px-4'],
        large: ['text-base', 'py-2', 'px-6'],
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
  ({ className, children, variant, size, disabled, ...props }, ref) => (
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
)
