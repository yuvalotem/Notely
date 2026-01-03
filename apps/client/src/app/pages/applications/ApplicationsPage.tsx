import { useState } from 'react'

import { Button } from '../../components'
import { PageHeader } from '../../layout'
import { PageBody } from '../../layout/PageBody'
import { appRoutes } from '../../routes'
import { ApplicationsList } from './ApplicationsList'
import { CreateApplicationDialog } from './CreateApplicationDialog'

export default function ApplicationsPage() {
  const [isCreateAppDialogVisible, setCreateAppDialogVisiblity] =
    useState(false)

  return (
    <div className="w-full h-full">
      <PageHeader
        actions={
          <Button onClick={() => setCreateAppDialogVisiblity(true)}>Add</Button>
        }
        title={appRoutes.applications.title}
      />
      <PageBody>
        <ApplicationsList />
      </PageBody>
      <CreateApplicationDialog
        isOpen={isCreateAppDialogVisible}
        onClose={() => setCreateAppDialogVisiblity(false)}
      />
    </div>
  )
}
