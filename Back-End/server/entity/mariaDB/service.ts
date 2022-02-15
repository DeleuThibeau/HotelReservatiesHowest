import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { RoomService } from "./roomServices";

@Entity('service') // The table name
export class Service {
    @PrimaryGeneratedColumn('uuid') // Generated as UUID in the database
    uuid?: string

    @Column({ length: 100 })
    name?: string
    
    @Column({ length: 100 })
    icon?: string
    
    @OneToMany(() => RoomService, (rs: RoomService) => rs.service)
    @JoinColumn()
    roomServices!: RoomService[];
}