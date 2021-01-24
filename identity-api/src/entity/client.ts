import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import IdentityType from './identityType'
import Contact from './contact'

@Entity('clients')
export default class Client extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: false, unique: true })
  name: string

  @Column({ nullable: true })
  description: string

  @Column({ nullable: true })
  expiration: Date

  @ManyToOne((type) => IdentityType, (identityType) => identityType.id)
  identityType: IdentityType
}
