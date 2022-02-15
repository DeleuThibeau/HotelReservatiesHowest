import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Booking } from './booking'

@Entity('user') // The table name
export class User {
  @PrimaryGeneratedColumn('uuid') // Generated as UUID in the database
  uuid?: string

  @Column({ length: 100 })
  name?: string

  @Column({ length: 100, nullable: true })
  firstName?: string

  @Column({ default: '0', nullable: true })
  age?: number

  @Column({ default: 'user' })
  type?: string

  @Column({ nullable: true })
  email!: string

  @Column({ nullable: true })
  password!: string

  @Column({ nullable: true })
  image?: string

  @OneToMany(() => Booking, (booking: Booking) => booking.user)
  @JoinColumn()
  booking?: Booking[]
}
