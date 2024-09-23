import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react'

type BuilderPageContext = {
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

export const useBuilderPageContext = () => {
  return useContext(BuilderPageContext)
}

const BuilderPageContext = createContext<BuilderPageContext>({
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

export const BuilderPageContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [text, setText] = useState('This is my new note!')
  const [width, setWidth] = useState<string>('300px')
  const [height, setHeight] = useState<string>('50px')
  const [backgroundColor, setBackgroundColor] = useState<string>()
  const [borderRadius, setBorderRadius] = useState<string>('0px')
  const [borderWidth, setBorderWidth] = useState<string>('2px')
  const [padding, setPadding] = useState<string>('4px')
  const [color, setColor] = useState<string>()

  return (
    <BuilderPageContext.Provider
      value={useMemo(
        () => ({
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
          text,
          setText,
          backgroundColor,
          setBackgroundColor,
          width,
          setWidth,
          height,
          setHeight,
          ,
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
    </BuilderPageContext.Provider>
  )
}
