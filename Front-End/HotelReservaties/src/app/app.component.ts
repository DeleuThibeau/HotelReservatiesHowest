import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { TranslateService } from '@ngx-translate/core';  


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  
})
export class AppComponent {
  constructor(public translate: TranslateService) {  
    translate.addLangs(['en', 'nl']);  
    translate.setDefaultLang('en');
    //localStorage.clear()  
  }  
  title = 'HotelReservaties';
 
  
}
