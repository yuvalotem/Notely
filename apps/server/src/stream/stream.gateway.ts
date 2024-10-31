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
export class NoteGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(NoteGateway.name)

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
    this.logger.log(`Cliend id:${client.id} disconnected`)
  }

  @SubscribeMessage('room')
  joinRoom(socket: Socket, roomId: string) {
    this.logger.log(`New join to room ID: ${roomId}`)
    socket.join(roomId)
  }

  @SubscribeMessage('note:publish')
  handleMessage(
    client: { id: string },
    data: { content: string; roomId: string }
  ) {
    this.logger.log(`Message received from client ID: ${client.id}`)
    const { content, roomId } = data

    this.io.to(roomId).emit('note:stream', content)

    return {
      event: 'note:stream',
      data,
    }
  }
}
