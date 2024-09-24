import {
  CSSProperties,
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
  style?: CSSProperties
  setStyle: React.Dispatch<React.SetStateAction<CSSProperties | undefined>>
}

export const useBuilderContext = () => {
  return useContext(BuilderContext)
}

const BuilderContext = createContext<BuilderContextValues>({
  sourceCode: '',
  setSourceCode: () => {},
  text: '',
  setText: () => {},
  style: undefined,
  setStyle: () => {},
})

export const BuilderContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [sourceCode, setSourceCode] = useState<string>()
  const [style, setStyle] = useState<CSSProperties>()
  const [text, setText] = useState('This is my new note!')

  return (
    <BuilderContext.Provider
      value={useMemo(
        () => ({
          sourceCode,
          setSourceCode,
          text,
          setText,
          style,
          setStyle,
        }),
        [sourceCode, setSourceCode, text, setText, style, setStyle]
      )}
    >
      {children}
    </BuilderContext.Provider>
  )
}
