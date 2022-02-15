import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core'
import {
  MatCalendar,
  MatCalendarCellClassFunction,
  MatDatepicker,
} from '@angular/material/datepicker'
import { ActivatedRoute } from '@angular/router'
import Review from 'src/app/models/review'
import Room from 'src/app/models/room'
import { NetworkService } from '../../../services/network.service'
import User from 'src/app/models/user'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import SearchOptions from 'src/app/models/searchOptions'
import Booking from 'src/app/models/booking'
import { RealtimeCom } from 'src/app/services/realtimeCom'
import { BookingDates } from 'src/app/models/bookingDates'


@Component({
  selector: 'app-roomsDetail',
  templateUrl: './roomsDetail.component.html',
  styleUrls: ['./roomsDetail.component.css'],
})
export class roomsDetailComponent implements OnInit {
  public currentWindowWidth: number = 0
  public room: Room = {}
  public stars: number[] = [1, 2, 3, 4, 5]
  public selectedValue: number = 0
  public rating: number = 0
  public reviews: Review[] = []
  public isNotSubmitted: boolean = true
  public errorMsg: string = ''
  private roomName: string = ''
  private available: boolean = true
  private bookedDates: BookingDates[] = []

 


  @ViewChild('adult') adult: ElementRef = {} as ElementRef
  @ViewChild('kid') kid: ElementRef = {} as ElementRef
  @ViewChild('pickerOut') datePickerOut: MatDatepicker<Date> =
    {} as MatDatepicker<Date>
  @ViewChild('checkIn') checkIn: ElementRef = {} as ElementRef
  @ViewChild('checkOut') checkOut: ElementRef = {} as ElementRef
  @ViewChild(MatCalendar) calendar: MatCalendar<Date> = {} as MatCalendar<Date>
  @ViewChild('name') name: ElementRef = {} as ElementRef
  @ViewChild('reviewValue') reviewValue: ElementRef = {} as ElementRef

  constructor(private route: ActivatedRoute, private network: NetworkService, private realtime: RealtimeCom) 
  {
    
  }

  ngOnInit(): void {
    this.currentWindowWidth = window.innerWidth
  }

  ngAfterViewInit() {
    this.route.queryParams.subscribe(params => {
      let name: string = params['name']
      this.roomName = name
      if (params['searchOptions'] != undefined) {
      let searchOptions: SearchOptions = JSON.parse(
        atob(params['searchOptions']),
      )

      if (searchOptions != undefined) {
        this.checkIn.nativeElement.value = searchOptions.checkIn
        this.checkOut.nativeElement.value = searchOptions.checkOut
        this.adult.nativeElement.value = searchOptions.adults
        this.kid.nativeElement.value = searchOptions.kids
      }
    }
      

      this.network.getSingleRoom(name).then((room: any) => {
        this.room = room
        console.log(room)
        this.calendar.updateTodaysDate()
        

        this.realtime.onNewMessage().subscribe((msg: any) => {
          console.log({msg})
          this.available = JSON.parse(msg).available 
          this.bookedDates = JSON.parse(msg).data
          console.log(this.bookedDates)
          this.calendar.updateTodaysDate()
        });


        
        this.network.getAllReviewsByRoom(this.room.uuid!).then((reviews: any) => {
          this.reviews = reviews
          this.addUserImagesToReviews(this.reviews)
        })
      })
    })
  }

  ngOnDestroy()
  {
    console.log("leaving")
    this.realtime.clearDates()
  }

  @HostListener('window:unload', ['$event'])
  unloadHandler(event: any) {
    console.log("leaving")
    this.realtime.clearDates()
  } 

  bookRoom()
  {
    
    if(this.checkIfRoomAvailable(this.checkIn.nativeElement.value,this.checkOut.nativeElement.value))
    {
      if (this.available) {
        let booking: Booking = {}
      
        booking.checkIn = this.checkIn.nativeElement.value
        booking.checkOut = this.checkOut.nativeElement.value
        booking.room = this.room.uuid
        booking.user = JSON.parse(localStorage.getItem('user')!).uuid
        booking.kids =  +this.kid.nativeElement.value
        booking.adults = +this.adult.nativeElement.value
        booking.price = this.room.price
        console.log(booking)
        this.network.postBooking(booking)
      }
      
    }
  }

  checkIfRoomAvailable(startDate: string, endDate: string) {
    const currentDates = this.getAllDatesBewteen(startDate, endDate)
    let notAvailable: boolean = false

    if (startDate != "" && endDate != "" && this.adult.nativeElement.value > 0) {
      if (currentDates.length > 0) {
        this.room.bookedDates?.forEach(date => {
          currentDates.forEach(currentDate => {
            let parts = startDate.split('/')
            let dtCheckIn = new Date(
              parseInt(parts[2], 10),
              parseInt(parts[1], 10) - 1,
              parseInt(parts[0], 10),
            )
            if (currentDate.getTime() == new Date(dtCheckIn).getTime()) {
              notAvailable = true
            }
          })
        })
        if (notAvailable == false) {
          
            this.errorMsg = ''
            return true
            console.log("booked room")

        } else {
          this.errorMsg = 'This date is not available.'
        } 
      }
      else {
        this.errorMsg = 'Choose a valid date.'
      }
    } else {
      this.errorMsg = 'Fill in all fields and/or have atleast 1 adult.'
    }
    return false
    
  }

  getAllDatesBewteen(startDate: string, endDate: string, steps = 1) {
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


  addUserImagesToReviews(reviews: Review[]) {
    reviews.forEach((review: Review) => {
      this.network.getUser(review.userId!).then((user: User) => {
        console.log(user)
        if(user != null)
        {
          review.userImage = "user1.png"
          review.userName = user.name
        } else
        {
          review.userImage = "user1.png"
          review.userName = "anomymous"
        }
        
        
      })
    })
  }
  

  countStar(star: number) {
    this.rating = star
    console.log('Value of star', star)
    this.realtime.sendMessage(this.room)
  }

  checkStar() {
    if (this.rating == 0) {
      this.selectedValue = 0
    } else {
      this.selectedValue = this.rating
    }
  }

  upValue(type: string) {
    if (type == 'adult') {
      var amount: number = +this.adult.nativeElement.value
      if (amount < 20) {
        this.adult.nativeElement.value = amount + 1
      }
    } else if (type == 'kid') {
      var amount: number = +this.kid.nativeElement.value
      if (amount < 20) {
        this.kid.nativeElement.value = amount + 1
      }
    }
  }

  downValue(type: string) {
    if (type == 'adult') {
      var amount: number = +this.adult.nativeElement.value
      if (amount != 0) {
        this.adult.nativeElement.value = amount - 1
      }
    } else if (type == 'kid') {
      var amount: number = +this.kid.nativeElement.value
      if (amount != 0) {
        this.kid.nativeElement.value = amount - 1
      }
    }
  }

  dateChanged() {
    this.datePickerOut.open()
    
    let dates: Date[] = this.getAllDatesBewteen(this.checkIn.nativeElement.value,this.checkOut.nativeElement.value)
    let datesAsString: string[] = []
  
    dates.forEach((date: Date) => {
    let parts = date.toLocaleDateString().split('/')
    let dateAsString = parts[0] + '/' + parts[1] + '/' + parts[2]
    
    datesAsString.push(dateAsString)
  
    })

    if (datesAsString != []) {
      this.realtime.checkDates(datesAsString, this.room.name!)
    }
    
  }

  checkOutDateChanged()
  {
    let dates: Date[] = this.getAllDatesBewteen(this.checkIn.nativeElement.value,this.checkOut.nativeElement.value)
    let datesAsString: string[] = []
  
    dates.forEach((date: Date) => {
    let parts = date.toLocaleDateString().split('/')
    let dateAsString = parts[0] + '/' + parts[1] + '/' + parts[2]
    
    datesAsString.push(dateAsString)
  
    })

    if (datesAsString != []) {
      this.realtime.checkDates(datesAsString, this.room.name!)
    }
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    let dates: number[] = []
    this.room.bookedDates?.forEach((date: string) => {
      let parts = date.split('/')
      let dtOccupied = new Date(
        parseInt(parts[2], 10),
        parseInt(parts[1], 10) - 1,
        parseInt(parts[0], 10),
      )
      if (
        new Date(dtOccupied).getMonth() == cellDate.getMonth() &&
        new Date(dtOccupied).getFullYear() == cellDate.getFullYear()
      ) {
        dates.push(new Date(dtOccupied).getDate())
      }
    })
    if (cellDate.valueOf() < new Date().valueOf()) {
      dates.push(cellDate.getDate())
    }

    this.bookedDates.forEach((dateObj: BookingDates) => {
      if (dateObj.roomName == this.room.name) {
        dateObj.bookedDates?.forEach((date: string) => {
          let parts = date.split('/')
          let dtOccupied = new Date(
            parseInt(parts[2], 10),
            parseInt(parts[1], 10) - 1,
            parseInt(parts[0], 10),
          )
          if (
            dtOccupied.getMonth() == cellDate.getMonth() &&
            dtOccupied.getFullYear() == cellDate.getFullYear()
          ) {
            dates.push(dtOccupied.getDate())
          }
        })
      }
    });
    
    if (view === 'month') {
      const date = cellDate.getDate()

      return dates.includes(date) ? 'not-available' : 'available'
    }

    return ''
  }

  @HostListener('window:resize')
  onResize() {
    this.currentWindowWidth = window.innerWidth
  }

  

  reviewForm = new FormGroup({
    review: new FormControl('', [
      Validators.required,
      Validators.maxLength(100),
    ]),
  })

  get review() {
    return this.reviewForm.get('review')
  }

  public localStorageItem(user: string): string {
    return localStorage.getItem(user)!
  }

  public localStorageUserName(user: string): string {
    return JSON.parse(localStorage.getItem(user)!).name
  }

  submitReview() {
    let review: Review = {}
    review.roomId = this.room.uuid
    review.comment = this.reviewValue.nativeElement.value
    review.starRating = this.rating
    review.userId = JSON.parse(localStorage.getItem('user')!).uuid
    this.isNotSubmitted = false
    console.log(review)
    this.network.submitReview(review)
  }
}
