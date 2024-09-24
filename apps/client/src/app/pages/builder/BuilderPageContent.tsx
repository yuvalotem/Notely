import { useEffect } from 'react'
import { Button } from '../../components'
import { PageHeader } from '../../layout'
import { NoteProps } from '../my-notes/Note'
import { BuidlerPreview } from './BuidlerPreview'
import { useBuilderContext } from './BuilderContext'
import { StyleBar } from './StyleBar'
import parseStringfyHtmlToReactElement from 'html-react-parser'

export const BuilderPageContent = ({ note }: { note?: NoteProps }) => {
  const { sourceCode, setSourceCode, setText, setStyle } = useBuilderContext()

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
      fetch(`http://localhost:8000/api/${note.id}`, {
        method: 'PUT',
        body: JSON.stringify({ component: sourceCode }),
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:8000',
          'Referrer-Policy': 'no-referrer',
        },
      })
    } else {
      fetch(`http://localhost:8000/api`, {
        method: 'POST',
        body: JSON.stringify({ component: sourceCode }),
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:8000',
          'Referrer-Policy': 'no-referrer',
        },
      })
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
        <StyleBar />
        <BuidlerPreview />
      </div>
    </div>
  )
}
