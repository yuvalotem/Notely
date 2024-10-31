import { CircularProgress } from '@mui/material'
import parseStringfyHtmlToReactElement from 'html-react-parser'
import { CSSProperties, useEffect } from 'react'

import { Button } from '../../components'
import { useNoteActions } from '../../hooks'
import { PageHeader } from '../../layout'
import { NoteProps } from '../my-notes'
import { BuidlerPreview } from './BuidlerPreview'
import { BuilderSettings } from './builder-settings'
import { useBuilderContext } from './BuilderContext'
import { StyleBar } from './StyleBar'

type ReactElementProps = { children: string; style: CSSProperties }

type ElementType = (React.JSX.Element | React.JSX.Element[]) & {
  props: ReactElementProps
}

const elementTypeGuard = (
  element: string | React.JSX.Element | React.JSX.Element[]
): element is ElementType => typeof element === 'object' && 'props' in element

export function BuilderPageContent({
  note,
  loading,
}: {
  note?: NoteProps
  loading: boolean
}) {
  const { sourceCode, appId, name, setSourceCode, setText, setStyle } =
    useBuilderContext()

  const { createNote, updateNote } = useNoteActions({
    id: note?.id,
    name,
  })

  useEffect(() => {
    if (!note) {
      return
    }

    setSourceCode(note.component)
    const parsedElement = parseStringfyHtmlToReactElement(note.component)

    if (elementTypeGuard(parsedElement)) {
      const { children, style } = parsedElement.props as ReactElementProps

      setText(children)
      setStyle(style)
    }
  }, [note, setSourceCode, setStyle, setText])

  const onCreate = () => {
    if (!sourceCode) {
      return
    }

    const payload = { body: { component: sourceCode, appId, name } }

    if (note) {
      updateNote(payload)
    } else {
      createNote(payload)
    }
  }

  return (
    <div className="w-full h-full flex flex-col">
      <PageHeader
        actions={
          <Button disabled={!sourceCode || loading} onClick={onCreate}>
            Save
          </Button>
        }
        title="Create your element"
      />
      {loading ? (
        <div className="flex flex-row h-full justify-center items-center">
          <CircularProgress />
        </div>
      ) : (
        <div className="flex flex-row h-full">
          <div className="flex flex-col w-1/2 mt-4 gap-4 h-full">
            <BuidlerPreview />
            <BuilderSettings />
          </div>
          <StyleBar />
        </div>
      )}
    </div>
  )
}
