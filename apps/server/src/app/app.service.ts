import { Injectable } from '@nestjs/common';
import { AppRepository } from './app.repository';
import { AppEntitiy } from './app.entitiy';

@Injectable()
export class AppService {
  constructor(
    private appRepository: AppRepository,
  ) {}
  
  getData(id: string): Promise<AppEntitiy> {
    try{
        return this.appRepository.findOne(id)
      }catch {
        throw new Error()
      }
    }
  getAllData(): Promise<AppEntitiy[]> {
    try{
        return this.appRepository.findAll()
      }catch {
        throw new Error()
      }
    }
    
    saveData(component:string): Promise<string> {
      return this.appRepository.create(component)
  }

    removeData(id:string): Promise<void> {
      return this.appRepository.remove(id)
  }
}
