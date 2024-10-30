import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class ApplicationEntitiy {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string
}
