import {
  RefObject,
  forwardRef,
  useEffect,
  useRef,
  useState,
  type FC,
} from 'react'
import { useBuilderPageContext } from './BuilderPageContext'
import { Button } from '../../components'

export const BuidlerPreview: FC<{ setSourceCode: (val?: string) => void }> = ({
  setSourceCode,
}) => {
  const {
    backgroundColor,
    borderRadius,
    borderWidth,
    padding,
    width,
    height,
    color,
    text,
  } = useBuilderPageContext()
  const [showSourceCode, setShowSourceCode] = useState(false)
  const embeddedElementRef = useRef<HTMLDivElement>(null)
  const sourceCode = embeddedElementRef.current?.outerHTML
  const isSourceCodeVisible = showSourceCode && sourceCode

  useEffect(() => {
    setSourceCode(sourceCode)
  }, [sourceCode])
  return (
    <div className="w-1/3 h-full">
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
      <Button
        variant="primary"
        onClick={() => setShowSourceCode(!showSourceCode)}
        className="mt-2 w-40"
      >
        {showSourceCode ? 'Hide' : 'Show'} source
      </Button>
      <div>{isSourceCodeVisible ? sourceCode : ''}</div>
    </div>
  )
}
