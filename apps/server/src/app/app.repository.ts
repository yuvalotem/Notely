import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppEntitiy } from './app.entitiy';

@Injectable()
export class AppRepository {
  constructor(    
    @InjectRepository(AppEntitiy)
  private appRepository: Repository<AppEntitiy>) {}

  findAll(): Promise<AppEntitiy[]> {
    return this.appRepository.find();
  }

  findOne(id: string): Promise<AppEntitiy | null> {
    return this.appRepository.findOneBy({ id });
  }

  async create(component: string): Promise<string> {
    try{
      const entity = await this.appRepository.save({ component })
      
      return entity?.id;
      }
      catch(e){
        console.error(e)
        throw new Error('couldnt create component')
      }
  }

  async update(id: string,component: string): Promise<void> {
    await this.appRepository.update(id, { component });
  }

  async remove(id: string): Promise<void> {
    await this.appRepository.delete(id);
  }

}
