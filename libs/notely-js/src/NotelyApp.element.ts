import { io, Socket } from 'socket.io-client'

export class NotelyAppElement extends HTMLElement {
  public static observedAttributes = []

  ioClient: Socket

  appId: string

  constructor(appId: string) {
    super()
    this.appId = appId
    this.ioClient = io('http://localhost:8000', {
      autoConnect: false,
      transports: ['websocket', 'polling'],
    })
  }

  subscribeToNotificationEvent() {
    this.ioClient.connect()
    this.ioClient.emit('room', this.appId)
    this.ioClient.on('connect', () => {})
    this.ioClient.on(
      'notification:stream',
      (data: { text: string; style: Record<string, string | number> }) => {
        const { text, style } = data

        this.innerHTML = `<div>${text}</div>`

        const div = this.querySelector('div')

        if (div && style) {
          Object.assign(div.style, style)
        }
      }
    )
  }

  connectedCallback() {
    this.subscribeToNotificationEvent()
  }
}
