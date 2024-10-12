import { CSSProperties, ChangeEventHandler, useState } from 'react'
import { Button, CodeEditor, ColorPicker, Input } from '../../components'
import { useBuilderContext } from './BuilderContext'

export const StyleBar = () => {
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

  const title = isSourceCodeVisible ? 'Source Code' : 'Style'

  return (
    <div className={`mr-4 p-2 border-2 w-1/2 h-full`}>
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
              onChange={setStyleAttribute('backgroundColor')}
            />
            <ColorPicker
              label="Color"
              color={color}
              onChange={setStyleAttribute('color')}
            />
            <span>Width </span>
            <Input
              value={width}
              onChange={generateInputEventHandler(setStyleAttribute('width'))}
            />
            <span>Height </span>
            <Input
              value={height}
              onChange={generateInputEventHandler(setStyleAttribute('height'))}
            />
            <span>Border Radius</span>
            <Input
              value={borderRadius}
              onChange={generateInputEventHandler(
                setStyleAttribute('borderRadius')
              )}
            />
            <span>Border Width</span>
            <Input
              value={borderWidth}
              onChange={generateInputEventHandler(
                setStyleAttribute('borderWidth')
              )}
            />
            <span>Padding</span>
            <Input
              value={padding}
              onChange={generateInputEventHandler(setStyleAttribute('padding'))}
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
