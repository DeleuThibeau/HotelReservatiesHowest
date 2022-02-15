import "reflect-metadata"
import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    JoinColumn,
    ManyToOne,
  } from 'typeorm';
import { Room } from "./room";
import { Service } from "./service";

@Entity('roomServices') // The table name
export class RoomService extends BaseEntity {
    @PrimaryGeneratedColumn('uuid', // Generated as UUID in the database
    )
    uuid?: string // use ! to ignore the initialization warning.
    

    @ManyToOne(() => Room, (room:Room) => room.roomServices)
    @JoinColumn( {name: "room"} )
    room!: Room;

    @ManyToOne(() => Service, (service:Service) => service.roomServices)
    @JoinColumn( {name: "service"} )
    service!: Service;

    @Column()
    name?: string; // What is the name of this service
}