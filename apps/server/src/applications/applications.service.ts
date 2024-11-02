import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'

import { ApplicationEntitiy } from './application.entitiy'
import { ApplicationsRepository } from './applications.repository'

@Injectable()
export class ApplicationsService {
  private readonly logger = new Logger(ApplicationsService.name)

  constructor(private appRepository: ApplicationsRepository) {}

  getApplication(id: string): Promise<ApplicationEntitiy> {
    try {
      return this.appRepository.findOne(id)
    } catch {
      this.logger.error(`Application with id: ${id} not found`)
      throw new HttpException('Application not found', HttpStatus.NOT_FOUND)
    }
  }

  getAllApplications(): Promise<ApplicationEntitiy[]> {
    try {
      return this.appRepository.findAll()
    } catch {
      this.logger.error('Coludnt get all applications')
      throw new HttpException('Applications not found', HttpStatus.NOT_FOUND)
    }
  }

  saveApplication(component: string): Promise<string> {
    try {
      return this.appRepository.create(component)
    } catch {
      this.logger.error('Coludnt create application')
      throw new HttpException(
        'Failed to create application',
        HttpStatus.BAD_REQUEST
      )
    }
  }

  updateApplicaiton(id: string, component: string): Promise<void> {
    try {
      return this.appRepository.update(id, component)
    } catch {
      this.logger.error('Coludnt update application')
      throw new HttpException(
        'Failed to update application',
        HttpStatus.BAD_REQUEST
      )
    }
  }

  removeApplication(id: string): Promise<void> {
    try {
      return this.appRepository.remove(id)
    } catch {
      this.logger.error('Coludnt delete application')
      throw new HttpException(
        'Failed to delete application',
        HttpStatus.BAD_REQUEST
      )
    }
  }
}
