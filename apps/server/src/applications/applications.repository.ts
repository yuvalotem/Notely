import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { ApplicationEntitiy } from './application.entitiy'

@Injectable()
export class ApplicationsRepository {
  constructor(
    @InjectRepository(ApplicationEntitiy)
    private appRepository: Repository<ApplicationEntitiy>
  ) {}

  findAll(): Promise<ApplicationEntitiy[]> {
    return this.appRepository.find()
  }

  findOne(id: string): Promise<ApplicationEntitiy | null> {
    return this.appRepository.findOneBy({ id })
  }

  async create(name: string): Promise<string> {
    const entity = await this.appRepository.save({ name })

    return entity?.id
  }

  async update(id: string, name: string): Promise<void> {
    await this.appRepository.update(id, { name })
  }

  async remove(id: string): Promise<void> {
    await this.appRepository.delete(id)
  }
}
