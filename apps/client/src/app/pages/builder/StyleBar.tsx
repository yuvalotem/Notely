import { ChangeEventHandler, CSSProperties, useState } from 'react'

import { Button, CodeEditor, ColorPicker, Input } from '../../components'
import { useBuilderContext } from './BuilderContext'

export function StyleBar() {
  const { sourceCode, setSourceCode, style, setStyle, text, setText } =
    useBuilderContext()

  const {
    backgroundColor,
    color,
    width,
    height,
    borderRadius,
    borderWidth,
    padding,
  } = style ?? {}

  const setStyleAttribute = (key: keyof CSSProperties) => (val: string) =>
    setStyle((oldStyle) => ({ ...oldStyle, [key]: val }))

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

  const title = isSourceCodeVisible ? 'Source Code' : 'Creaete and Customize'

  return (
    <div className="mr-4 p-2 border-[1px] border-t-0 w-1/2 h-full">
      <h1 className="mb-2">{title}</h1>
      {isSourceCodeVisible ? (
        <CodeEditor
          height="80vh"
          onChange={hadnleEditorChange}
          value={editorValue ?? sourceCode}
        />
      ) : (
        <>
          <div className="grid grid-cols-2 gap-2">
            <ColorPicker
              color={backgroundColor}
              label="Background Color"
              onChange={setStyleAttribute('backgroundColor')}
            />
            <ColorPicker
              color={color}
              label="Color"
              onChange={setStyleAttribute('color')}
            />
            <span>Width </span>
            <Input
              onChange={generateInputEventHandler(setStyleAttribute('width'))}
              value={width}
            />
            <span>Height </span>
            <Input
              onChange={generateInputEventHandler(setStyleAttribute('height'))}
              value={height}
            />
            <span>Border Radius</span>
            <Input
              onChange={generateInputEventHandler(
                setStyleAttribute('borderRadius')
              )}
              value={borderRadius}
            />
            <span>Border Width</span>
            <Input
              onChange={generateInputEventHandler(
                setStyleAttribute('borderWidth')
              )}
              value={borderWidth}
            />
            <span>Padding</span>
            <Input
              onChange={generateInputEventHandler(setStyleAttribute('padding'))}
              value={padding}
            />
          </div>
          <Input
            className="w-full mt-2"
            onChange={generateInputEventHandler(setText)}
            value={text}
            variant="multiline"
          />
        </>
      )}
      {sourceCode && (
        <Button
          className="mt-2 w-40"
          onClick={() => setShowSourceCode(!showSourceCode)}
          variant="primary"
        >
          {showSourceCode ? 'Show Style' : 'Show Source'}
        </Button>
      )}
    </div>
  )
}
