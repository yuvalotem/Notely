import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { NotificationEntity } from './notification.entity'
import { NotificationsController } from './notifications.controller'
import { NotificationsRepository } from './notifications.repository'
import { NotificationsService } from './notifications.service'

@Module({
  imports: [TypeOrmModule.forFeature([NotificationEntity])],
  controllers: [NotificationsController],
  providers: [NotificationsService, NotificationsRepository],
})
export class NotificationsModule {}
