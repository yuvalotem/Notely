import { Module } from '@nestjs/common'

import { NotesController } from './notes.controller'
import { NotesService } from './notes.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { NotesRepository } from './notes.repository'
import { NoteEntitiy } from './note.entitiy'

@Module({
  imports: [TypeOrmModule.forFeature([NoteEntitiy])],
  controllers: [NotesController],
  providers: [NotesService, NotesRepository],
})
export class NotesModlue {}
