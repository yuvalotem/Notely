import { Module } from '@nestjs/common'

import { ApplicationsController } from './applications.controller'
import { ApplicationsService } from './applications.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ApplicationsRepository } from './applications.repository'
import { ApplicationEntitiy } from './application.entitiy'

@Module({
  imports: [TypeOrmModule.forFeature([ApplicationEntitiy])],
  controllers: [ApplicationsController],
  providers: [ApplicationsService, ApplicationsRepository],
})
export class ApplicationsModlue {}
