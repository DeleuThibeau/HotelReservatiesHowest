import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AboutComponent } from './features/hotel/about/about.component'
import { AdminComponent } from './features/hotel/admin/admin.component'
import { ForgotPasswordComponent } from './features/hotel/forgot-password/forgot-password.component'
import { HomeComponent } from './features/hotel/home/home.component'
import { LoginComponent } from './features/hotel/login/login.component'
import { RegisterComponent } from './features/hotel/register/register.component'
import { RoomsComponent } from './features/hotel/rooms/rooms.component'
import { roomsDetailComponent } from './features/hotel/roomsDetail/roomsDetail.component'
import { UserComponent } from './features/hotel/user/user.component'

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'rooms', component: RoomsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user', component: UserComponent },
  { path: 'roomDetail', component: roomsDetailComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
