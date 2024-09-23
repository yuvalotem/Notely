import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppRepository } from './app.repository';
import { AppEntitiy } from './app.entitiy';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12345678',
      database: 'test',
      entities: [AppEntitiy, __dirname + './**/*.entity.{js,ts}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([AppEntitiy]),
  ],
  controllers: [AppController],
  providers: [AppService, AppRepository],
})
export class AppModule {}
