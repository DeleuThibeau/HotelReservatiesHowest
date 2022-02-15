import {
  Component,
  HostListener,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core'
import { Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import { NetworkService } from 'src/app/services/network.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public currentWindowWidth: number = 0
  public userImg = ""
  @Output() SideNavigationToggle = new EventEmitter()

  constructor(
    public translate: TranslateService,
    private network: NetworkService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentWindowWidth = window.innerWidth
    this.network.getCountry().then((countryData: any) => {
      let lang: string = countryData.countryCode
      if (lang == 'BE') lang = 'nl'
      this.translate.use(lang)
    })
  }

  openSidenav() {
    this.SideNavigationToggle.emit()
  }

  @HostListener('window:resize')
  onResize() {
    this.currentWindowWidth = window.innerWidth
  }

  login()
  {
   
    let user: any = JSON.parse(localStorage.getItem('user')!)
    
    if (user != null) {
      if (user.type == "admin") {
        this.router.navigateByUrl(
          `/admin`,
        )
      } else if (user.type == "user")
      {
        this.router.navigateByUrl(
          `/user`,
        )
      }
    }
    else{
      this.router.navigateByUrl(
        `/login`,
      )
    }
  }
}
