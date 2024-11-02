import { io, Socket } from 'socket.io-client'

import { PORT } from './consts'

export const socketIoClient: Socket = io(`http://localhost:${PORT}`, {
  autoConnect: false,
  transports: ['websocket', 'polling'],
})
