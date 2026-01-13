import { Skeleton } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { QueryKeys, useQueryData } from '../../api'
import { Button, Card } from '../../components'
import { PageBody, PageContainer, PageHeader } from '../../layout'
import { appRoutes } from '../../routes'
import { Notification } from './Notification'
import { NotificationsPageActions } from './NotificationsPageActions'
import { NotificationProps } from './types'

function NotificationSkeleton() {
  return (
    <Card className="w-fit mt-2 p-2 h-48 flex flex-col">
      <Card.Header className="flex flex-row justify-between mb-4 items-center min-w-40">
        <Skeleton className="w-20 " />
        <Skeleton className="w-6" />
      </Card.Header>
      <Card.Body className="h-full">
        <Skeleton className="w-3/5" sx={{ height: '100%' }} />
      </Card.Body>
    </Card>
  )
}

function NotificationsPageSkeletons() {
  return (
    <>
      {new Array(3).fill('').map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <NotificationSkeleton key={index} />
      ))}
    </>
  )
}

function EmptyNotificationsState() {
  const navigate = useNavigate()

  return (
    <div className="col-span-full flex flex-col items-center justify-center py-20 w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        No notifications yet
      </h2>
      <p className="text-gray-500 mb-8 text-center max-w-md">
        Create your first notification to engage your users with beautiful,
        customizable messages.
      </p>
      <Button onClick={() => navigate(appRoutes.createNotification.path)}>
        🚀 Create your first notification
      </Button>
    </div>
  )
}

type NotificationsResponse = {
  notifications: NotificationProps[]
  totalCount: number
}

export default function NotificationsPage() {
  const { isFetching, isLoading, data } = useQueryData<NotificationsResponse>({
    url: 'notifications',
    queryKey: [QueryKeys.Notifications],
  })

  const hasNotifications = data?.notifications && data.notifications.length > 0

  const renderContent = () => {
    if (isFetching || isLoading) {
      return <NotificationsPageSkeletons />
    }

    if (hasNotifications) {
      return data?.notifications?.map((notification) => (
        <Notification key={notification.id} {...notification} />
      ))
    }

    return <EmptyNotificationsState />
  }

  return (
    <PageContainer>
      <PageHeader
        actions={hasNotifications ? <NotificationsPageActions /> : null}
        title={appRoutes.notifications.title}
      />
      <PageBody className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {renderContent()}
      </PageBody>
    </PageContainer>
  )
}
