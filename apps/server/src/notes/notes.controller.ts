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

import { socketIoClient } from '../SocketIoClient'
import { NotesService } from './notes.service'
import { NoteBody } from './types'

@Controller('/notes')
export class NotesController {
  private readonly logger = new Logger(NotesController.name)

  constructor(private readonly notesService: NotesService) {}

  @Get('/')
  async getAllNotes(@Response() res: ResponseType) {
    this.logger.log('Get all notes')
    const data = await this.notesService.getAllNotes()

    this.logger.log('Got all notes', { notes: data })

    return res.status(200).json({ notes: data, totalCount: data.length })
  }

  @Get('/:id')
  async getNote(@Param('id') id: string, @Response() res: ResponseType) {
    this.logger.log('Retrive note by id', { id })
    const data = await this.notesService.getNote(id)

    this.logger.log('Got note', { note: data })

    return res.status(200).json(data)
  }

  @Post()
  async saveData(
    @Body() createNoteDto: NoteBody,
    @Response() res: ResponseType
  ) {
    this.logger.log('Going to save note', { note: createNoteDto })
    const id = await this.notesService.saveNote(createNoteDto)

    this.logger.log('Note saved with id', { id })

    return res.status(204).json({ id })
  }

  @Post('/push')
  async pushNote(
    @Body() { id }: { id: string },
    @Response() res: ResponseType
  ) {
    this.logger.log('Retrive note by id', { id })
    const note = await this.notesService.getNote(id)

    this.logger.log('Going to publish note', { note })

    socketIoClient.emit('room', note.appId)
    socketIoClient.emit('note:publish', {
      content: note.component,
      roomId: note.appId,
    })
    this.logger.log('Succfully published note', { id })

    return res.status(204).json({ id })
  }

  @Put('/:id')
  async updateData(
    @Body() note: Partial<NoteBody>,
    @Param('id') id: string,
    @Response() res: ResponseType
  ) {
    this.logger.log('Going to update note by id', { id })
    await this.notesService.updateNote(id, note)
    this.logger.log('Succfully updated note', { id })

    return res.status(200).json()
  }

  @Delete('/:id')
  async deleteData(@Param('id') id: string, @Response() res: ResponseType) {
    this.logger.log('Going to delete note by id', { id })
    await this.notesService.removeNote(id)
    this.logger.log('Succfully deleted note by id', { id })

    return res.status(200).json()
  }
}
