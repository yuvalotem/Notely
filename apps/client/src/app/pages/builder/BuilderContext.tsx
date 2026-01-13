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
  notificationAppId,
  notificationName,
}: PropsWithChildren<{
  notificationAppId?: string
  notificationName?: string
}>) {
  const [style, setStyle] = useState<CSSProperties | undefined>(DEFAULT_STYLE)
  const [text, setText] = useState('This is my new notification!')
  const [name, setName] = useState(notificationName)
  const [appId, setAppId] = useState<string | undefined>(notificationAppId)

  useEffect(() => {
    setName(notificationName)
  }, [notificationName])

  useEffect(() => {
    setAppId(notificationAppId)
  }, [notificationAppId])

  return (
    <BuilderContext.Provider
      value={useMemo(
        () => ({
          text,
          setText,
          appId,
          setAppId,
          style,
          setStyle,
          name,
          setName,
        }),
        [text, setText, appId, setAppId, style, setStyle, name, setName]
      )}
    >
      {children}
    </BuilderContext.Provider>
  )
}
