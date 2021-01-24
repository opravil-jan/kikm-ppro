import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
} from 'typeorm'
import Client from './client'

@Entity('contact')
export default class Contact extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: false, unique: false })
  name: string

  @Column({ nullable: false, unique: false })
  contact: string

  @ManyToOne((type) => Client, (client) => client.id)
  client: Client
}
