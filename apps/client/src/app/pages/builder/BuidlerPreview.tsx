import { useEffect, useRef, type FC } from 'react'
import { useBuilderContext } from './BuilderContext'

/**
 * This component renders a preview of what the user is building.
 * It displays the text with the current style applied to it.
 * It also keeps track of the outerHTML of the div and updates the
 * source code in the context with it.
 */
export const BuidlerPreview: FC<{}> = () => {
  const { text, style, setSourceCode } = useBuilderContext()
  const {
    backgroundColor,
    borderRadius,
    borderWidth,
    padding,
    width,
    height,
    color,
  } = style ?? {}
  const embeddedElementRef = useRef<HTMLDivElement>(null)
  const sourceCode = embeddedElementRef.current?.outerHTML

  useEffect(() => {
    setSourceCode(sourceCode)
  }, [sourceCode])

  return (
    <div className="flex items-start justify-center w-1/2 mt-8">
      <div
        style={{
          backgroundColor,
          borderRadius,
          borderWidth,
          padding,
          width,
          height,
          color,
        }}
        ref={embeddedElementRef}
      >
        {text}
      </div>
    </div>
  )
}
