import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core'
import { MatDatepicker } from '@angular/material/datepicker'
import { ActivatedRoute, Router } from '@angular/router'
import Room from 'src/app/models/room'
import SearchOptions from 'src/app/models/searchOptions'
import { NetworkService } from '../../../services/network.service'

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
})
export class RoomsComponent implements OnInit {
  public currentWindowWidth: number = 0
  public rooms: Room[] = []
  public availableRooms: Room[] = []
  public errorMsg: string = ''

  @ViewChild('adult') adult: ElementRef = {} as ElementRef
  @ViewChild('kid') kid: ElementRef = {} as ElementRef
  @ViewChild('pickerOut') datePicker: MatDatepicker<Date> =
    {} as MatDatepicker<Date>
  @ViewChild('checkIn') checkIn: ElementRef = {} as ElementRef
  @ViewChild('checkOut') checkOut: ElementRef = {} as ElementRef

  constructor(
    private route: ActivatedRoute,
    private network: NetworkService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.currentWindowWidth = window.innerWidth
  }

  ngAfterViewInit() {
    this.route.queryParams.subscribe(params => {
      if (params['searchOptions'] != undefined) {
        let searchOptions: SearchOptions = JSON.parse(
          atob(params['searchOptions']),
        )
        console.log(this.checkIn.nativeElement.value)
  
        this.network.getAllRooms().then((allRooms: any) => {
          
          this.rooms = allRooms
          this.getAvailableRooms(searchOptions.checkIn!, searchOptions.checkOut!)
        })
  
        console.log(searchOptions)
        this.checkIn.nativeElement.value = searchOptions.checkIn
        this.checkOut.nativeElement.value = searchOptions.checkOut
        this.adult.nativeElement.value = searchOptions.adults
        this.kid.nativeElement.value = searchOptions.kids
      }
      else{
        this.network.getAllRooms().then((allRooms: any) => {
          console.log(allRooms)
          this.rooms = allRooms
          this.availableRooms = allRooms
         
        })
      }
      
    })
  }

  searchRooms() {
    let searchOptions: SearchOptions = {} //checkIn: this.checkIn.nativeElement.value, checkOut: this.checkOut.nativeElement.value, adults: +this.adult.nativeElement.value, kids: +this.kid.nativeElement.value

    let parts = this.checkIn.nativeElement.value.split('/')
    let dtCheckIn = new Date(
      parseInt(parts[2], 10),
      parseInt(parts[1], 10) - 1,
      parseInt(parts[0], 10),
    )

    parts = this.checkOut.nativeElement.value.split('/')
    let dtCheckOut = new Date(
      parseInt(parts[2], 10),
      parseInt(parts[1], 10) - 1,
      parseInt(parts[0], 10),
    )

    let checkIn: Date = dtCheckIn
    let checkOut: Date = dtCheckOut
    let adults: number = +this.adult.nativeElement.value
    let kids: number = +this.kid.nativeElement.value

    if (checkIn != null && checkOut != null && adults > 0) {
      let diff: number = checkOut.getTime() - checkIn.getTime()
      if (diff > 0) {
        this.errorMsg = ''
        searchOptions = {
          checkIn: this.checkIn.nativeElement.value,
          checkOut: this.checkOut.nativeElement.value,
          adults: adults,
          kids: kids,
        }
        this.network.getAllRooms().then((allRooms: any) => {
          console.log(allRooms)
          this.rooms = allRooms
          this.getAvailableRooms(searchOptions.checkIn!, searchOptions.checkOut!)
        })
      } else {
        this.errorMsg = 'choose an eligible date'
      }
    } else {
      this.errorMsg = 'Fill in all fields and/or have atleast 1 adult'
    }
  }

  getAvailableRooms(startDate: string, endDate: string, steps: number = 1) {
    this.availableRooms = []
    const currentDates = this.getAllDatesBewteen(startDate, endDate)
    let notAvailable: boolean = false

    this.rooms.forEach(element => {
   
      element.bookedDates?.forEach(date => {
        
        currentDates.forEach(currentDate => {
          let parts = date.split('/')
          let dtCheckIn = new Date(
            parseInt(parts[2], 10),
            parseInt(parts[1], 10) - 1,
            parseInt(parts[0], 10),
          )
         
          console.log(new Date(dtCheckIn))
          if (currentDate.getTime() == new Date(dtCheckIn).getTime()) {
            notAvailable = true
          }
        })
      })
      if (notAvailable == false) {
        this.availableRooms.push(element)
      }
      notAvailable = false
    })
    // @ts-ignore: Object is possibly 'null'.
    //console.log(this.availableRooms[0].roomServices[0].name)
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


  getLink(name: string) {
    let searchOptions: SearchOptions = {} //checkIn: this.checkIn.nativeElement.value, checkOut: this.checkOut.nativeElement.value, adults: +this.adult.nativeElement.value, kids: +this.kid.nativeElement.value

    let parts = this.checkIn.nativeElement.value.split('/')
    let dtCheckIn = new Date(
      parseInt(parts[2], 10),
      parseInt(parts[1], 10) - 1,
      parseInt(parts[0], 10),
    )

    parts = this.checkOut.nativeElement.value.split('/')
    let dtCheckOut = new Date(
      parseInt(parts[2], 10),
      parseInt(parts[1], 10) - 1,
      parseInt(parts[0], 10),
    )

    let checkIn: Date = dtCheckIn
    let checkOut: Date = dtCheckOut
    let adults: number = +this.adult.nativeElement.value
    let kids: number = +this.kid.nativeElement.value

    if (checkIn != null && checkOut != null && adults > 0) {
      let diff: number = checkOut.getTime() - checkIn.getTime()
      if (diff > 0) {
        this.errorMsg = ''
        searchOptions = {
          checkIn: this.checkIn.nativeElement.value,
          checkOut: this.checkOut.nativeElement.value,
          adults: adults,
          kids: kids,
        }
        console.log(checkIn, checkOut)
        this.router.navigateByUrl(
          `/roomDetail?searchOptions=${btoa(JSON.stringify(searchOptions))}&name=${name}`,
        )
      } else {
        this.router.navigateByUrl(
          `/roomDetail?name=${name}`,
        )
      }
    } else {
      this.errorMsg = 'Fill in all fields and/or have atleast 1 adult'
    }
  }

  

  upValue(type: string) {
    if (type == 'adult') {
      var amount: number = +this.adult.nativeElement.value

      this.adult.nativeElement.value = amount + 1
    } else if (type == 'kid') {
      var amount: number = +this.kid.nativeElement.value

      this.kid.nativeElement.value = amount + 1
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
    this.datePicker.open()
  }

  @HostListener('window:resize')
  onResize() {
    this.currentWindowWidth = window.innerWidth
    console.log('est')
  }
}
