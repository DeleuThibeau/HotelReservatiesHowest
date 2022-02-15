import { Request, Response, NextFunction, Router } from 'express'
import { Review } from "../../entity/mongoDB/review"; 
import { CrudController, IController, ICrudController } from '../crud.controller';

/**
 * The interface to use for every Review Controller.
 */
export interface IReviewController extends ICrudController, IController {}

export class ReviewController
  extends CrudController<Review>
  implements IReviewController
{
  public router = Router()

  constructor() {
    super(Review)

    this.router.get('/all', this.all)
    this.router.get('/:id', this.one)
    this.router.post('', this.save)
    this.router.put('', this.update)
  }
}