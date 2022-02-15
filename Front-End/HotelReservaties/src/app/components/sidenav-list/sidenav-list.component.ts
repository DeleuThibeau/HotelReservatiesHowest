import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import { NetworkService } from 'src/app/services/network.service'

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {

  @Output() SideNavigationToggle = new EventEmitter();

  constructor(public translate: TranslateService,
    private network: NetworkService,
    private router: Router) { }

  openSidenav() {
    this.SideNavigationToggle.emit();
  }

  ngOnInit(): void {
  }

  login()
  {
    this.SideNavigationToggle.emit();
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
