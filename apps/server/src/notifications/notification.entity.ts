import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class NotificationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('json')
  component: { text: string; style: Record<string, unknown> }

  @Column()
  appId: string

  @Column()
  name: string
}
