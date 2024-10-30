import { Test } from '@nestjs/testing'
import { NoteGateway } from './stream.gateway'
import { INestApplication } from '@nestjs/common'
import { Socket, io } from 'socket.io-client'

async function createNestApp(...gateways: any): Promise<INestApplication> {
  const testingModule = await Test.createTestingModule({
    providers: gateways,
  }).compile()
  return testingModule.createNestApplication()
}

describe('NoteGateway', () => {
  let gateway: NoteGateway
  let app: INestApplication
  let ioClient: Socket

  beforeAll(async () => {
    // Instantiate the app
    app = await createNestApp(NoteGateway)
    // Get the gateway instance from the app instance
    gateway = app.get<NoteGateway>(NoteGateway)
    // Create a new client that will interact with the gateway
    ioClient = io('http://localhost:3000', {
      autoConnect: false,
      transports: ['websocket', 'polling'],
    })

    app.listen(3000)
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be defined', () => {
    expect(gateway).toBeDefined()
  })

  it('should emit "note:stream" on "note:publish"', async () => {
    ioClient.connect()
    ioClient.emit('note:publish', 'Hello world!')
    await new Promise<void>((resolve) => {
      ioClient.on('connect', () => {
        console.log('connected')
      })
      ioClient.on('note:stream', (data) => {
        expect(data).toBe('Hello world!')
        resolve()
      })
    })
    ioClient.disconnect()
  })
})
