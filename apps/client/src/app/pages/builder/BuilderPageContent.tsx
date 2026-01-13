import { CircularProgress, Tooltip } from '@mui/material'
import { useEffect } from 'react'

import { Button } from '../../components'
import { useNotificationActions } from '../../hooks'
import { PageBody, PageContainer, PageHeader } from '../../layout'
import { NotificationProps } from '../notifications'
import { BuilderSettings } from './builder-settings'
import { useBuilderContext } from './BuilderContext'
import { BuilderPreview } from './BuilderPreview'
import { StyleBar } from './StyleBar'

const getSaveButtonDisabledState = ({
  text,
  name,
  appId,
  loading,
}: {
  text?: string
  name?: string
  appId?: string
  loading: boolean
}) => {
  const isDisabled = !text || !name || !appId || loading

  return { isDisabled, message: isDisabled ? 'Nothing to update' : '' }
}

export function BuilderPageContent({
  notification,
  loading,
}: {
  notification?: NotificationProps
  loading: boolean
}) {
  const { text, appId, name, setText, setStyle, style } = useBuilderContext()

  const { createNotification, updateNotification } = useNotificationActions({
    id: notification?.id,
    name,
  })

  useEffect(() => {
    if (!notification) {
      return
    }

    setText(notification.component.text)
    setStyle(notification.component.style)
  }, [notification, setStyle, setText])

  const onCreate = () => {
    if (!text) {
      return
    }

    const payload = {
      body: { component: { text, style: style ?? {} }, appId, name },
    }

    if (notification) {
      updateNotification(payload)
    } else {
      createNotification(payload)
    }
  }

  const { isDisabled: isSavedDisabled, message: saveDisabledMessage } =
    getSaveButtonDisabledState({
      text,
      name,
      appId,
      loading,
    })

  return (
    <PageContainer>
      <PageHeader
        actions={
          <Tooltip placement="top" title={saveDisabledMessage}>
            <Button disabled={isSavedDisabled} onClick={onCreate}>
              {notification ? 'Edit' : 'Build'}
            </Button>
          </Tooltip>
        }
        title={notification ? 'Edit Notification' : 'Build Notification'}
      />
      <PageBody>
        {loading ? (
          <div className="flex items-center justify-center h-[60vh]">
            <CircularProgress />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-12 lg:col-span-4 flex flex-col gap-6">
              <BuilderSettings />
              <StyleBar />
            </div>
            <div className="md:col-span-12 lg:col-span-8 flex flex-col sticky top-40">
              <BuilderPreview />
            </div>
          </div>
        )}
      </PageBody>
    </PageContainer>
  )
}
