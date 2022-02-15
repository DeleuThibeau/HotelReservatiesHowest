import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import { NetworkService } from '../../../services/network.service'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import User from '../../../models/user'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    public translate: TranslateService,
    private network: NetworkService,
    private angularFireAuth: AngularFireAuth,
    private router: Router,
  ) {}

  userModel: User = {}
  message = ''
  token = ''

  ngOnInit(): void {
    this.network.getCountry().then((countryData: any) => {
      let lang: string = countryData.countryCode
      if (lang == 'BE') lang = 'nl'
      this.translate.use(lang)
    })
  }

  loginForm = new FormGroup({
    user: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.nullValidator,
    ]),
  })

  get email() {
    return this.loginForm.get('email')
  }
  get password() {
    return this.loginForm.get('password')
  }

  signIn() {
    var email = this.userModel.email
    var password = this.userModel.password
    this.angularFireAuth
      .signInWithEmailAndPassword(email!, password!)
      .then(object => {
        this.tokenExtractor(object)
      })
      .then(() => {
        console.log(email)
        console.log(this.token)
        localStorage.setItem('token', this.token)
        this.network.getSingleUser(email!, this.token).then((user: any) => {
          console.log(user.type)
          localStorage.setItem('user',JSON.stringify(user))
          if (user.type == 'admin') {
            this.router.navigate(['/admin'])
          } else {
            this.router.navigate(['/user'])
          }
        })
      })
      .catch(error => {
        console.log(error)
        this.message = 'The user or password incorrect!'
      })
  }

  tokenExtractor(object: any) {
    var userObject = object.user
    var userString = JSON.stringify(userObject)
    var stringArray = userString?.split(',')
    var jsonToken = stringArray[12].split(':')
    var rawToken = jsonToken[1]
    var usableToken = rawToken.substring(1, rawToken.length - 1)
    this.token = usableToken
  }
}
