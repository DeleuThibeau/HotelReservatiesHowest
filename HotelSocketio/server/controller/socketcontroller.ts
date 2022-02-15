import { Server, Socket } from 'socket.io'
import axios from 'axios'
import { Booking } from '../entity/booking'
import { BookingDates } from '../entity/BookingDates'


var nmbr: number = 0
var bookedDates: BookingDates[] = []


export class SocketController {
  public io: Server
  public socket: Socket




  constructor(io: Server, socket: Socket) {
    this.io = io
    this.socket = socket
  }

  newBooking = async (payload: any) => {
    // write here your code  with socket / axios
    console.log('new booking has started!')

    const payloadToRestApi = new Booking()
    payloadToRestApi.socketid = this.socket.id

    await axios.post(`${process.env.REST_API_URL}/booking`, payloadToRestApi)

    this.socket.emit(
      'bookingTracker:message',
      `booking ${this.socket.id} is in progress`,
    )

    this.socket.broadcast.emit(
      'bookingTracker:show',
      `the id of the new booking is ${this.socket.id} and its current period is from...`,
    )
  }

  getBookingInformation = async (payload: any) => {
    console.log('What booking did just happen?')

    const booking = await axios.get(
      `${process.env.REST_API_URL}/booking/${payload.bookingUuid}`,
    )
    const bookedData: any = booking.data

    this.socket.emit(
      'RoomBooked:message',
      `{
          Vul hier JSON IN VAN DE BOOKING ALSOF JE DAT ZOU DOEN IN POSTMAN

          "user": ${this.socket.id},
          "booking": {
            "uuid": ${bookedData.uuid},

      }`,
    )
  }

  getRoomInformation = async (payload: any) => {
    console.log('What room did just happen?')
    console.log(payload.message.uuid)

    const room = await axios.get(
      `${process.env.REST_API_URL}/room/${payload.roomUuid}`,
    )
    const roomData: any = room.data
    bookedDates = payload.message.bookedDates
    nmbr += 1
    console.log(nmbr)
    this.socket.emit(
      'room:message',
      `{
          Vul hier JSON IN VAN DE BOOKING ALSOF JE DAT ZOU DOEN IN POSTMAN

          "user": ${this.socket.id},
          "booking": {
            "uuid": ${roomData.uuid},
            "nmbr": ${nmbr}

      }`,
    )
  }

  checkDates = async (payload: any) => {
    console.log('show Dates')
    console.log("msg" + payload.message)
    let available: boolean = true

   

    // const room = await axios.get(
    //   `${process.env.REST_API_URL}/room/${payload.roomId}`,
    // )
    // const roomData: any = room.data

    const roomData = JSON.parse(payload.room)

    payload.message.forEach((date: string) => {
      console.log("dt" + date)
      bookedDates.forEach((bookingDate: BookingDates) => {
        console.log("bkd" + bookingDate)
        if (bookingDate.socketID == this.socket.id) {
          bookedDates[bookedDates!.indexOf(bookingDate)].bookedDates = []
        }
        else if (bookingDate.bookedDates!.indexOf(date) > -1) {
          available = false
        }
      })
      if (roomData.bookedDates.indexOf(date) > -1) {
        available = false
      }
    });
    console.log(available)
    if (available) {
      console.log(available)
      if (bookedDates.find(x => x.socketID == this.socket.id)) {
        let bookingObj: BookingDates = bookedDates.find(x => x.socketID == this.socket.id)!
        if (bookingObj.roomName == payload.roomId) {
          bookingObj.bookedDates = payload.message
        }
       

      } else {
        bookedDates.push({ socketID: this.socket.id, bookedDates: payload.message, roomName: payload.roomId })
      }

    }

    console.log(bookedDates)
    // nmbr += 1
    // console.log(nmbr)
    this.socket.broadcast.emit(
      'room:message',
      `{"available": ${available},"data": ${JSON.stringify(bookedDates)}}`,
    )
  }

  clearDates = async (payload: any) => {
    console.log("disconnect")
    bookedDates.forEach((bookingDate: BookingDates) => {

      if (bookingDate.socketID == this.socket.id) {

        bookedDates[bookedDates!.indexOf(bookingDate)].bookedDates = []
      }

    })
  }
}
