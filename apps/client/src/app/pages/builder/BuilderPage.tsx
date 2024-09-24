import { BuilderPageContent } from './BuilderPageContent'
import { BuilderContextProvider } from './BuilderContext'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { NoteProps } from '../my-notes/Note'

export const BuilderPage = () => {
  const { id } = useParams()
  const [note, setNote] = useState<NoteProps>()

  useEffect(() => {
    async function loadNotes() {
      if (!id) {
        return
      }
      const res = await fetch(`http://localhost:8000/api/${id}`, {
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:8000',
          'Referrer-Policy': 'no-referrer',
        },
      })
      const newNote = await res.json()
      setNote(newNote)
    }
    loadNotes()
  }, [id])

  return (
    <BuilderContextProvider>
      <BuilderPageContent note={note} />
    </BuilderContextProvider>
  )
}
