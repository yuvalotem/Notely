import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AppEntitiy {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  component: string;
}