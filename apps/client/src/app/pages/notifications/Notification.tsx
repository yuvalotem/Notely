import { Card } from '../../components'
import NotificationMenu from './NotificationMenu'
import { NotificationProps } from './types'

export function Notification(props: NotificationProps) {
  const { component, name } = props
  const { text, style } = component

  return (
    <Card className="w-fit mt-2 border-[1px] p-2 max-h-80 overflow-scroll">
      <Card.Header className="flex flex-row justify-between mb-4 items-center min-w-40">
        {name}
        <NotificationMenu {...props} />
      </Card.Header>
      <Card.Body>
        <div style={style}>{text}</div>
      </Card.Body>
    </Card>
  )
}
