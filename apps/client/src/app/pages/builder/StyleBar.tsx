import { ChangeEventHandler, CSSProperties, useState } from 'react'

import { Button, Card, CodeEditor, ColorPicker, Input } from '../../components'
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

  const generateInputEventHandler =
    (callback: (val: string) => void): ChangeEventHandler<HTMLInputElement> =>
    (e) =>
      callback(e.target.value)

  const [showSourceCode, setShowSourceCode] = useState(false)
  const isSourceCodeVisible = showSourceCode && sourceCode
  const [editorValue, setEditorValue] = useState<string>()

  const handleEditorChange = (val?: string) => {
    setSourceCode(val)
    setEditorValue(val)
  }

  const title = isSourceCodeVisible ? 'Source Code' : 'Design & Content'

  return (
    <Card>
      <Card.Header className="flex items-center justify-between">
        <span>{title}</span>
        {sourceCode && (
          <Button
            className="h-8 px-3 text-xs"
            onClick={() => setShowSourceCode(!showSourceCode)}
            variant="primary"
          >
            {showSourceCode ? 'Back to Editor' : 'View Source'}
          </Button>
        )}
      </Card.Header>
      <Card.Body className="p-6">
        {isSourceCodeVisible ? (
          <CodeEditor
            height="600px"
            onChange={handleEditorChange}
            value={editorValue ?? sourceCode}
          />
        ) : (
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label
                  className="text-sm font-medium text-ios-dark/60 ml-1"
                  htmlFor="bg-color-picker"
                >
                  Background Color
                </label>
                <ColorPicker
                  color={backgroundColor}
                  id="bg-color-picker"
                  label="Select Background"
                  onChange={setStyleAttribute('backgroundColor')}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  className="text-sm font-medium text-ios-dark/60 ml-1"
                  htmlFor="text-color-picker"
                >
                  Text Color
                </label>
                <ColorPicker
                  color={color}
                  id="text-color-picker"
                  label="Select Color"
                  onChange={setStyleAttribute('color')}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label
                  className="text-sm font-medium text-ios-dark/60 ml-1"
                  htmlFor="width-input"
                >
                  Width
                </label>
                <Input
                  id="width-input"
                  onChange={generateInputEventHandler(
                    setStyleAttribute('width')
                  )}
                  value={width}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  className="text-sm font-medium text-ios-dark/60 ml-1"
                  htmlFor="height-input"
                >
                  Height
                </label>
                <Input
                  id="height-input"
                  onChange={generateInputEventHandler(
                    setStyleAttribute('height')
                  )}
                  value={height}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  className="text-sm font-medium text-ios-dark/60 ml-1"
                  htmlFor="border-radius-input"
                >
                  Border Radius
                </label>
                <Input
                  id="border-radius-input"
                  onChange={generateInputEventHandler(
                    setStyleAttribute('borderRadius')
                  )}
                  value={borderRadius}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  className="text-sm font-medium text-ios-dark/60 ml-1"
                  htmlFor="border-width-input"
                >
                  Border Width
                </label>
                <Input
                  id="border-width-input"
                  onChange={generateInputEventHandler(
                    setStyleAttribute('borderWidth')
                  )}
                  value={borderWidth}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label
                className="text-sm font-medium text-ios-dark/60 ml-1"
                htmlFor="padding-input"
              >
                Padding
              </label>
              <Input
                id="padding-input"
                onChange={generateInputEventHandler(
                  setStyleAttribute('padding')
                )}
                value={padding}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                className="text-sm font-medium text-ios-dark/60 ml-1"
                htmlFor="content-input"
              >
                Note Content
              </label>
              <Input
                className="w-full"
                id="content-input"
                onChange={generateInputEventHandler(setText)}
                placeholder="What's on your mind?"
                value={text}
                variant="multiline"
              />
            </div>
          </div>
        )}
      </Card.Body>
    </Card>
  )
}
