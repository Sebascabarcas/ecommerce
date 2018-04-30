import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { AuthService } from './auth.service';

@Injectable()
export class OriginService {

  private _originsUrl = "http://ec2-18-219-200-51.us-east-2.compute.amazonaws.com:5006/origins"

  constructor(private http: HttpClient, private _auth: AuthService) { }

  showOrigin(originId) {
    var reqHeader = new HttpHeaders(this._auth.getHeader())
    return this.http.get<any>(this._originsUrl + '/' + originId, {headers: reqHeader})
    .catch(this.errorHandler);
  }
  
  getOrigins() {
    var reqHeader = new HttpHeaders(this._auth.getHeader())
    return this.http.get<any>(this._originsUrl, {headers: reqHeader})
    .catch(this.errorHandler);
  }

  createOrigin (origin) {
    var reqHeader = new HttpHeaders(this._auth.getHeader())
    return this.http.post<any>(this._originsUrl, origin, {headers: reqHeader})
    .catch(this.errorHandler);
  }

  updateOrigin (origin) {
    var reqHeader = new HttpHeaders(this._auth.getHeader())
    return this.http.put<any>(this._originsUrl + '/' + origin.userId, origin, {headers: reqHeader})
    .catch(this.errorHandler);
  }

  deleteOrigin (originId) {
    var reqHeader = new HttpHeaders(this._auth.getHeader())
    return this.http.delete<any>(this._originsUrl + '/' + originId, {headers: reqHeader})
    .catch(this.errorHandler);
  }

  errorHandler(error: HttpErrorResponse) {
    console.log(error.message)
    return Observable.throw(error || "Server error")
  }
}
