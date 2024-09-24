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
  | ({} & HtmlInputProps)
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
  return <input {...props} className={finalClassName} />
}

const inputBaseStyle = 'px-2 py-0.5 rounded border-[1px] border-gray-500'
