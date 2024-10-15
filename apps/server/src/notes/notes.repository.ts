import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { NoteEntitiy } from './note.entitiy'

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

  async create(component: string): Promise<string> {
    try {
      const entity = await this.appRepository.save({ component })

      return entity?.id
    } catch (e) {
      console.error(e)
      throw new Error('couldnt create component')
    }
  }

  async update(id: string, component: string): Promise<void> {
    await this.appRepository.update(id, { component })
  }

  async remove(id: string): Promise<void> {
    await this.appRepository.delete(id)
  }
}
