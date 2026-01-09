import { CircularProgress, Tooltip } from '@mui/material'
import parseStringfyHtmlToReactElement from 'html-react-parser'
import { CSSProperties, useEffect } from 'react'

import { Button } from '../../components'
import { useNoteActions } from '../../hooks'
import { PageBody, PageContainer, PageHeader } from '../../layout'
import { NoteProps } from '../my-notes'
import { BuidlerPreview } from './BuidlerPreview'
import { BuilderSettings } from './builder-settings'
import { useBuilderContext } from './BuilderContext'
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

  return { isDisabled, message: isDisabled ? 'Nothing to update' : '' }
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
              Save
            </Button>
          </Tooltip>
        }
        title="Create Note"
      />
      <PageBody className="flex flex-row h-full">
        {loading ? (
          <CircularProgress className="mx-auto mt-12" />
        ) : (
          <>
            <div className="flex flex-col w-1/2 mt-4 gap-4 h-full">
              <BuidlerPreview />
              <BuilderSettings />
            </div>
            <StyleBar />
          </>
        )}
      </PageBody>
    </PageContainer>
  )
}
