import { Controller, Get,Post,Body, Response, Param, Delete } from '@nestjs/common';

import { AppService } from './app.service';

export class CreateCompDto {
  component: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/:id')
  async getData(@Param() params: any,@Response() res: any) {
    console.log('inside get', params)
    if(params.id === 'all'){
      const data = await this.appService.getAllData();
      console.log('data',data);
      return res.status(200).json(data);
      }
      const data = await this.appService.getData(params.id);
      console.log('data',data);
      return res.status(200).json(data);
  }

  // @Get('/all')
  // async getAllData(@Response() res: any) {
  //   const data = await this.appService.getAllData();
  //   console.log('data',data);
  //   return res.status(200).json(data);
  // }

  @Post()
  async saveData(@Body() createCompDto: CreateCompDto, @Response() res: any) {
    console.log('inside post', createCompDto)
    const id = await this.appService.saveData(createCompDto.component)
    console.log('after create id',id);
    return res.status(204).json({ id });
  }

  @Delete('/:id')
  async deleteData(@Param() params: any, @Response() res: any) {
    console.log('inside delete', params)
    await this.appService.removeData(params.id);
    return res.status(204).json();
  }
}
