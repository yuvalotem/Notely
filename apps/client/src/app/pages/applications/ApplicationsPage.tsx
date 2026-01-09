import { useState } from 'react'

import { Button } from '../../components'
import { PageBody, PageContainer, PageHeader } from '../../layout'
import { appRoutes } from '../../routes'
import { ApplicationsList } from './ApplicationsList'
import { CreateApplicationDialog } from './CreateApplicationDialog'

export default function ApplicationsPage() {
  const [isCreateAppDialogVisible, setCreateAppDialogVisiblity] =
    useState(false)

  return (
    <PageContainer>
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
    </PageContainer>
  )
}
