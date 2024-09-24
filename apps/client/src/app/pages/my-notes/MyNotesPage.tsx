import { useEffect, useState } from 'react'
import { PageHeader } from '../../layout'
import { PageBody } from '../../layout/PageBody'
import { appRoutes } from '../../routes'
import { MyNotesPageActions } from './MyNotesPageActions'
import { Note, NoteProps } from './Note'

export const MyNotesPage = () => {
  const [notes, setNotes] = useState<NoteProps[]>([])

  useEffect(() => {
    async function loadNotes() {
      const res = await fetch(`http://localhost:8000/api/all`, {
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:8000',
          'Referrer-Policy': 'no-referrer',
        },
      })
      const newNotes = await res.json()
      setNotes(newNotes)
    }
    loadNotes()
  }, [])
  return (
    <div className="w-full h-full">
      <PageHeader
        title={appRoutes.home.title}
        actions={<MyNotesPageActions />}
      />
      <PageBody className="flex flex-row h-fit gap-2">
        {notes.map((note) => (
          <Note key={note.id} {...note} />
        ))}
      </PageBody>
    </div>
  )
}
