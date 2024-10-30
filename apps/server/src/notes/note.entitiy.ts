import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class NoteEntitiy {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  component: string

  @Column()
  appId: string

  @Column()
  name: string
}
