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
import { io, Socket } from 'socket.io-client'

import { NotesService } from './notes.service'
import { NoteBody } from './types'

@Controller('/notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get('/')
  async getAllNotes(@Response() res: ResponseType) {
    const data = await this.notesService.getAllNotes()
    return res.status(200).json({ notes: data, totalCount: data.length })
  }

  @Get('/:id')
  async getNote(@Param('id') id: string, @Response() res: ResponseType) {
    const data = await this.notesService.getNote(id)
    return res.status(200).json(data)
  }

  @Post()
  async saveData(
    @Body() createNoteDto: NoteBody,
    @Response() res: ResponseType
  ) {
    const id = await this.notesService.saveNote(createNoteDto)
    return res.status(204).json({ id })
  }

  @Post('/push')
  async pushNote(@Body() body: { id: string }, @Response() res: ResponseType) {
    const note = await this.notesService.getNote(body.id)
    const ioClient: Socket = io('http://localhost:8000', {
      autoConnect: false,
      transports: ['websocket', 'polling'],
    })
    ioClient.connect()
    ioClient.emit('room', note.appId)
    ioClient.emit('note:publish', {
      content: note.component,
      roomId: note.appId,
    })
    return res.status(204).json({ id: body.id })
  }

  @Put('/:id')
  async updateData(
    @Body() note: Partial<NoteBody>,
    @Param('id') id: string,
    @Response() res: ResponseType
  ) {
    await this.notesService.updateNote(id, note)
    return res.status(200).json()
  }

  @Delete('/:id')
  async deleteData(@Param('id') id: string, @Response() res: ResponseType) {
    await this.notesService.removeNote(id)
    return res.status(200).json()
  }
}
