import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import Review from 'src/app/models/review'
import Booking from '../models/booking'
import Room from '../models/room'

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  private port: number = 30902

  constructor(private http: HttpClient) {}

  async getAllRooms() {
    //var xmlHttp = new XMLHttpRequest();
    //xmlHttp.open( "GET", `http://localhost:${this.port}/room/all`, false ); // false for synchronous request
    //xmlHttp.send( null );

    return await this.http
      .get(`http://localhost:${this.port}/room/all`)
      .toPromise()
  }

  async getAllBookingsByUser(userID: string, token: string) {
    const headers = { Authorization: 'Bearer ' + token }
    console.log(`http://localhost:${this.port}/booking/all/${userID}`)

    return await this.http
      .get(`http://localhost:${this.port}/booking/all/${userID}`, {
        headers: headers,
      })
      .toPromise()
  }

  async getAllBookings(token: string) {
    const headers = { Authorization: 'Bearer ' + token }

    return await this.http
      .get(`http://localhost:${this.port}/booking/all`, {
        headers: headers,
      })
      .toPromise()
  }

  async getSingleRoom(name: string) {
    //var xmlHttp = new XMLHttpRequest();
    //xmlHttp.open( "GET", `http://localhost:${this.port}`, false ); // false for synchronous request
    //xmlHttp.send( null );
    console.log(`http://localhost:${this.port}/room/${name}`)
    return await this.http
      .get(`http://localhost:${this.port}/room/${name}`)
      .toPromise()
  }

  async getSingleRoomById(id: string) {
    //var xmlHttp = new XMLHttpRequest();
    //xmlHttp.open( "GET", `http://localhost:${this.port}`, false ); // false for synchronous request
    //xmlHttp.send( null );
    console.log(`http://localhost:${this.port}/room/id/${id}`)
    return await this.http
      .get(`http://localhost:${this.port}/room/id/${id}`)
      .toPromise()
  }

  async postBooking(booking: Booking) {
    this.getSingleRoomById(booking.room!).then((room: Room) => {
      console.log(room)
      let dates: Date[] = this.getAllDatesBewteen(
        booking.checkIn!,
        booking.checkOut!,
      )
      let datesAsString: string[] = []

      dates.forEach((date: Date) => {
        let parts = date.toLocaleDateString().split('/')
        let dateAsString = parts[0] + '/' + parts[1] + '/' + parts[2]

        datesAsString.push(dateAsString)
      })
      room.bookedDates = [...room.bookedDates!, ...datesAsString]
      const headersPut = {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }
      const body = { bookedDates: room.bookedDates }
      this.http
        .put(`http://localhost:${this.port}/room/${booking.room}`, body, {
          headers: headersPut,
        })
        .toPromise()
      console.log(room.bookedDates)

      const Postbody = JSON.stringify(booking)
      const headers = {
        'content-type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }
      console.log(Postbody)
      console.log(`http://localhost:${this.port}/booking`)
      this.http
        .post(`http://localhost:${this.port}/booking`, Postbody, {
          headers: headers,
        })
        .toPromise()
    })
  }

  getAllDatesBewteen(startDate: String, endDate: String, steps: number = 1) {
    const dateArray = []

    let parts = startDate.split('/')
    let dtCheckIn = new Date(
      parseInt(parts[2], 10),
      parseInt(parts[1], 10) - 1,
      parseInt(parts[0], 10),
    )
    let currentDate = new Date(dtCheckIn)

    parts = endDate.split('/')
    let dtCheckOut = new Date(
      parseInt(parts[2], 10),
      parseInt(parts[1], 10) - 1,
      parseInt(parts[0], 10),
    )
    let checkOutDate = new Date(dtCheckOut)

    while (currentDate <= new Date(checkOutDate)) {
      dateArray.push(new Date(currentDate))
      // Use UTC date to prevent problems with time zones and DST
      currentDate.setDate(currentDate.getDate() + steps)
    }
    return dateArray
  }

  async getUser(id: string) {
    console.log(`http://localhost:${this.port}/user/${id}`)
    const headers = { Authorization: 'Bearer ' + localStorage.getItem('token') }
    return await this.http
      .get(`http://localhost:${this.port}/user/${id}`, { headers: headers })
      .toPromise()
  }

  async getAllReviewsByRoom(id: string) {
    let reviewsByRoom: Review[] = []
    return await fetch(`http://localhost:${this.port}/v1`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
      query{
        getReviews
        {
          id,
          roomId,
          starRating,
          comment,
          userId,
          createdAt
        }
      }`,
      }),
    })
      .then(res => res.json())

      .then(res => {
        res.data.getReviews.forEach((review: Review) => {
          //console.log(review.roomId)
          if (review.roomId == id) {
            //console.log(review)
            reviewsByRoom.push(review)
          }
        })
        return reviewsByRoom
      })
  }

  async getAllReviewsByUser(id: string) {
    let reviewsByUser: Review[] = []
    return await fetch(`http://localhost:${this.port}/v1`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify({
        query: `
      query{
        getReviews
        {
          id,
          roomId,
          starRating,
          comment,
          userId,
          createdAt
        }
      }`,
      }),
    })
      .then(res => res.json())

      .then(res => {
        console.log(res.data.getReviews)
        res.data.getReviews.forEach((review: Review) => {
          //console.log(review.roomId)
          if (review.userId == id) {
            //console.log(review)
            reviewsByUser.push(review)
          }
        })
        return reviewsByUser
      })
  }

  async getCountry() {
    return await this.http.get(`http://ip-api.com/json`).toPromise()
  }

  async submitReview(review: Review) {
    let reviewsByRoom: Review[] = []
    return await fetch(`http://localhost:${this.port}/v1`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify({
        query: `
        mutation {
          createReview(data:{comment: "${review.comment}", starRating: ${review.starRating}, roomId: "${review.roomId}", userId: "${review.userId}"})
          {
            id,
            roomId,
            starRating,
            comment,
            userId
          }
        }`,
      }),
    }).then(res => console.log(res))
  }

  async getSingleUser(email: string, token: any) {
    console.log(`http://localhost:${this.port}/user/${email}`)
    const headers = { Authorization: 'Bearer ' + token }
    console.log(headers)

    return await this.http
      .get(`http://localhost:${this.port}/user/${email}`, {
        headers: headers,
      })
      .toPromise()
  }

  async getForgotPasswordUser(email: string) {
    console.log(`http://localhost:${this.port}/forgotpassword/user/${email}`)
    return await this.http
      .get(`http://localhost:${this.port}/user/forgotpassword/${email}`)
      .toPromise()
  }

  async createUser(name: string, email: string, password: string) {
    const body = {
      name: name,
      email: email,
      password: password,
    }

    const Postbody = JSON.stringify(body)
    const headers = { 'content-type': 'application/json' }
    console.log(Postbody)
    console.log(`http://localhost:${this.port}/user`)
    this.http
      .post(`http://localhost:${this.port}/user`, Postbody, {
        headers: headers,
      })
      .toPromise()
  }
}
