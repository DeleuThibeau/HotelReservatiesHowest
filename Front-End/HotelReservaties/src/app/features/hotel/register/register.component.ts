import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import User from 'src/app/models/user'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { NetworkService } from '../../../services/network.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    public translate: TranslateService,
    private network: NetworkService,
    private angularFireAuth: AngularFireAuth,
    private router: Router,
  ) {}

  userModel: User = { name: '', email: '', password: '' }
  message: string = ''
  token: string = ''

  ngOnInit(): void {
    this.network.getCountry().then((countryData: any) => {
      let lang: string = countryData.countryCode
      if (lang == 'BE') lang = 'nl'
      this.translate.use(lang)
    })
  }

  register() {
    var name = this.userModel.name
    var email = this.userModel.email
    var password = this.userModel.password

    if (password && email && password) {
      this.network.createUser(name!, email!, password!)
      this.router.navigate(['/login'])
    } else {
      this.message = 'The creation of a user has failed!'
    }
  }
}
