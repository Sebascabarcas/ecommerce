import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Router } from '@angular/router';

@Injectable()
export class PurchaseService {

  private _baseUrl = "http://ec2-18-219-200-51.us-east-2.compute.amazonaws.com:5006/purchases"
  private _salesUrl = "http://ec2-18-219-200-51.us-east-2.compute.amazonaws.com:5006/user_sales"
  private _baseCreateUrl = "http://ec2-18-219-200-51.us-east-2.compute.amazonaws.com:5006/products"

  constructor(private http: HttpClient, private _auth: AuthService, private router: Router) { }

  getPurchases (): Observable<any[]> {
    var reqHeader = new HttpHeaders(this._auth.getHeader())
    return this.http.get<any>(this._baseUrl, {headers: reqHeader})
                .catch(this.errorHandler);
  }

  getSales (): Observable<any[]> {
    var reqHeader = new HttpHeaders(this._auth.getHeader())
    return this.http.get<any>(this._salesUrl, {headers: reqHeader})
                .catch(this.errorHandler);
  }
              
  getPurchase (purchaseId): Observable<any> {
    var reqHeader = new HttpHeaders(this._auth.getHeader())
    return this.http.get<any>(this._baseUrl + '/' + purchaseId, {headers: reqHeader})
                .catch(this.errorHandler);
  }
  
  finishAuction (productId): Observable<any> {
    var reqHeader = new HttpHeaders(this._auth.getHeader())
    return this.http.post<any>(this._baseCreateUrl + '/' + productId + '/auctions', {}, {headers: reqHeader})
    .catch(this.errorHandler);
  }
  
  createPurchase (purchase): Observable<any> {
    var reqHeader = new HttpHeaders(this._auth.getHeader())
    return this.http.post<any>(this._baseUrl, purchase, {headers: reqHeader})
    .catch(this.errorHandler);
  }
  
  updatePurchase (purchase): Observable<any> {
    var reqHeader = new HttpHeaders(this._auth.getHeader())
    return this.http.put<any>(this._baseUrl + '/' + purchase.id, purchase,  {headers: reqHeader})
                .catch(this.errorHandler);
  }

  setPurchaseDestination (productId, originId): Observable<any> {
    var reqHeader = new HttpHeaders(this._auth.getHeader())
    return this.http.put<any>(this._baseCreateUrl + '/' + productId + '/set_purchase_destination/' + originId, {}, {headers: reqHeader})
                .catch(this.errorHandler);
  }

  errorHandler(error: HttpErrorResponse) {
    let _router = this.router
    console.log(error.error)
    console.log(error.error.authentication)
    if (error.error.authentication) {
      if (error.error.authentication.includes("invalid token")) {
        localStorage.removeItem('auth')
        localStorage.removeItem('amount')
        localStorage.removeItem('cart')
        localStorage.removeItem('search')
        location.reload()
        // _router.navigate(['login'])
      }
      if (error.error.authentication.includes("user not found")) {
        localStorage.removeItem('auth')
        localStorage.removeItem('amount')
        localStorage.removeItem('cart')
        localStorage.removeItem('search')
        location.reload()
        // _router.navigate(['login'])
      }
    }
    console.log(error.message)
    return Observable.throw(error.message || "Server error")
  }

}
