import { Logger } from '@nestjs/common'
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'

@WebSocketGateway()
export class NotificationGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(NotificationGateway.name)

  @WebSocketServer() io: Server

  afterInit() {
    this.logger.log('Initialized')
  }

  handleConnection(client: { id: string }) {
    this.logger.log(
      `Connection established with client ID: ${client.id} connected`
    )
  }

  handleDisconnect(client: { id: string }) {
    this.logger.log(`Client id:${client.id} disconnected`)
  }

  @SubscribeMessage('room')
  joinRoom(socket: Socket, roomId: string) {
    this.logger.log(`New join to room ID: ${roomId}`)
    socket.join(roomId)
  }

  @SubscribeMessage('notification:publish')
  handleMessage(
    client: { id: string },
    data: {
      content: { text: string; style: Record<string, unknown> }
      roomId: string
    }
  ) {
    this.logger.log(`Message received from client ID: ${client.id}`)
    const { content, roomId } = data

    this.io.to(roomId).emit('notification:stream', content)

    return {
      event: 'notification:stream',
      data,
    }
  }
}
