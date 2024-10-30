import { Injectable } from '@nestjs/common'
import { NotesRepository } from './notes.repository'
import { NoteEntitiy } from './note.entitiy'
import { NoteBody } from './types'

@Injectable()
export class NotesService {
  constructor(private notesRepository: NotesRepository) {}

  getNote(id: string): Promise<NoteEntitiy> {
    try {
      return this.notesRepository.findOne(id)
    } catch {
      throw new Error()
    }
  }
  getAllNotes(): Promise<NoteEntitiy[]> {
    try {
      return this.notesRepository.findAll()
    } catch {
      throw new Error()
    }
  }

  saveNote(note: NoteBody): Promise<string> {
    return this.notesRepository.create(note)
  }
  updateNote(id: string, note: Partial<NoteBody>): Promise<void> {
    return this.notesRepository.update(id, note)
  }

  removeNote(id: string): Promise<void> {
    return this.notesRepository.remove(id)
  }
}
