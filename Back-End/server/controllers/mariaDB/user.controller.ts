import express, { Request, Response, NextFunction, Router } from 'express'
import { User } from '../../entity/mariaDB/user'
import {
  CrudController,
  IController,
  ICrudController,
} from '../crud.controller'
import admin from 'firebase-admin'
import authMiddleware from '../../auth/firebaseAuthMiddleware'
/**
 * The interface to use for every User Controller.
 */
export interface IUserController extends ICrudController, IController {}

export class UserController
  extends CrudController<User>
  implements IUserController
{
  public router = Router()

  constructor() {
    super(User)
    this.router.post('', this.signUp)
    this.router.get('/all', authMiddleware, this.all)
    this.router.get('/forgotPassword/:email', this.oneByEmailForgotPassword)
    this.router.get('/:email', authMiddleware, this.oneByEmail)

    this.router.get('/:id', authMiddleware, this.one)
    this.router.put('/:id', authMiddleware, this.update)
    this.router.delete('/:id', authMiddleware, this.remove)
  }

  all = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const users = await this.repository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.booking', 'booking')
        .getMany()
      response.send(users)
    } catch (ex) {
      response.status(400)
      response.send(ex)
    }
  }

  signUp = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { email, password, name } = request.body
      const lenghtPassword = parseInt(password.length)

      if (lenghtPassword > 8) {
        const user = await admin
          .auth()
          .createUser({ email, password, displayName: name })
        if (user) {
          const item = await this.repository.save(request.body)
          response.send(item)
        } else {
          response.send({
            messsage: 'Something went wrong because of firebase...',
          })
        }
      } else {
        response.status(400)
        response.send({
          messsage: 'Your password must be at least 8 characters long!',
        })
      }
    } catch (ex) {
      response.status(400)
      response.send({
        message: 'Signup has failed',
      })
    }
  }

  // Simple function used to get user (was used for testing purposes, afterwards used in code for the frontend)
  oneByEmail = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const user = await this.repository.findOne({
        email: request.params.email,
      })

      response.send(user)
    } catch {
      response.status(400)
      response.send({
        message: 'oneByMail has failed in userController',
      })
    }
  }
  // Function needed for authentication code
  oneByEmailForgotPassword = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const user = await this.repository.findOne({
        email: request.params.email,
      })
      if (user) {
        response.send(user)
      } else {
        response.send({
          message: 'No user was found with this email',
        })
      }
    } catch (ex) {
      response.status(400)
      response.send({
        message: 'forgotPassword with email has failed',
      })
    }
  }

  // Simple function to be used in the BACKEND ONLY for Authentication
  OneByEmailBackend = async (email: string) => {
    const user = await this.repository.findOne({ email: email })
    return user
  }
}
