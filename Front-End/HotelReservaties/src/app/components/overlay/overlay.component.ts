import { Component, OnInit, TemplateRef, Type } from '@angular/core';
import Booking from 'src/app/models/booking';
import overlayContent from 'src/app/models/overlayContent';
import Review from 'src/app/models/review';
import { MyOverlayRef } from './myOverlay-ref';


@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
})
export class OverlayComponent implements OnInit {
  contentType!: 'template' | 'string' | 'component';
  content!: string | TemplateRef<any> | Type<any>;
  context: { close: any; } | undefined;

  public overlayContent: overlayContent = {}
  

  constructor(private ref: MyOverlayRef) {}

  

  close() {
    this.ref.close(null);
  }

  ngOnInit() {
    this.content = this.ref.content;
    this.overlayContent = this.content as overlayContent
    console.log(this.overlayContent)

    if (typeof this.content === 'string') {
      this.contentType = 'string';
    } else if (this.content instanceof TemplateRef) {
      this.contentType = 'template';
      this.context = {
        close: this.ref.close.bind(this.ref)
      };
    } else {
      this.contentType = 'component';
    }
  }

  getMostFrequentRoom()
  {
    let roomList: string[] = []

    this.overlayContent.bookings?.forEach((booking: any) => {
      roomList.push(booking.room!.name)
    })

    if(roomList.length == 0) return null;
   
    var modeMap:any = {};
    var maxEl = roomList[0], maxCount = 1;
    for(var i = 0; i < roomList.length; i++)
    {
        var el = roomList[i];
        if(modeMap[el] == null)
            modeMap[el] = 1;
        else
            modeMap[el]++;  
        if(modeMap[el] > maxCount)
        {
            maxEl = el;
            maxCount = modeMap[el];
        }
    }
    return maxEl;
  }

  getAveragePeople() {
    let people: number = 0

    this.overlayContent.bookings?.forEach((booking: any) => {
      people += booking.adults + booking.kids
    })

    return Math.round(people / this.overlayContent.bookings!?.length)
  }

  getAverageStarRating()
  {
    let stars: number = 0
    this.overlayContent.reviews?.forEach((review: any) => {
      stars += review.starRating
    })
    return Math.round(stars / this.overlayContent.reviews!?.length)
  }

  getLatestCreated()
  {
    let latestCreated: Date = new Date()
      this.overlayContent.reviews!.forEach((review: Review) => {
        if (review.createdAt! > latestCreated) {
          latestCreated = review.createdAt!
        }
      })
      return latestCreated.toLocaleDateString()
  }
}

