import { twMerge } from 'tailwind-merge'

type HtmlInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>
type HtmlTextAreaProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>

export type InputProps =
  | ({ onValueChange?: (value: string) => void } & HtmlInputProps)
  | ({
      variant: 'multiline'
    } & HtmlTextAreaProps)

const inputVariantGuard = (
  props: InputProps
): props is Extract<InputProps, { variant: 'multiline' }> =>
  'variant' in props && props.variant === 'multiline'

export const Input = (props: InputProps) => {
  const { className } = props
  const finalClassName = twMerge(inputBaseStyle, className)
  if (inputVariantGuard(props)) {
    return <textarea cols={40} rows={5} {...props} className={finalClassName} />
  }
  const { onChange: _onChange, onValueChange, ...rest } = props
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange?.(e.target.value)
    _onChange?.(e)
  }
  return <input {...rest} onChange={onChange} className={finalClassName} />
}

const inputBaseStyle = 'px-2 py-0.5 rounded border-[1px] border-gray-200'
