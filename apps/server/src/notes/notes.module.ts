import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { NoteEntitiy } from './note.entitiy'
import { NotesController } from './notes.controller'
import { NotesRepository } from './notes.repository'
import { NotesService } from './notes.service'

@Module({
  imports: [TypeOrmModule.forFeature([NoteEntitiy])],
  controllers: [NotesController],
  providers: [NotesService, NotesRepository],
})
export class NotesModlue {}
