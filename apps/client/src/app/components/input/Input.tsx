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

const inputBaseStyle = 'px-2 py-0.5 rounded border-[1px] border-gray-200'

export function Input(props: InputProps) {
  const { className } = props
  const finalClassName = twMerge(inputBaseStyle, className)

  if (inputVariantGuard(props)) {
    return <textarea cols={40} rows={5} {...props} className={finalClassName} />
  }

  const { onChange: baseOnChange, onValueChange, ...rest } = props

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange?.(e.target.value)
    baseOnChange?.(e)
  }

  return <input {...rest} className={finalClassName} onChange={onChange} />
}
