import { Dialog } from '@mui/material'

import { Button } from '../../components'
import { useApplicationActions } from '../../hooks'

type DeleteApplicationDialogProps = {
  id: string
  name: string
  isOpen: boolean
  onClose: () => void
}

export function DeleteApplicationDialog({
  id,
  name,
  isOpen,
  onClose,
}: DeleteApplicationDialogProps) {
  const { deleteApplication } = useApplicationActions({ id, name })

  return (
    <Dialog onClose={onClose} open={isOpen}>
      <div className="flex flex-col gap-6 py-6 px-8 whitespace-nowrap">
        <div>
          Are you sure you want to delete Application{' '}
          <b className="inline-block">{name}</b>?
        </div>
        <div className="flex flex-row gap-2 self-end">
          <Button onClick={onClose} variant="secondary">
            Cancel
          </Button>
          <Button onClick={() => deleteApplication()} variant="danger">
            Delete
          </Button>
        </div>
      </div>
    </Dialog>
  )
}
