import { Module } from '@nestjs/common'

import { NoteGateway } from './stream.gateway'

@Module({
  providers: [NoteGateway],
})
export class EventsModule {}
