import { useState } from 'react'

import { Button } from '../../components'
import { PageHeader } from '../../layout'
import { appRoutes } from '../../routes'
import { ApplicationsList } from './ApplicationsList'
import { CreateApplicationDialog } from './CreateApplicationDialog'

export default function SettingsPage() {
  const [isCreateAppDialogVisible, setCreateAppDialogVisiblity] =
    useState(false)

  return (
    <div className="w-full h-full">
      <PageHeader
        actions={
          <Button onClick={() => setCreateAppDialogVisiblity(true)}>
            Add Application
          </Button>
        }
        title={appRoutes.settings.title}
      />
      <ApplicationsList />
      <CreateApplicationDialog
        isOpen={isCreateAppDialogVisible}
        onClose={() => setCreateAppDialogVisiblity(false)}
      />
    </div>
  )
}
