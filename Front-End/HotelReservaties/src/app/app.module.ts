import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HomeComponent } from './features/hotel/home/home.component'
import { RoomsComponent } from './features/hotel/rooms/rooms.component'
import { AboutComponent } from './features/hotel/about/about.component'
import { HeaderComponent } from './components/header/header.component'
import { SidenavListComponent } from './components/sidenav-list/sidenav-list.component'
import { LayoutModule } from '@angular/cdk/layout'

import { MatSidenavModule } from '@angular/material/sidenav'
import { MatCardModule } from '@angular/material/card'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core'
import { ContainerComponent } from './components/container/container.component'
import { LoginComponent } from './features/hotel/login/login.component'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { RegisterComponent } from './features/hotel/register/register.component'
import { UserComponent } from './features/hotel/user/user.component'
import { roomsDetailComponent } from './features/hotel/roomsDetail/roomsDetail.component'
import { AdminComponent } from './features/hotel/admin/admin.component'
import { OverlayModule } from '@angular/cdk/overlay'
import { OverlayComponent } from './components/overlay/overlay.component'
import { CommonModule } from '@angular/common'
import * as Sentry from '@sentry/angular'
import { Router, RouterModule } from '@angular/router'
import { IvyCarouselModule } from 'angular-responsive-carousel'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
/* Firebase services */
import { AngularFireModule } from '@angular/fire/compat'
import { AngularFireAuthModule } from '@angular/fire/compat/auth'
import { environment } from '../environments/environment'
import { ServiceWorkerModule } from '@angular/service-worker';
import { ForgotPasswordComponent } from './features/hotel/forgot-password/forgot-password.component'

Sentry.init({
  //dsn: "https://373941a4ffd24db3ae58e8005081a10d@o1066788.ingest.sentry.io/6059828" ,

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
})
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RoomsComponent,
    AboutComponent,
    HeaderComponent,
    SidenavListComponent,
    ContainerComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    roomsDetailComponent,
    AdminComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    OverlayModule,
    CommonModule,
    MatCardModule,
    IvyCarouselModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient],
      },
    }),
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),

    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    RouterModule.forRoot([]),
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler({
        showDialog: false,
      }),
    },
    {
      provide: Sentry.TraceService,
      deps: [Router],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => {},
      deps: [Sentry.TraceService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  entryComponents: [OverlayComponent],
})
export class AppModule {}

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http)
}
