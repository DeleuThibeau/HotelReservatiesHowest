import { Request, Response, NextFunction, Router } from 'express'
import authMiddleware from '../../auth/firebaseAuthMiddleware'
import { Service } from '../../entity/mariaDB/service'
import {
  CrudController,
  IController,
  ICrudController,
} from '../crud.controller'

/**
 * The interface to use for every Service Controller.
 */
export interface IServiceController extends ICrudController, IController {}

export class ServiceController
  extends CrudController<Service>
  implements IServiceController
{
  public router = Router()

  constructor() {
    super(Service)

    this.router.get('/all', this.all)
    this.router.get('/:id', this.one)

    this.router.post('', authMiddleware, this.save)
    this.router.put('/:id', authMiddleware, this.update)
    this.router.delete('/:id', authMiddleware, this.remove)
  }

  all = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const services = await this.repository
        .createQueryBuilder('service')
        .leftJoinAndSelect('service.roomServices', 'roomServices')
        .getMany()
      response.send(services)
    } catch {
      response.status(400)
      response.send({
        message: 'All has failed in serviceController',
      })
    }
  }
}
