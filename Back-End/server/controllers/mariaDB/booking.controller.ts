import { Request, Response, NextFunction, Router } from 'express'
import authMiddleware from '../../auth/firebaseAuthMiddleware'
import { Booking } from '../../entity/mariaDB/booking'
import {
  CrudController,
  IController,
  ICrudController,
} from '../crud.controller'

/**
 * The interface to use for every Booking Controller.
 */
export interface IBookingController extends ICrudController, IController {
  test: string
}
//g
export class BookingController
  extends CrudController<Booking>
  implements IBookingController
{
  public router = Router()
  public test = 'OK'

  constructor() {
    super(Booking) // Initialize the parent constructor

    this.router.get('/all', authMiddleware, this.all)
    this.router.get('/:id', authMiddleware, this.one)
    this.router.post('', authMiddleware, this.save)
    this.router.put('/:id', authMiddleware, this.update)
    this.router.delete('/:id', authMiddleware, this.remove)
  }

  // Get all bookings with corresponding User and Room (Joins)
  all = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const users = await this.repository
        .createQueryBuilder('booking')
        .leftJoinAndSelect('booking.user', 'user')
        .leftJoinAndSelect('booking.room', 'room')
        .getMany()
      response.send(users)
    } catch {
      response.status(400)
      response.send({
        message: 'All has failed in bookingController',
      })
    }
  }

  save = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const bodyBooking: Booking = request.body
      // Zoek in de DB of de booking al in de DB zit
      // let booking = await this.repository.findOne({
      //   socketId: bodyBooking.socketId,
      // })

      //if (booking == undefined) {
        // Staat nog niet in de DB (socket heeft nog nooit geconnecteerd) en zal in de DB worden geplaatst
        console.log(bodyBooking)
        this.repository.save(bodyBooking)
        response.send(bodyBooking)
      // } else {
      //   // staat wel in de DB, update de locatie (= point) en ed tijd wanneer het is geupdated
      //   //booking.checkIn = new Date()
      //   //booking.checkOut = new Date()
      //   this.repository.save(booking)
      //   response.send(booking)
      // }
    } catch {
      response.status(400)
      response.send({
        message: 'Save has failed in bookingController',
      })
    }
  }
}
