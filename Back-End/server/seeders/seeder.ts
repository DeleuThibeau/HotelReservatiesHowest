// import { plainToClass } from 'class-transformer'
import { plainToClass } from 'class-transformer'
import { Connection, getRepository } from 'typeorm'
import { Config } from '../entity/mariaDB/config'
import { Room } from '../entity/mariaDB/room'
import { RoomService } from '../entity/mariaDB/roomServices'
import { Service } from '../entity/mariaDB/service'
import { User } from '../entity/mariaDB/user'
import rooms from './rooms.json'
import services from './services.json'
import users from './users.json'
import roomServices from './roomServices.json'

const seedDatabase = async (connection: Connection) => {
  try {
    const dbIsSeeded = await getRepository(Config).findOne('seeded')
    if (dbIsSeeded === undefined) {
      await connection.manager.save(plainToClass(User, users))
      await connection.manager
        .save(plainToClass(Room, rooms))
        .then(() => {
          connection.manager.save(plainToClass(Service, services))
        })
        .then(() => {
          connection.manager.save(plainToClass(RoomService, roomServices))
          console.log('roomServices succeeded :)')
        })

      // Mark as seeded.
      const seeded = new Config()
      seeded.key = 'seeded'
      seeded.value = 'true'
      await connection.manager.save(seeded)

      console.log('I have seeded the database with everything necessary!')
    } else {
      console.log('The database has already been seeded before.')
    }
  } catch (ex) {
    console.log(ex, '{error: seeder has failed}')
  }
}
export default seedDatabase
