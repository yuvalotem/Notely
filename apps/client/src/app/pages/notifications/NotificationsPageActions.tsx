import { useNavigate } from 'react-router-dom'

import { Button } from '../../components'
import { appRoutes } from '../../routes'

export function NotificationsPageActions() {
  const navigate = useNavigate()

  return (
    <div>
      <Button onClick={() => navigate(appRoutes.createNotification.path)}>
        Create new notification
      </Button>
    </div>
  )
}
