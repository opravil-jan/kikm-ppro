import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from 'typeorm'

@Entity('users')
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: false, unique: true })
  login: string

  @Column({ nullable: false, unique: true })
  email: string

  @Column({ nullable: false })
  password: string

  @Column({ default: new Date() })
  createdAt: Date

  @Column({ default: null })
  deactivationDate: Date
}
