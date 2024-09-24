import { ChangeEventHandler, useState } from 'react'
import { Button, CodeEditor, ColorPicker, Input } from '../../components'
import { useBuilderContext } from './BuilderContext'

export const StyleBar = () => {
  const {
    sourceCode,
    setSourceCode,
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
  } = useBuilderContext()

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

  const [showSourceCode, setShowSourceCode] = useState(false)
  const isSourceCodeVisible = showSourceCode && sourceCode
  const [editorValue, setEditorValue] = useState<string>()

  const hadnleEditorChange = (val?: string) => {
    setSourceCode(val)
    setEditorValue(val)
  }

  const title = isSourceCodeVisible ? 'Source Code' : 'Style'

  return (
    <div
      className={`mr-4 p-2 border-2 w-${isSourceCodeVisible ? 2 : 1}/3 h-full`}
    >
      <h1 className="mb-2">{title}</h1>
      {isSourceCodeVisible ? (
        <CodeEditor
          value={editorValue ?? sourceCode}
          onChange={hadnleEditorChange}
          height={'80vh'}
        />
      ) : (
        <>
          <div className="grid grid-cols-2 gap-2">
            <ColorPicker
              label="Background Color"
              color={backgroundColor}
              onChange={setBackgroundColor}
            />
            <ColorPicker label="Color" color={color} onChange={setColor} />
            <span>Width </span>
            <Input
              value={width}
              onChange={generateInputEventHandler(setWidth)}
            />
            <span>Height </span>
            <Input
              value={height}
              onChange={generateInputEventHandler(setHeight)}
            />
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
          <span>text</span>
          <Input
            value={text}
            onChange={generateInputEventHandler(setText)}
            className="w-full mt-2"
            variant="multiline"
          />
        </>
      )}
      {sourceCode && (
        <Button
          variant="primary"
          onClick={() => setShowSourceCode(!showSourceCode)}
          className="mt-2 w-40"
        >
          {showSourceCode ? 'Show Style' : 'Show Source'}
        </Button>
      )}
    </div>
  )
}
