import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = {}
  errors = {}
  messages = []
  modalMessage = false
  constructor(private _auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  loginUser(user) {
    if (user.account.includes("@")) {
      user.email = user.account
    } else {
      user.username = user.account
    }
    this._auth.loginUser(user)
      .subscribe(
        res => {
          let auth = {
            token: res.secret,
            user_id: res.user_id,
            username: user.username
          }
          localStorage.setItem('auth', JSON.stringify(auth))
          if (localStorage.getItem('checkout')) {
            if (localStorage.getItem('cart')) {
              if (Object.keys(JSON.parse(localStorage.getItem('cart'))).length != 0) {
                localStorage.removeItem('checkout')
                this.router.navigate(['/checkout'])
              }
            } 
          } else {
            this.router.navigate(['/shop'])
          }
        },
        err => {
          // console.log(err)
          this.openMessage(err)
        }
      )
  }

  openMessage(err) {
    // console.log(err)
    for (var key in err.error) {
      // console.log(key)
      this.messages.push(err.error[key])
    }
    this.modalMessage = true
  }

  closeMessage() {
    this.modalMessage = false
    this.messages = []
    // this.goBack()
  }


}
