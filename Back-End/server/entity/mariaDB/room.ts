import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Booking } from './booking'
import { RoomService } from './roomServices'

@Entity('room') // The table name
export class Room {
  @PrimaryGeneratedColumn('uuid') // Generated as UUID in the database
  uuid?: string

  @Column({ length: 100 })
  name?: string

  @Column()
  price?: number

  @Column('text')
  description?: string

  @Column()
  bedType?: string

  @Column('simple-json')
  maxGuest?: Record<string, number>

  @Column()
  bookingNights?: number

  @Column()
  area?: number

  @Column()
  image?: string

  @Column('simple-array', { nullable: true })
  bookedDates?: Date

  @OneToMany(() => RoomService, (rs: RoomService) => rs.room)
  @JoinColumn()
  roomServices!: RoomService[]

  @OneToMany(() => Booking, (booking: Booking) => booking)
  @JoinColumn()
  bookings?: Booking
}
