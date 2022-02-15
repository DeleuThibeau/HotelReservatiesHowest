import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core'
import { MatDatepicker } from '@angular/material/datepicker'
import SearchOptions from 'src/app/models/searchOptions'
import { Router } from '@angular/router'
import { NetworkService } from '../../../services/network.service'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public currentWindowWidth: number = 0
  public amount: number = 0
  public errorMsg: string = ''

  @ViewChild('adult') adult: ElementRef = {} as ElementRef
  @ViewChild('kid') kid: ElementRef = {} as ElementRef
  @ViewChild('pickerOut') datePickerOut: MatDatepicker<Date> =
    {} as MatDatepicker<Date>
  @ViewChild('checkIn') checkIn: ElementRef = {} as ElementRef
  @ViewChild('checkOut') checkOut: ElementRef = {} as ElementRef

  constructor(
    private router: Router,
    private network: NetworkService,
    public translate: TranslateService,
  ) {}

  ngOnInit(): void {
    this.currentWindowWidth = window.innerWidth
    this.network.getCountry().then((countryData: any) => {
      let lang: string = countryData.countryCode
      if (lang == 'BE') lang = 'nl'
      this.translate.use(lang)
    })
  }

  getLink() {
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
          `/rooms?searchOptions=${btoa(JSON.stringify(searchOptions))}`,
        )
      } else {
        this.errorMsg = 'choose an eligible date'
      }
    } else {
      this.errorMsg = 'Fill in all fields and/or have atleast 1 adult'
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
  }

  @HostListener('window:resize')
  onResize() {
    this.currentWindowWidth = window.innerWidth
    console.log('est')
  }
}
