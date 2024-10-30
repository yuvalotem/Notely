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

  handleConnection(client: any, ...args: any[]) {
    this.logger.log(
      `Connection established with client id: ${client.id} connected`
    )
  }

  handleDisconnect(client: any) {
    this.logger.log(`Cliend id:${client.id} disconnected`)
  }

  @SubscribeMessage('room')
  joinRoom(socket: Socket, roomId: string) {
    socket.join(roomId)
  }

  @SubscribeMessage('note:publish')
  handleMessage(client: any, data: { content: string; roomId: string }) {
    this.logger.log(`Message received from client id: ${client.id}`)
    const { content, roomId } = data
    this.io.to(roomId).emit('note:stream', content)
    return {
      event: 'note:stream',
      data,
    }
  }
}
