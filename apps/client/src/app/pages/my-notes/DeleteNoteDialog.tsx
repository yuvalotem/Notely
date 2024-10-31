import { Dialog } from '@mui/material'

import { Button } from '../../components'
import { useNoteActions } from '../../hooks'
import { NoteProps } from './types'

type DeleteNoteDialogProps = Pick<NoteProps, 'id' | 'name'> & {
  isOpen: boolean
  onClose: () => void
}

export function DeleteNoteDialog({
  id,
  name,
  isOpen,
  onClose,
}: DeleteNoteDialogProps) {
  const { deleteNote } = useNoteActions({ id, name })

  return (
    <Dialog onClose={onClose} open={isOpen}>
      <div className="flex flex-col gap-6 py-6 px-8 whitespace-nowrap">
        <div>
          Are you sure you want to delete Note{' '}
          <b className="inline-block">{name}</b>?
        </div>
        <div className="flex flex-row gap-2 self-end">
          <Button onClick={onClose} variant="secondary">
            Cancel
          </Button>
          <Button onClick={() => deleteNote()} variant="danger">
            Delete
          </Button>
        </div>
      </div>
    </Dialog>
  )
}
