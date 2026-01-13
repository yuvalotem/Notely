import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Response,
} from '@nestjs/common'
import { Response as ResponseType } from 'express'

import { socketIoClient } from '../SocketIoClient'
import { NotificationsService } from './notifications.service'
import { NotificationBody } from './types'

@Controller('/notifications')
export class NotificationsController {
  private readonly logger = new Logger(NotificationsController.name)

  constructor(private readonly notificationsService: NotificationsService) {}

  @Get('/')
  async getAllNotifications(@Response() res: ResponseType) {
    this.logger.log('Get all notifications')
    const data = await this.notificationsService.getAllNotifications()

    this.logger.log('Got all notifications', { notifications: data })

    return res
      .status(200)
      .json({ notifications: data, totalCount: data.length })
  }

  @Get('/:id')
  async getNotification(
    @Param('id') id: string,
    @Response() res: ResponseType
  ) {
    this.logger.log('Retrieve notification by id', { id })
    const data = await this.notificationsService.getNotification(id)

    this.logger.log('Got notification', { notification: data })

    return res.status(200).json(data)
  }

  @Post()
  async saveData(
    @Body() createNotificationDto: NotificationBody,
    @Response() res: ResponseType
  ) {
    this.logger.log('Going to save notification', {
      notification: createNotificationDto,
    })

    const id = await this.notificationsService.saveNotification(
      createNotificationDto
    )

    this.logger.log('Notification saved with id', { id })

    return res.status(204).json({ id })
  }

  @Post('/push')
  async pushNotification(
    @Body() { id }: { id: string },
    @Response() res: ResponseType
  ) {
    this.logger.log('Retrieve notification by id', { id })
    const notification = await this.notificationsService.getNotification(id)

    this.logger.log('Going to publish notification', { notification })

    socketIoClient.emit('room', notification.appId)
    socketIoClient.emit('notification:publish', {
      content: notification.component,
      roomId: notification.appId,
    })
    this.logger.log('Successfully published notification', { id })

    return res.status(204).json({ id })
  }

  @Put('/:id')
  async updateData(
    @Body() notification: Partial<NotificationBody>,
    @Param('id') id: string,
    @Response() res: ResponseType
  ) {
    this.logger.log('Going to update notification by id', { id })
    await this.notificationsService.updateNotification(id, notification)
    this.logger.log('Successfully updated notification', { id })

    return res.status(200).json()
  }

  @Delete('/:id')
  async deleteData(@Param('id') id: string, @Response() res: ResponseType) {
    this.logger.log('Going to delete notification by id', { id })
    await this.notificationsService.removeNotification(id)
    this.logger.log('Successfully deleted notification by id', { id })

    return res.status(200).json()
  }
}
