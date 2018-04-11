import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  newUser = {}  

  constructor(private _auth: AuthService) { }

  ngOnInit() {
  }

  registerUser() {
    console.log(this.newUser)
    this._auth.registerUser(this.newUser)
      .subscribe(
        res => console.log(res),
        err => console.log(err)
      )
  }
}
