import { useParams } from 'react-router-dom'

import { QueryKeys, useQueryData } from '../../api'
import { NotificationProps } from '../notifications'
import { BuilderContextProvider } from './BuilderContext'
import { BuilderPageContent } from './BuilderPageContent'

export default function BuilderPage() {
  const { id } = useParams()

  const {
    isFetching,
    isLoading,
    data: notification,
  } = useQueryData<NotificationProps>({
    url: `notifications/${id}`,
    queryKey: [QueryKeys.Notification, ...(id ? [id] : [])],
    enabled: !!id,
  })

  return (
    <BuilderContextProvider
      notificationAppId={notification?.appId}
      notificationName={notification?.name}
    >
      <BuilderPageContent
        loading={isFetching || isLoading}
        notification={notification}
      />
    </BuilderContextProvider>
  )
}
