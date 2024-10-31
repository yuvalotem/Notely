import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Response,
} from '@nestjs/common'
import { Response as ResponseType } from 'express'

import { ApplicationsService } from './applications.service'

type CreateApplicationDto = {
  name: string
}

@Controller('/applications')
export class ApplicationsController {
  constructor(private readonly appService: ApplicationsService) {}

  @Get('/')
  async getAllApplications(@Response() res: ResponseType) {
    const data = await this.appService.getAllApplications()

    return res.status(200).json({ apps: data, totalCount: data.length })
  }

  @Get('/:id')
  async getData(@Param('id') id: string, @Response() res: ResponseType) {
    const data = await this.appService.getApplication(id)

    return res.status(200).json(data)
  }

  @Post()
  async saveData(
    @Body() { name }: CreateApplicationDto,
    @Response() res: ResponseType
  ) {
    const id = await this.appService.saveApplication(name)

    return res.status(204).json({ id })
  }

  @Put('/:id')
  async updateData(
    @Body() { name }: CreateApplicationDto,
    @Param('id') id: string,
    @Response() res: ResponseType
  ) {
    await this.appService.updateApplicaiton(id, name)

    return res.status(200).json()
  }

  @Delete('/:id')
  async deleteData(@Param('id') id: string, @Response() res: ResponseType) {
    await this.appService.removeApplication(id)

    return res.status(200).json()
  }
}
