import { Request, Response, NextFunction, Router } from 'express'
import authMiddleware from '../../auth/firebaseAuthMiddleware'
import { Room } from '../../entity/mariaDB/room'
import {
  CrudController,
  IController,
  ICrudController,
} from '../crud.controller'

/**
 * The interface to use for every Room Controller.
 */
export interface IRoomController extends ICrudController, IController {
  test: string
}

export class RoomController
  extends CrudController<Room>
  implements IRoomController
{
  public router = Router()
  public test = 'OK'

  constructor() {
    super(Room) // Initialize the parent constructor

    this.router.get('/all', this.all)
    this.router.get('/id/:id', this.one)
    this.router.get('/:name', this.oneByName)
    this.router.post('', authMiddleware, this.save)
    this.router.put('/:id', authMiddleware, this.update)
    this.router.delete('/:id', authMiddleware, this.remove)
  }

  all = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const rooms = await this.repository
        .createQueryBuilder('room')
        .leftJoinAndSelect('room.roomServices', 'roomServices')
        .leftJoinAndSelect('roomServices.service', 'services')
        .getMany()
      response.send(rooms)
    } catch {
      response.status(400)
      response.send({
        message: 'All has failed in roomController',
      })
    }
  }

  one = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const rooms = await this.repository.findOne(request.params.id, {
        join: {
          alias: 'room',
          leftJoinAndSelect: {
            roomServices: 'room.roomServices',
            services: 'roomServices.service',
          },
        },
      })

      response.send(rooms)
    } catch {
      response.status(400)
      response.send({
        message: 'One has failed in roomController',
      })
    }
  }

  oneByName = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const rooms = await this.repository.findOne(
        { name: request.params.name },
        {
          join: {
            alias: 'room',
            leftJoinAndSelect: {
              roomServices: 'room.roomServices',
              services: 'roomServices.service',
            },
          },
        },
      )

      response.send(rooms)
    } catch {
      response.status(400)
      response.send({
        message: 'One has failed in roomController',
      })
    }
  }

  save = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const bodyRoom: Room = request.body
      if (bodyRoom == undefined) {
        // Staat nog niet in de DB (socket heeft nog nooit geconnecteerd) en zal in de DB worden geplaatst
        this.repository.save(bodyRoom)
        response.send(bodyRoom)
      } else {
        // staat wel in de DB, update de lijst
        bodyRoom.bookedDates = bodyRoom.bookedDates
        this.repository.save(bodyRoom)
        response.send(bodyRoom)
      }
    } catch {
      response.status(400)
      response.send({
        message: 'Save has failed in roomController',
      })
    }
  }
}
