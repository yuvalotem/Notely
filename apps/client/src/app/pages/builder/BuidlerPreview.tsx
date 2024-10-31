import { useEffect, useRef } from 'react'

import { useBuilderContext } from './BuilderContext'

/**
 * This component renders a preview of what the user is building.
 * It displays the text with the current style applied to it.
 * It also keeps track of the outerHTML of the div and updates the
 * source code in the context with it.
 */
export function BuidlerPreview() {
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
  }, [sourceCode, setSourceCode])

  return (
    <div className="flex flex-col gap-4 items-center h-1/2">
      <h1>Custom Component</h1>
      <div
        ref={embeddedElementRef}
        style={{
          backgroundColor,
          borderRadius,
          borderWidth,
          padding,
          width,
          height,
          color,
        }}
      >
        {text}
      </div>
    </div>
  )
}
