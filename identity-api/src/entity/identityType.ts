import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import Client from './client'

@Entity('identity_type')
export default class IdentityType extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  name: string

  @OneToMany((type) => Client, (client) => client.identityType)
  client: Client
}
