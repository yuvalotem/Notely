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

  subscribeToNoteEvent() {
    this.ioClient.connect()
    this.ioClient.emit('room', this.appId)
    this.ioClient.on('connect', () => {})
    this.ioClient.on('note:stream', (data: string) => {
      this.innerHTML = data
    })
  }

  connectedCallback() {
    this.subscribeToNoteEvent()
  }
}
