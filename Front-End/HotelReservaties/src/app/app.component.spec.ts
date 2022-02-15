import { HttpClient } from '@angular/common/http'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { AngularFireModule } from '@angular/fire/compat'
import { FormsModule } from '@angular/forms'
import { RouterTestingModule } from '@angular/router/testing'
import { TranslateModule } from '@ngx-translate/core'
import { environment } from 'src/environments/environment'
import { AppComponent } from './app.component'
import { RegisterComponent } from './features/hotel/register/register.component'
import { NetworkService } from './services/network.service'

describe('AppComponent', () => {
  let registerUser: any
  let network: NetworkService

  beforeEach(async () => {
    registerUser = {
      name: 'Martijn',
      email: 'Martijn@Howest.be',
      password: 'Martijn123',
    }

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot(),
        HttpClientTestingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        RouterTestingModule,
        FormsModule,
      ],
      declarations: [AppComponent, RegisterComponent],
      providers: [{ provide: NetworkService, useValue: registerUser }],
    }).compileComponents()
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })

  it(`should have as title 'HotelReservaties'`, () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app.title).toEqual('HotelReservaties')
  })

  it(`Test to see register form values can be changed and if they are empty`, () => {
    const fixture = TestBed.createComponent(RegisterComponent)
    const app = fixture.componentInstance

    expect(app.userModel.name).toEqual('')
    expect(app.userModel.email).toEqual('')
    expect(app.userModel.password).toEqual('')

    app.userModel.name = registerUser.name
    app.userModel.email = registerUser.email
    app.userModel.password = registerUser.password
    expect(app.userModel.name).toEqual('Martijn')
    expect(app.userModel.email).toEqual('Martijn@Howest.be')
    expect(app.userModel.password).toEqual('Martijn123')
  })
})
