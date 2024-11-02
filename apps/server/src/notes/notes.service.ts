import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'

import { NoteEntitiy } from './note.entitiy'
import { NotesRepository } from './notes.repository'
import { NoteBody } from './types'

@Injectable()
export class NotesService {
  private readonly logger = new Logger(NotesService.name)

  constructor(private notesRepository: NotesRepository) {}

  getNote(id: string): Promise<NoteEntitiy> {
    try {
      return this.notesRepository.findOne(id)
    } catch (error: unknown) {
      this.logger.error(`Note with id: ${id} not found`, { error })
      throw new HttpException('Note not found', HttpStatus.NOT_FOUND)
    }
  }

  getAllNotes(): Promise<NoteEntitiy[]> {
    try {
      return this.notesRepository.findAll()
    } catch (error: unknown) {
      this.logger.error('Coludnt get all notes', { error })
      throw new HttpException('Notes not found', HttpStatus.NOT_FOUND)
    }
  }

  saveNote(note: NoteBody): Promise<string> {
    try {
      return this.notesRepository.create(note)
    } catch (error: unknown) {
      this.logger.error(`Coludnt create note`, { note, error })
      throw new HttpException('Invalid Note', HttpStatus.BAD_REQUEST)
    }
  }

  updateNote(id: string, note: Partial<NoteBody>): Promise<void> {
    try {
      return this.notesRepository.update(id, note)
    } catch (error: unknown) {
      this.logger.error(`Coludnt update note`, { id, note, error })
      throw new HttpException('Failed to update note', HttpStatus.BAD_REQUEST)
    }
  }

  removeNote(id: string): Promise<void> {
    try {
      return this.notesRepository.remove(id)
    } catch (error: unknown) {
      this.logger.error(`Coludnt delete note by id`, { id, error })
      throw new HttpException('Failed to delete note', HttpStatus.BAD_REQUEST)
    }
  }
}
