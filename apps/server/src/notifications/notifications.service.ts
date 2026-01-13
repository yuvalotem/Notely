import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'

import { NotificationEntity } from './notification.entity'
import { NotificationsRepository } from './notifications.repository'
import { NotificationBody } from './types'

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name)

  constructor(private notificationsRepository: NotificationsRepository) {}

  getNotification(id: string): Promise<NotificationEntity> {
    try {
      return this.notificationsRepository.findOne(id)
    } catch (error: unknown) {
      this.logger.error(`Notification with id: ${id} not found`, { error })
      throw new HttpException('Notification not found', HttpStatus.NOT_FOUND)
    }
  }

  getAllNotifications(): Promise<NotificationEntity[]> {
    try {
      return this.notificationsRepository.findAll()
    } catch (error: unknown) {
      this.logger.error('Could not get all notifications', { error })
      throw new HttpException('Notifications not found', HttpStatus.NOT_FOUND)
    }
  }

  saveNotification(notification: NotificationBody): Promise<string> {
    try {
      return this.notificationsRepository.create(notification)
    } catch (error: unknown) {
      this.logger.error(`Could not create notification`, {
        notification,
        error,
      })
      throw new HttpException('Invalid Notification', HttpStatus.BAD_REQUEST)
    }
  }

  updateNotification(
    id: string,
    notification: Partial<NotificationBody>
  ): Promise<void> {
    try {
      return this.notificationsRepository.update(id, notification)
    } catch (error: unknown) {
      this.logger.error(`Could not update notification`, {
        id,
        notification,
        error,
      })
      throw new HttpException(
        'Failed to update notification',
        HttpStatus.BAD_REQUEST
      )
    }
  }

  removeNotification(id: string): Promise<void> {
    try {
      return this.notificationsRepository.remove(id)
    } catch (error: unknown) {
      this.logger.error(`Could not delete notification by id`, { id, error })
      throw new HttpException(
        'Failed to delete notification',
        HttpStatus.BAD_REQUEST
      )
    }
  }
}
