import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Room } from "./room";
import { User } from "./user"

@Entity('booking') // The table name
export class Booking {
    @PrimaryGeneratedColumn('uuid') // Generated as UUID in the database
    uuid?: string

    @Column()
    checkIn?: String
    
    @Column()
    checkOut?: String
    
    @Column() 
    kids?: number
    
    @Column() 
    adults?: number
    
    @Column() 
    price?: number

    @ManyToOne(() => User,  (user:User) => user.uuid)
    @JoinColumn( {name: "user"} )
    user?: User;

    @ManyToOne(() => Room, (room:Room) => room.uuid)
    @JoinColumn({name: "room"})
    room?: Room;
}