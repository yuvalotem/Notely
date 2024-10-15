import { Injectable } from '@nestjs/common'
import { NotesRepository } from './notes.repository'
import { NoteEntitiy } from './note.entitiy'

@Injectable()
export class NotesService {
  constructor(private appRepository: NotesRepository) {}

  getNote(id: string): Promise<NoteEntitiy> {
    try {
      return this.appRepository.findOne(id)
    } catch {
      throw new Error()
    }
  }
  getAllNotes(): Promise<NoteEntitiy[]> {
    try {
      return this.appRepository.findAll()
    } catch {
      throw new Error()
    }
  }

  saveNote(component: string): Promise<string> {
    return this.appRepository.create(component)
  }
  updateNote(id: string, component: string): Promise<void> {
    return this.appRepository.update(id, component)
  }

  removeNote(id: string): Promise<void> {
    return this.appRepository.remove(id)
  }
}
