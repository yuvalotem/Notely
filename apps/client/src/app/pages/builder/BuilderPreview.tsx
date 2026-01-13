import { Card } from '../../components'
import { useBuilderContext } from './BuilderContext'

/**
 * This component renders a preview of what the user is building.
 * It displays the text with the current style applied to it.
 */
export function BuilderPreview() {
  const { text, style } = useBuilderContext()

  const {
    backgroundColor,
    borderRadius,
    borderWidth,
    padding,
    width,
    height,
    color,
  } = style ?? {}

  return (
    <Card className="h-full flex flex-col">
      <Card.Header>Live Preview</Card.Header>
      <Card.Body className="flex-1 flex items-center justify-center p-12 relative bg-gray-50/30">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
          }}
        />
        <div
          className="shadow-2xl transition-all duration-300 ease-in-out hover:scale-[1.02] relative z-10"
          style={{
            backgroundColor,
            borderRadius,
            borderWidth,
            padding,
            width,
            height,
            color,
            borderStyle: 'solid',
            borderColor: 'currentColor',
            overflow: 'hidden',
          }}
        >
          {text || <div>Your content here...</div>}
        </div>
      </Card.Body>
    </Card>
  )
}
