import {
  Controller,
  Get,
  Post,
  Body,
  Response,
  Param,
  Delete,
  Put,
} from '@nestjs/common'
import { Response as ResponseType } from 'express'

import { NotesService } from './notes.service'

export class CreateCompDto {
  component: string
}

@Controller('/notes')
export class NotesController {
  constructor(private readonly appService: NotesService) {}

  @Get('/:id')
  async getData(@Param('id') id: string, @Response() res: ResponseType) {
    if (id === 'all') {
      const data = await this.appService.getAllNotes()
      return res.status(200).json(data)
    }
    const data = await this.appService.getNote(id)
    return res.status(200).json(data)
  }

  @Post()
  async saveData(
    @Body() createCompDto: CreateCompDto,
    @Response() res: ResponseType
  ) {
    const id = await this.appService.saveNote(createCompDto.component)
    return res.status(204).json({ id })
  }

  @Put('/:id')
  async updateData(
    @Body() createCompDto: CreateCompDto,
    @Param('id') id: string,
    @Response() res: ResponseType
  ) {
    await this.appService.updateNote(id, createCompDto.component)
    return res.status(200).json()
  }

  @Delete('/:id')
  async deleteData(@Param('id') id: string, @Response() res: ResponseType) {
    await this.appService.removeNote(id)
    return res.status(200).json()
  }
}
