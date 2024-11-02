/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'
import { PORT } from './consts'
import { socketIoClient } from './SocketIoClient'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors()
  const globalPrefix = 'api'

  app.setGlobalPrefix(globalPrefix)

  await app.listen(PORT)
  Logger.log(
    `🚀 Application is running on: http://localhost:${PORT}/${globalPrefix}`
  )
  socketIoClient.connect()
}

bootstrap()
