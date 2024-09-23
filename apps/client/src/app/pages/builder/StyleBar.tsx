import { ChangeEventHandler } from 'react'
import { ColorPicker, Input } from '../../components'
import { useBuilderPageContext } from './BuilderPageContext'

export const StyleBar = () => {
  const {
    backgroundColor,
    setBackgroundColor,
    width,
    setWidth,
    height,
    setHeight,
    borderRadius,
    setBorderRadius,
    borderWidth,
    setBorderWidth,
    padding,
    setPadding,
    color,
    setColor,
    text,
    setText,
  } = useBuilderPageContext()

  /**
   * Generates an event handler for an input field that calls the provided callback
   * with the value of the input element as an argument.
   *
   * @param callback - The callback to be called with the value of the input element.
   * @returns An event handler for an input field.
   */
  const generateInputEventHandler =
    (callback: (val: string) => void): ChangeEventHandler<HTMLInputElement> =>
    (e) =>
      callback(e.target.value)

  return (
    <div className="mr-4 p-2 border-2 w-1/3 h-fit">
      <h1 className="mb-2">Note Style</h1>
      <div className="grid grid-cols-2 gap-2">
        <ColorPicker
          label="Background Color"
          color={backgroundColor}
          onChange={setBackgroundColor}
        />
        <ColorPicker label="Color" color={color} onChange={setColor} />
        <span>Width </span>
        <Input value={width} onChange={generateInputEventHandler(setWidth)} />
        <span>Height </span>
        <Input value={height} onChange={generateInputEventHandler(setHeight)} />
        <span>Border Radius</span>
        <Input
          value={borderRadius}
          onChange={generateInputEventHandler(setBorderRadius)}
        />
        <span>Border Width</span>
        <Input
          value={borderWidth}
          onChange={generateInputEventHandler(setBorderWidth)}
        />
        <span>Padding</span>
        <Input
          value={padding}
          onChange={generateInputEventHandler(setPadding)}
        />
      </div>
      <span className="mb-2">text</span>
      <Input
        value={text}
        onChange={generateInputEventHandler(setText)}
        className="w-full"
        variant="multiline"
      />
    </div>
  )
}
