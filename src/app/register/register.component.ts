import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from "../auth.service";
import { NavbarComponent } from '../navbar/navbar.component';
import { EmailValidator, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @ViewChild('fileInput') fileInput;
  newUser = {gender: 'other', image: '', name:'', username:'', password:'', email: '',birthdate: '', company: false}  
  errors = {}
  url = ''
  image = false

  constructor(private _auth: AuthService, private router: Router) { }

  ngOnInit() {
    // FormControl.
    // this.errors= errors  
  }

  registerUser() {
    console.log(this.newUser)
    this._auth.registerUser(this.newUser)
      .subscribe(
        res => {
          console.log(res)
        },
        err => {console.log("El error ",  err.error.errors.email[0])
        this.errors = err.error.errors
        }
      )
  }
  
  onSelectFile(event, i) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      
      reader.onload = (event:any) => { // called once readAsDataURL is completed
        this.url = event.target.result;
        this.newUser.image = this.url
        this.image = true
      }
    }
  }
}
