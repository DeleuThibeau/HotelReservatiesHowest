import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Booking from 'src/app/models/booking';
import Review from 'src/app/models/review';
import Room from 'src/app/models/room';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  loader = true

  public user: any = {}
  public bookings: any[] = []
  public reviews: Review[] = []
  public latestCreated: string = ""
  public stars: number[] = [1, 2, 3, 4, 5]
  public rooms: Room[] = []
  public roomName: string = ""

  constructor(private network: NetworkService, private router: Router) { }

  ngOnInit(): void {
    this.loader =false

    this.user = JSON.parse(localStorage.getItem('user')!)
    console.log(this.user.uuid)
    this.network.getAllBookingsByUser(this.user.uuid, localStorage.getItem('token')!).then((bookings: any) => {
      this.bookings = bookings
    })

    this.network.getAllReviewsByUser(this.user.uuid!).then((reviews: any) => {
      this.reviews = reviews
      
      let latestCreated: Date = new Date()
      this.reviews.forEach((review: Review) => {
        if (review.createdAt! > latestCreated) {
          latestCreated = review.createdAt!
        }
      })
      this.latestCreated = latestCreated.toLocaleDateString()
    })

    this.network.getAllRooms().then((rooms: any) => {
      this.rooms=rooms
    })
  }
  
  logout()
  {
    localStorage.clear()
    this.router.navigateByUrl(
      `/login`,
    )
  }

  getRoomName(id: string)
  {
    let roomName: string = ""
     this.rooms.forEach((room: Room) => {
      
       if (id == room.uuid) {
        roomName = room.name!

       } 
     })
     return roomName
  }

}
