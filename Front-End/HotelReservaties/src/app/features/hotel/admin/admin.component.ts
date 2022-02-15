import { Component, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import {Overlay, OverlayConfig, OverlayModule} from '@angular/cdk/overlay';
import { ComponentType, TemplatePortal } from '@angular/cdk/portal';
import { OverlayService } from 'src/app/components/overlay/overlay.service';
import Booking from 'src/app/models/booking';
import User from 'src/app/models/user';
import { NetworkService } from 'src/app/services/network.service';
import Review from 'src/app/models/review';
import overlayContent from 'src/app/models/overlayContent';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public user: any = {}
  public bookings: Booking[] = []
  public reviews: Review[] = []
  public latestCreated: string = ""

  content: any = {}
  constructor(private overlayService: OverlayService, private network: NetworkService,private router: Router) {}

  open(content: TemplateRef<any> | ComponentType<any> | string) {
    
    const ref = this.overlayService.open(content, null);
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!)
    console.log(this.user.uuid)
    this.network.getAllBookings(localStorage.getItem('token')!).then((bookings: any) => {
      this.bookings = bookings
      this.content.bookings = bookings
    })

    this.network.getAllReviewsByUser(this.user.uuid!).then((reviews: any) => {
      this.reviews = reviews
      this.content.reviews = reviews
      let latestCreated: Date = new Date()
      this.reviews.forEach((review: Review) => {
        if (review.createdAt! > latestCreated) {
          latestCreated = review.createdAt!
        }
      })
      this.latestCreated = latestCreated.toLocaleDateString()
    })
  }

  logout()
  {
    localStorage.clear()
    this.router.navigateByUrl(
      `/login`,
    )
  }

}
