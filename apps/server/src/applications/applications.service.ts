import { Injectable } from '@nestjs/common'
import { ApplicationsRepository } from './applications.repository'
import { ApplicationEntitiy } from './application.entitiy'

@Injectable()
export class ApplicationsService {
  constructor(private appRepository: ApplicationsRepository) {}

  getApplication(id: string): Promise<ApplicationEntitiy> {
    try {
      return this.appRepository.findOne(id)
    } catch {
      throw new Error()
    }
  }
  getAllApplications(): Promise<ApplicationEntitiy[]> {
    try {
      return this.appRepository.findAll()
    } catch {
      throw new Error()
    }
  }

  saveApplication(component: string): Promise<string> {
    return this.appRepository.create(component)
  }
  updateApplicaiton(id: string, component: string): Promise<void> {
    return this.appRepository.update(id, component)
  }

  removeApplication(id: string): Promise<void> {
    return this.appRepository.remove(id)
  }
}
