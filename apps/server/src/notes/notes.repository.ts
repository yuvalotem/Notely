import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { NoteEntitiy } from './note.entitiy'
import { NoteBody } from './types'

@Injectable()
export class NotesRepository {
  constructor(
    @InjectRepository(NoteEntitiy)
    private appRepository: Repository<NoteEntitiy>
  ) {}

  findAll(): Promise<NoteEntitiy[]> {
    return this.appRepository.find()
  }

  findOne(id: string): Promise<NoteEntitiy | null> {
    return this.appRepository.findOneBy({ id })
  }

  async create(note: NoteBody): Promise<string> {
    try {
      const entity = await this.appRepository.save(note)

      return entity?.id
    } catch (e) {
      console.error(e)
      throw new Error('couldnt create component')
    }
  }

  async update(id: string, note: Partial<NoteBody>): Promise<void> {
    await this.appRepository.update(id, note)
  }

  async remove(id: string): Promise<void> {
    await this.appRepository.delete(id)
  }
}
