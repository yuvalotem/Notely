import { useEffect } from 'react'
import { Button } from '../../components'
import { PageHeader } from '../../layout'
import { NoteProps } from '../my-notes/Note'
import { BuidlerPreview } from './BuidlerPreview'
import { useBuilderContext } from './BuilderContext'
import { StyleBar } from './StyleBar'
import parseStringfyHtmlToReactElement from 'html-react-parser'
import { QueryKeys, usePostMutation, usePutMutation } from '../../api'
import { useSnackbarProvider } from '../../ContextProviders'
import { useNavigate } from 'react-router-dom'

export const BuilderPageContent = ({ note }: { note?: NoteProps }) => {
  const { sourceCode, setSourceCode, setText, setStyle } = useBuilderContext()
  const navigate = useNavigate()
  const { showSnackbar } = useSnackbarProvider()
  const craeteNote = usePostMutation({
    url: `notes`,
    queryKey: [QueryKeys.Notes],
    onSuccess: () => {
      navigate('/')
    },
  })
  const updateNote = usePutMutation({
    url: `notes/${note?.id ?? ''}`,
    queryKey: [QueryKeys.Notes, QueryKeys.Note, ...(note?.id ? [note.id] : [])],
    onSuccess: () => {
      showSnackbar({ message: 'Note updated successfully' })
    },
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
    if (note) {
      updateNote.mutate({ body: { component: sourceCode } })
    } else {
      craeteNote.mutate({ body: { component: sourceCode } })
    }
  }

  return (
    <div className="w-full h-full">
      <PageHeader
        title={'Create your element'}
        actions={
          <Button disabled={!sourceCode} onClick={onCreate}>
            Save
          </Button>
        }
      />
      <div className="flex flex-row h-full">
        <BuidlerPreview />
        <StyleBar />
      </div>
    </div>
  )
}
