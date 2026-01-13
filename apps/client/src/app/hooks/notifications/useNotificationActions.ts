import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  QueryKeys,
  useDeleteMutation,
  usePostMutation,
  usePutMutation,
} from '../../api'
import { useSnackbarProvider } from '../../ContextProviders'
import { appRoutes } from '../../routes'

const generateNotificationMessage = ({
  name = 'was',
  action,
}: {
  name?: string
  action: string
}) => `Notification ${name} ${action} successfully`

type NotificationPayload = {
  body: Partial<{
    component: { text: string; style: Record<string, unknown> }
    appId: string
    name: string
  }>
}
export const useNotificationActions = ({
  id,
  name,
}: {
  id?: string
  name?: string
}) => {
  const navigate = useNavigate()
  const { showSnackbar } = useSnackbarProvider()

  const { mutate: createNotification } = usePostMutation<
    void,
    unknown,
    NotificationPayload
  >({
    url: `notifications`,
    queryKey: [QueryKeys.Notifications],
    onSuccess: () => {
      navigate(appRoutes.notifications.path)
    },
  })

  const { mutate: updateNotification } = usePutMutation<
    void,
    unknown,
    NotificationPayload
  >({
    url: `notifications/${id ?? ''}`,
    queryKey: [
      QueryKeys.Notifications,
      QueryKeys.Notification,
      ...(id ? [id] : []),
    ],
    onSuccess: () => {
      showSnackbar({
        message: generateNotificationMessage({ name, action: 'updated' }),
      })
    },
  })

  const deleteNotification = useDeleteMutation({
    url: `notifications/${id}`,
    queryKey: [QueryKeys.Notifications],
    onSuccess: () => {
      showSnackbar({
        message: generateNotificationMessage({ name, action: 'deleted' }),
      })
    },
  }).mutate

  const pushNotification = usePostMutation({
    url: `notifications/push`,
    body: { id },
    queryKey: [QueryKeys.Notifications],
    onSuccess: () => {
      showSnackbar({
        message: generateNotificationMessage({ name, action: 'published' }),
      })
    },
  }).mutate

  return useMemo(
    () => ({
      createNotification,
      updateNotification,
      deleteNotification,
      pushNotification,
    }),
    [
      createNotification,
      updateNotification,
      deleteNotification,
      pushNotification,
    ]
  )
}
