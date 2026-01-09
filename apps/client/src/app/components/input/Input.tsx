import { cn } from '../../utils'

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

const inputBaseStyle =
  'px-4 py-3 rounded-xl border border-ios-gray-300 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-ios-blue/50 outline-none transition-all placeholder:text-gray-500 text-ios-dark shadow-sm hover:bg-white/60'

export function Input(props: InputProps) {
  const { className } = props
  const finalClassName = cn(inputBaseStyle, className)

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
