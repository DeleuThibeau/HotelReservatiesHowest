import { Request, Response, NextFunction, Router } from 'express'
import authMiddleware from '../../auth/firebaseAuthMiddleware'
import { RoomService } from '../../entity/mariaDB/roomServices'
import {
  CrudController,
  IController,
  ICrudController,
} from '../crud.controller'

/**
 * The interface to use for every Service Controller.
 */
export interface IRoomServiceController extends ICrudController, IController {}

export class RoomServiceController
  extends CrudController<RoomService>
  implements IRoomServiceController
{
  public router = Router()

  constructor() {
    super(RoomService)

    this.router.get('/all', this.all)
    this.router.get('/:id', this.one)

    this.router.post('', authMiddleware, this.save)
    this.router.put('/:id', authMiddleware, this.update)
    this.router.delete('/:id', authMiddleware, this.remove)
  }

  all = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const roomServices = await this.repository
        .createQueryBuilder('roomServices')
        .leftJoinAndSelect('roomServices.room', 'room')
        .leftJoinAndSelect('roomServices.service', 'service')
        .getMany()
      response.send(roomServices)
    } catch {
      response.status(400)
      response.send({
        message: 'All has failed in roomServiceController',
      })
    }
  }
}
