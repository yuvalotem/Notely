import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ApplicationsModlue } from './applications'
import { ApplicationEntitiy } from './applications/application.entitiy'
import { NotificationsModule } from './notifications'
import { NotificationEntity } from './notifications/notification.entity'
import { EventsModule } from './stream'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12345678',
      database: 'test',
      entities: [
        NotificationEntity,
        ApplicationEntitiy,
        `${__dirname}./**/*.entity.{js,ts}`,
      ],
      synchronize: true,
    }),
    NotificationsModule,
    ApplicationsModlue,
    EventsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
