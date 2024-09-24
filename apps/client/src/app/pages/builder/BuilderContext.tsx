import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react'

type BuilderContextValues = {
  sourceCode?: string
  setSourceCode: (text?: string) => void
  text: string
  setText: (text: string) => void
  backgroundColor?: string
  setBackgroundColor: (backgroundColor: string) => void
  width: string
  setWidth: (width: string) => void
  height: string
  setHeight: (height: string) => void
  borderRadius: string
  setBorderRadius: (borderRadius: string) => void
  borderWidth: string
  setBorderWidth: (borderWidth: string) => void
  padding: string
  setPadding: (padding: string) => void
  color?: string
  setColor: (color: string) => void
}

export const useBuilderContext = () => {
  return useContext(BuilderContext)
}

const BuilderContext = createContext<BuilderContextValues>({
  sourceCode: '',
  setSourceCode: () => {},
  text: '',
  setText: () => {},
  backgroundColor: '',
  setBackgroundColor: () => {},
  width: '',
  setWidth: () => {},
  height: '',
  setHeight: () => {},
  borderRadius: '',
  setBorderRadius: () => {},
  borderWidth: '',
  setBorderWidth: () => {},
  padding: '',
  setPadding: () => {},
  color: '',
  setColor: () => {},
})

export const BuilderContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [sourceCode, setSourceCode] = useState<string>()
  const [text, setText] = useState('This is my new note!')
  const [width, setWidth] = useState<string>('300px')
  const [height, setHeight] = useState<string>('50px')
  const [backgroundColor, setBackgroundColor] = useState<string>()
  const [borderRadius, setBorderRadius] = useState<string>('0px')
  const [borderWidth, setBorderWidth] = useState<string>('2px')
  const [padding, setPadding] = useState<string>('4px')
  const [color, setColor] = useState<string>()

  return (
    <BuilderContext.Provider
      value={useMemo(
        () => ({
          sourceCode,
          setSourceCode,
          text,
          setText,
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
        }),
        [
          sourceCode,
          setSourceCode,
          text,
          setText,
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
        ]
      )}
    >
      {children}
    </BuilderContext.Provider>
  )
}
