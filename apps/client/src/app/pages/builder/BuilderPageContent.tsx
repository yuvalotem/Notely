import parseStringfyHtmlToReactElement from 'html-react-parser'
import { useEffect } from 'react'
import { Button } from '../../components'
import { useNoteActions } from '../../hooks'
import { PageHeader } from '../../layout'
import { NoteProps } from '../my-notes'
import { BuidlerPreview } from './BuidlerPreview'
import { BuilderSettings } from './builder-settings'
import { useBuilderContext } from './BuilderContext'
import { StyleBar } from './StyleBar'
import { CircularProgress, Skeleton } from '@mui/material'

export const BuilderPageContent = ({
  note,
  loading,
}: {
  note?: NoteProps
  loading: boolean
}) => {
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
    const elm = parseStringfyHtmlToReactElement(note.component)
    if (typeof elm == 'object' && 'props' in elm) {
      elm.props.children && setText(elm.props.children)
      elm.props.style && setStyle(elm.props.style)
    }
  }, [note])

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
        title={'Create your element'}
        actions={
          <Button disabled={!sourceCode || loading} onClick={onCreate}>
            Save
          </Button>
        }
      />
      {loading ? (
        <BuilderPageContentSkeleton />
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

const BuilderPageContentSkeleton = () => {
  return (
    <div className="flex flex-row h-full justify-center items-center">
      <CircularProgress />
    </div>
  )
}
