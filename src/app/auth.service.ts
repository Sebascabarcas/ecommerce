import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
 
@Injectable()
export class AuthService {

  private _registerUrl = "http://ec2-18-219-200-51.us-east-2.compute.amazonaws.com:5006/users"
  private _loginUrl = "http://ec2-18-219-200-51.us-east-2.compute.amazonaws.com:5006/sessions"
  constructor(private http: HttpClient) { }

  registerUser (user) {
    return this.http.post<any>(this._registerUrl, user)
  }

  loginUser (user) {
    return this.http.post<any>(this._loginUrl, user)
  }

  loggedIn() {
    return !!localStorage.getItem('token')
  }
}
