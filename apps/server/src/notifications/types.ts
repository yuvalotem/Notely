export type NotificationBody = {
  component: { text: string; style: Record<string, unknown> }
  appId: string
  name: string
}
