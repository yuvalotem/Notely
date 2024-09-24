import { Injectable } from '@nestjs/common';
import { AppRepository } from './app.repository';
import { AppEntitiy } from './app.entitiy';

@Injectable()
export class AppService {
  constructor(
    private appRepository: AppRepository,
  ) {}
  
  getNote(id: string): Promise<AppEntitiy> {
    try{
        return this.appRepository.findOne(id)
      }catch {
        throw new Error()
      }
    }
  getAllNotes(): Promise<AppEntitiy[]> {
    try{
        return this.appRepository.findAll()
      }catch {
        throw new Error()
      }
    }
    
    saveNote(component:string): Promise<string> {
      return this.appRepository.create(component)
  }
    updateNote(id:string, component:string): Promise<void> {
      return this.appRepository.update(id,component)
  }

    removeNote(id:string): Promise<void> {
      return this.appRepository.remove(id)
  }
}
