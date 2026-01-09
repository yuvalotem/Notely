import { CircularProgress, Tooltip } from '@mui/material'
import parseStringfyHtmlToReactElement from 'html-react-parser'
import { CSSProperties, useEffect } from 'react'

import { Button } from '../../components'
import { useNoteActions } from '../../hooks'
import { PageBody, PageContainer, PageHeader } from '../../layout'
import { NoteProps } from '../my-notes'
import { BuilderSettings } from './builder-settings'
import { useBuilderContext } from './BuilderContext'
import { BuilderPreview } from './BuilderPreview'
import { StyleBar } from './StyleBar'

const getSaveButtonDisabledState = ({
  sourceCode,
  name,
  appId,
  loading,
}: {
  sourceCode?: string
  name?: string
  appId?: string
  loading: boolean
}) => {
  const isDisabled = !sourceCode || !name || !appId || loading

  return { isDisabled, message: isDisabled ? 'Nothing to change' : '' }
}

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

  const { isDisabled: isSavedDisabled, message: saveDisabledMessage } =
    getSaveButtonDisabledState({
      sourceCode,
      name,
      appId,
      loading,
    })

  return (
    <PageContainer>
      <PageHeader
        actions={
          <Tooltip placement="top" title={saveDisabledMessage}>
            <Button disabled={isSavedDisabled} onClick={onCreate}>
              {note ? 'Edit' : 'Build'}
            </Button>
          </Tooltip>
        }
        title={note ? 'Edit Note' : 'Build Note'}
      />
      <PageBody>
        {loading ? (
          <div className="flex items-center justify-center h-[60vh]">
            <CircularProgress />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-12 lg:col-span-4 flex flex-col gap-6">
              <BuilderSettings />
              <StyleBar />
            </div>
            <div className="md:col-span-12 lg:col-span-8 flex flex-col sticky top-40">
              <BuilderPreview />
            </div>
          </div>
        )}
      </PageBody>
    </PageContainer>
  )
}
