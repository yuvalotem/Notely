import { Module } from '@nestjs/common'

import { TypeOrmModule } from '@nestjs/typeorm'
import { NotesModlue } from './notes/notes.module'
import { NoteEntitiy } from './notes/note.entitiy'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12345678',
      database: 'test',
      entities: [NoteEntitiy, __dirname + './**/*.entity.{js,ts}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([NoteEntitiy]),
    NotesModlue,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
