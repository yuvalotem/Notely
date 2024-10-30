import { Dialog } from '@mui/material'
import { FC, useState } from 'react'
import { QueryKeys, usePostMutation } from '../../api'
import { Button, Input } from '../../components'

export const CreateApplicationDialog: FC<{
  isOpen: boolean
  onClose: () => void
}> = ({ isOpen, onClose }) => {
  const [appName, setAppName] = useState<string>()
  const { mutate: createApplication } = usePostMutation({
    url: `applications`,
    queryKey: [QueryKeys.Applications],
  })

  const onSubmit = () => {
    createApplication({ body: { name: appName } })
    onClose()
  }

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-6 py-4 px-6">
        New Application
        <div className="flex flex-row gap-2">
          <Input
            placeholder="Application name"
            value={appName}
            onValueChange={setAppName}
          />
          <Button disabled={!appName} onClick={onSubmit}>
            Create
          </Button>
        </div>
      </div>
    </Dialog>
  )
}
