import { Module } from '@nestjs/common'

import { NotificationGateway } from './stream.gateway'

@Module({
  providers: [NotificationGateway],
})
export class EventsModule {}
