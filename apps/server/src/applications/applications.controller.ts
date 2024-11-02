import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
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
  private readonly logger = new Logger(ApplicationsController.name)

  constructor(private readonly appService: ApplicationsService) {}

  @Get('/')
  async getAllApplications(@Response() res: ResponseType) {
    this.logger.log('Get all applications')
    const data = await this.appService.getAllApplications()

    this.logger.log('Got all applications', { apps: data })

    return res.status(200).json({ apps: data, totalCount: data.length })
  }

  @Get('/:id')
  async getData(@Param('id') id: string, @Response() res: ResponseType) {
    this.logger.log('Retrive application by id', { id })
    const data = await this.appService.getApplication(id)

    this.logger.log('Got application', { app: data })

    return res.status(200).json(data)
  }

  @Post()
  async saveData(
    @Body() { name }: CreateApplicationDto,
    @Response() res: ResponseType
  ) {
    this.logger.log('Going to save application', { name })
    const id = await this.appService.saveApplication(name)

    this.logger.log('Application saved with id', { id })

    return res.status(204).json({ id })
  }

  @Put('/:id')
  async updateData(
    @Body() { name }: CreateApplicationDto,
    @Param('id') id: string,
    @Response() res: ResponseType
  ) {
    this.logger.log('Going to update application by id', { id })
    await this.appService.updateApplicaiton(id, name)

    this.logger.log('Succfully updated application', { id })

    return res.status(200).json()
  }

  @Delete('/:id')
  async deleteData(@Param('id') id: string, @Response() res: ResponseType) {
    this.logger.log('Going to delete application by id', { id })
    await this.appService.removeApplication(id)

    this.logger.log('Succfully deleted application by id', { id })

    return res.status(200).json()
  }
}
