import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { NotificationEntity } from './notification.entity'
import { NotificationBody } from './types'

@Injectable()
export class NotificationsRepository {
  constructor(
    @InjectRepository(NotificationEntity)
    private appRepository: Repository<NotificationEntity>
  ) {}

  findAll(): Promise<NotificationEntity[]> {
    return this.appRepository.find()
  }

  findOne(id: string): Promise<NotificationEntity | null> {
    return this.appRepository.findOneBy({ id })
  }

  async create(notification: NotificationBody): Promise<string> {
    const entity = await this.appRepository.save(notification)

    return entity?.id
  }

  async update(
    id: string,
    notification: Partial<NotificationBody>
  ): Promise<void> {
    await this.appRepository.update(id, notification)
  }

  async remove(id: string): Promise<void> {
    await this.appRepository.delete(id)
  }
}
