import { Dialog } from '@mui/material'

import { Button } from '../../components'
import { useNotificationActions } from '../../hooks'
import { NotificationProps } from './types'

type DeleteNotificationDialogProps = Pick<NotificationProps, 'id' | 'name'> & {
  isOpen: boolean
  onClose: () => void
}

export function DeleteNotificationDialog({
  id,
  name,
  isOpen,
  onClose,
}: DeleteNotificationDialogProps) {
  const { deleteNotification } = useNotificationActions({ id, name })

  return (
    <Dialog onClose={onClose} open={isOpen}>
      <div className="flex flex-col gap-6 py-6 px-8 whitespace-nowrap">
        <div>
          Are you sure you want to delete Notification{' '}
          <b className="inline-block">{name}</b>?
        </div>
        <div className="flex flex-row gap-2 self-end">
          <Button onClick={onClose} variant="secondary">
            Cancel
          </Button>
          <Button onClick={() => deleteNotification()} variant="danger">
            Delete
          </Button>
        </div>
      </div>
    </Dialog>
  )
}
