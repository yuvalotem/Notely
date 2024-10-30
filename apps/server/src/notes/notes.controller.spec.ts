import { Test, TestingModule } from '@nestjs/testing'

import { NotesController } from './notes.controller'
import { NotesService } from './notes.service'

describe('NotesController', () => {
  let app: TestingModule

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [NotesController],
      providers: [NotesService],
    }).compile()
  })

  describe('getData', () => {
    it('should return "Hello API"', () => {
      const notesController = app.get<NotesController>(NotesController)
      expect(notesController.getData('', '')).toEqual({
        message: 'Hello API',
      })
    })
  })
})
