import { Dialog } from '@mui/material'
import { useState } from 'react'

import { QueryKeys, usePostMutation } from '../../api'
import { Button, Input } from '../../components'

type CreateApplicationDialogProps = {
  isOpen: boolean
  onClose: () => void
}
export function CreateApplicationDialog({
  isOpen,
  onClose,
}: CreateApplicationDialogProps) {
  const [appName, setAppName] = useState<string>()

  const { mutate: createApplication } = usePostMutation<
    void,
    unknown,
    { body: { name?: string } }
  >({
    url: `applications`,
    queryKey: [QueryKeys.Applications],
  })

  const onSubmit = () => {
    createApplication({ body: { name: appName } })
    onClose()
  }

  return (
    <Dialog onClose={onClose} open={isOpen}>
      <div className="flex flex-col gap-6 py-4 px-6">
        New Application
        <div className="flex flex-row gap-2">
          <Input
            onValueChange={setAppName}
            placeholder="Application name"
            value={appName}
          />
          <Button disabled={!appName} onClick={onSubmit}>
            Create
          </Button>
        </div>
      </div>
    </Dialog>
  )
}
