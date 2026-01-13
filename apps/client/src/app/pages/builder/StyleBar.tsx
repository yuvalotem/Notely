import { ChangeEventHandler, CSSProperties } from 'react'

import { Card, ColorPicker, Input } from '../../components'
import { useBuilderContext } from './BuilderContext'

export function StyleBar() {
  const { style, setStyle, text, setText } = useBuilderContext()

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

  const title = 'Design & Content'

  return (
    <Card>
      <Card.Header className="flex items-center justify-between">
        <span>{title}</span>
      </Card.Header>
      <Card.Body className="p-6">
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-ios-dark/60 ml-1">
                Background Color
              </span>
              <ColorPicker
                color={backgroundColor}
                label="Select Background"
                onChange={setStyleAttribute('backgroundColor')}
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-ios-dark/60 ml-1">
                Text Color
              </span>
              <ColorPicker
                color={color}
                label="Select Color"
                onChange={setStyleAttribute('color')}
              />
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-ios-dark/60 ml-1">
                Width
              </span>
              <Input
                id="width-input"
                onChange={generateInputEventHandler(setStyleAttribute('width'))}
                value={width}
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-ios-dark/60 ml-1">
                Height
              </span>
              <Input
                id="height-input"
                onChange={generateInputEventHandler(
                  setStyleAttribute('height')
                )}
                value={height}
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-ios-dark/60 ml-1">
                Border Radius
              </span>
              <Input
                id="border-radius-input"
                onChange={generateInputEventHandler(
                  setStyleAttribute('borderRadius')
                )}
                value={borderRadius}
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-ios-dark/60 ml-1">
                Border Width
              </span>
              <Input
                id="border-width-input"
                onChange={generateInputEventHandler(
                  setStyleAttribute('borderWidth')
                )}
                value={borderWidth}
              />
            </label>
          </div>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-ios-dark/60 ml-1">
              Padding
            </span>
            <Input
              id="padding-input"
              onChange={generateInputEventHandler(setStyleAttribute('padding'))}
              value={padding}
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-ios-dark/60 ml-1">
              Notification Content
            </span>
            <Input
              className="w-full"
              id="content-input"
              onChange={generateInputEventHandler(setText)}
              placeholder="What's on your mind?"
              value={text}
              variant="multiline"
            />
          </label>
        </div>
      </Card.Body>
    </Card>
  )
}
