import { Test } from '@nestjs/testing'

import { NotesService } from './notes.service'

describe('NotesService', () => {
  let service: NotesService

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [NotesService],
    }).compile()

    service = app.get<NotesService>(NotesService)
  })

  describe('getData', () => {
    it('should return "Hello API"', () => {
      expect(service.getData()).toEqual({ message: 'Hello API' })
    })
  })
})
