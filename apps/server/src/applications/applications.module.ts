import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ApplicationEntitiy } from './application.entitiy'
import { ApplicationsController } from './applications.controller'
import { ApplicationsRepository } from './applications.repository'
import { ApplicationsService } from './applications.service'

@Module({
  imports: [TypeOrmModule.forFeature([ApplicationEntitiy])],
  controllers: [ApplicationsController],
  providers: [ApplicationsService, ApplicationsRepository],
})
export class ApplicationsModlue {}
