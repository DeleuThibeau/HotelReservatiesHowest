import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import User from 'src/app/models/user'
import { NetworkService } from '../../../services/network.service'

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  constructor(
    public translate: TranslateService,
    private network: NetworkService,
    private router: Router,
  ) {}

  userModel: User = { name: '', email: '', password: '' }
  errorMessage: string = ''
  passwordMessage: string = ''
  token: string = ''

  ngOnInit(): void {}

  getPassword() {
    var email = this.userModel.email

    if (email) {
      console.log(email)
      this.network.getForgotPasswordUser(email).then((user: any) => {
        console.log(user)
        this.passwordMessage = `Your password is ${user.password}`
      })
    } else {
      this.errorMessage = 'Fill in an e-mail to get your password!'
    }
  }
}
