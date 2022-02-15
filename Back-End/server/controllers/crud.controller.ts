// THIS FILE IS NOT USED ANYWHERE. IT'S JUST TO SHOW HOW THIS CONTROLLER WOULD LOOK LIKE IF REVIEWS WAS A PART OF MARIADB

import { Request, Response, NextFunction, Router } from 'express'

import { EntityTarget, getRepository, Repository } from 'typeorm'

/**
 * The interface with Express relations
 */
export interface IController {
  /**
   * the Express Router object
   */
  router: Router
}

/**
 * The interface to use for every Crud Controller.
 */
export interface ICrudController {
  all(request: Request, response: Response, next: NextFunction): void
  one(request: Request, response: Response, next: NextFunction): void
  save(request: Request, response: Response, next: NextFunction): void
  remove(request: Request, response: Response, next: NextFunction): void
}

/**
 * Extend from this class to use the repository functionalities
 * The T-parameter is initialized at the extending of the controller
 */
export class CrudController<T> implements ICrudController {
  public repository: Repository<T>

  constructor(model: EntityTarget<T>) {
    this.repository = getRepository(model)
  }

  all = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const items = await this.repository.find()
      response.send(items)
    } catch (ex) {
      response.status(400)
      response.send(ex)
      response.send({
        message: 'All has failed in crudController',
      })
    }
  }

  one = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const item = await this.repository.findOne(request.params.id)
      response.send(item)
    } catch (ex) {
      response.status(400)
      response.send(ex)
      response.send({
        message: 'One has failed in crudController',
      })
    }
  }

  save = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const item = await this.repository.save(request.body)
      response.send(item)
    } catch (ex) {
      response.status(400)
      response.send(ex)
      response.send({
        message: 'Save has failed in crudController',
      })
    }
  }

  remove = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const itemToRemove = (await this.repository.findOne(
        request.params.id,
      )) as T
      await this.repository.remove(itemToRemove)
      response.send({
        message: 'Successfully removed',
        datetime: Date.now().toString(),
      })
    } catch (ex) {
      response.status(400)
      response.send(ex)
      response.send({
        message: 'Remove has failed in crudController',
      })
    }
  }

  update = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const idItem = request.params.id
      await this.repository.update(idItem, request.body)
      response.send({
        message: 'Successfully updated',
        datetime: Date.now().toString(),
      })
    } catch (ex) {
      response.status(400)
      response.send(ex)
      response.send({
        message: 'Update has failed in crudController',
      })
    }
  }
}
