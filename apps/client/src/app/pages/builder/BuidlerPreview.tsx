import { useEffect, useRef, type FC } from 'react'
import { useBuilderContext } from './BuilderContext'

export const BuidlerPreview: FC<{}> = () => {
  const {
    backgroundColor,
    borderRadius,
    borderWidth,
    padding,
    width,
    height,
    color,
    text,
    setSourceCode,
  } = useBuilderContext()
  const embeddedElementRef = useRef<HTMLDivElement>(null)
  const sourceCode = embeddedElementRef.current?.outerHTML

  useEffect(() => {
    setSourceCode(sourceCode)
  }, [sourceCode])

  return (
    <div className="w-1/3 h-full mt-2">
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
