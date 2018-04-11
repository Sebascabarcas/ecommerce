import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = {}
  constructor(private _auth: AuthService) { }

  ngOnInit() {
  }

  loginUser(user) {
    console.log(user)
    if (user.account.includes("@")) {
      user.email = user.account
    } else {
      user.username = user.account
    }
    console.log(user)
    this._auth.loginUser(user)
      .subscribe(
        res => {
          console.log(res)
          localStorage.setItem('token', res.secret)
        },
        err => console.log(err)
      )
  }

}
