import {
  createContext,
  CSSProperties,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

type BuilderContextValues = {
  sourceCode?: string
  setSourceCode: (text?: string) => void
  text: string
  setText: (text: string) => void
  name?: string
  setName: (name: string) => void
  appId?: string
  setAppId: (appId: string) => void
  style?: CSSProperties
  setStyle: React.Dispatch<React.SetStateAction<CSSProperties | undefined>>
}

const BuilderContext = createContext<BuilderContextValues>({
  sourceCode: '',
  setSourceCode: () => {},
  text: '',
  setText: () => {},
  name: '',
  setName: () => {},
  appId: '',
  setAppId: () => {},
  style: undefined,
  setStyle: () => {},
})

export const useBuilderContext = () => useContext(BuilderContext)

const DEFAULT_STYLE: CSSProperties = {
  backgroundColor: 'white',
  color: 'black',
  width: 'fit-content',
  height: 'fit-content',
  borderRadius: '0px',
  borderWidth: '1px',
  padding: '4px',
}

export function BuilderContextProvider({
  children,
  noteAppId,
  noteName,
}: PropsWithChildren<{ noteAppId?: string; noteName?: string }>) {
  const [sourceCode, setSourceCode] = useState<string>()
  const [style, setStyle] = useState<CSSProperties | undefined>(DEFAULT_STYLE)
  const [text, setText] = useState('This is my new note!')
  const [name, setName] = useState(noteName)
  const [appId, setAppId] = useState<string | undefined>(noteAppId)

  useEffect(() => {
    setName(noteName)
  }, [noteName])

  useEffect(() => {
    setAppId(noteAppId)
  }, [noteAppId])

  return (
    <BuilderContext.Provider
      value={useMemo(
        () => ({
          sourceCode,
          setSourceCode,
          text,
          setText,
          appId,
          setAppId,
          style,
          setStyle,
          name,
          setName,
        }),
        [
          sourceCode,
          setSourceCode,
          text,
          setText,
          appId,
          setAppId,
          style,
          setStyle,
          name,
          setName,
        ]
      )}
    >
      {children}
    </BuilderContext.Provider>
  )
}
