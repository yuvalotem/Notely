import { Module } from '@nestjs/common'

import { TypeOrmModule } from '@nestjs/typeorm'
import { NotesModlue } from './notes'
import { NoteEntitiy } from './notes/note.entitiy'
import { EventsModule } from './stream'
import { ApplicationsModlue } from './applications'
import { ApplicationEntitiy } from './applications/application.entitiy'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12345678',
      database: 'test',
      entities: [
        NoteEntitiy,
        ApplicationEntitiy,
        __dirname + './**/*.entity.{js,ts}',
      ],
      synchronize: true,
    }),
    NotesModlue,
    ApplicationsModlue,
    EventsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
