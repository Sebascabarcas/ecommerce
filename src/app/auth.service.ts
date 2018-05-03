import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Router } from '@angular/router';
 
@Injectable()
export class AuthService {

  private _baseUrl = "http://ec2-18-219-200-51.us-east-2.compute.amazonaws.com:5006/users"
  private _baseProductUrl = "http://ec2-18-219-200-51.us-east-2.compute.amazonaws.com:5006/products"
  private _sessionUrl = "http://ec2-18-219-200-51.us-east-2.compute.amazonaws.com:5006/sessions"
  private _baseSalesUrl = "http://ec2-18-219-200-51.us-east-2.compute.amazonaws.com:5006/user_sales"
  private _buyerScoreUrl = "http://ec2-18-219-200-51.us-east-2.compute.amazonaws.com:5006/buyer_score"
  private _sellerScoreUrl = "http://ec2-18-219-200-51.us-east-2.compute.amazonaws.com:5006/seller_score"
  private _userBuyerScoreUrl = "http://ec2-18-219-200-51.us-east-2.compute.amazonaws.com:5006/user_buyer_score"
  private _userSellerScoreUrl = "http://ec2-18-219-200-51.us-east-2.compute.amazonaws.com:5006/user_seller_score"
  private _shippedUrl = "http://ec2-18-219-200-51.us-east-2.compute.amazonaws.com:5006/purchase_shipped"
  private _deliveredUrl = "http://ec2-18-219-200-51.us-east-2.compute.amazonaws.com:5006/purchase_delivered"
  private _bidUrl = "http://ec2-18-219-200-51.us-east-2.compute.amazonaws.com:5006/user_bids"
  private _profilePhotoUrl = "http://ec2-18-219-200-51.us-east-2.compute.amazonaws.com:5006/profile_pictures"
  private _pendingActionsUrl = "http://ec2-18-219-200-51.us-east-2.compute.amazonaws.com:5006/pending_actions"


  constructor(private http: HttpClient, private router: Router) { }

  registerUser (user) {
    return this.http.post<any>(this._baseUrl, user)
    .catch(this.errorHandler);
  }
  
  loginUser (user) {
    return this.http.post<any>(this._sessionUrl, user)
    .catch(this.errorHandler);
  }
  
  logOut () {
    var reqHeader = new HttpHeaders(this.getHeader())
    return this.http.delete<any>(this._sessionUrl, {headers: reqHeader})
    .catch(this.errorHandler);
  }
  
  getUsers() {
    return this.http.get<any>(this._baseUrl + '/')
    .catch(this.errorHandler);
  }
  
  
  showUser(userId) {
    return this.http.get<any>(this._baseUrl + '/' + userId)
    .catch(this.errorHandler);
  }
  
  showUserBids() {
    var reqHeader = new HttpHeaders(this.getHeader())
    return this.http.get<any>(this._bidUrl, {headers: reqHeader})
    .catch(this.errorHandler);
  }

  updateUser (user) {
    var reqHeader = new HttpHeaders(this.getHeader())
    return this.http.put<any>(this._baseUrl + '/' + user.userId, user, {headers: reqHeader})
    .catch(this.errorHandler);
  }
  
  updateUserProfilePhoto (photo) {
    var reqHeader = new HttpHeaders(this.getHeader())
    return this.http.put<any>(this._profilePhotoUrl, photo, {headers: reqHeader})
    .catch(this.errorHandler);
  }

  setBuyerScore (score, purchaseId): Observable<any> {
    var reqHeader = new HttpHeaders(this.getHeader())
    return this.http.put<any>(this._buyerScoreUrl + '/' + purchaseId, score, {headers: reqHeader})
    .catch(this.errorHandler);
  }

  setSellerScore (score, saleId): Observable<any> {
    var reqHeader = new HttpHeaders(this.getHeader())
    return this.http.put<any>(this._sellerScoreUrl + '/' + saleId, score, {headers: reqHeader})
    .catch(this.errorHandler);
  }

  getBuyerScore (userId): Observable<any> {
    return this.http.get<any>(this._userBuyerScoreUrl + '/' + userId)
    .catch(this.errorHandler);
  }

  getSellerScore (userId): Observable<any> {
    return this.http.get<any>(this._userSellerScoreUrl + '/' + userId)
    .catch(this.errorHandler);
  }
  
  setShipped (saleId): Observable<any> {
    var reqHeader = new HttpHeaders(this.getHeader())
    return this.http.put<any>(this._shippedUrl + '/' + saleId, {}, {headers: reqHeader})
    .catch(this.errorHandler);
  }
  
  setDelivered (purchaseId): Observable<any> {
    var reqHeader = new HttpHeaders(this.getHeader())
    return this.http.put<any>(this._deliveredUrl + '/' + purchaseId, {}, {headers: reqHeader})
    .catch(this.errorHandler);
  }
  
  pendingActions (): Observable<any> {
    var reqHeader = new HttpHeaders(this.getHeader())
    return this.http.get<any>(this._pendingActionsUrl, {headers: reqHeader})
    .catch(this.errorHandler);
  }

  getBlockUsers (): Observable<any> {
    var reqHeader = new HttpHeaders(this.getHeader())
    return this.http.get<any>(this._baseUrl + '/blocks/admin', {headers: reqHeader})
    .catch(this.errorHandler);
  }

  blockUser (userId): Observable<any> {
    var reqHeader = new HttpHeaders(this.getHeader())
    return this.http.put<any>(this._baseUrl + '/' + userId + '/block', {}, {headers: reqHeader})
    .catch(this.errorHandler);
  }

  unblockUser (userId): Observable<any> {
    var reqHeader = new HttpHeaders(this.getHeader())
    return this.http.put<any>(this._baseUrl + '/' + userId + '/unblock', {}, {headers: reqHeader})
    .catch(this.errorHandler);
  }

  blockProduct (productId): Observable<any> {
    var reqHeader = new HttpHeaders(this.getHeader())
    return this.http.put<any>(this._baseProductUrl + '/' + productId + '/block', {}, {headers: reqHeader})
    .catch(this.errorHandler);
  }

  unblockProduct (productId): Observable<any> {
    var reqHeader = new HttpHeaders(this.getHeader())
    return this.http.put<any>(this._baseProductUrl + '/' + productId + '/unblock', {}, {headers: reqHeader})
    .catch(this.errorHandler);
  }

  loggedIn() {
    return !!localStorage.getItem('auth')
  }


  getToken() {
    let auth = JSON.parse(localStorage.getItem('auth'))
    return auth.token
  }
  
  getHeader() {
    return {'Authorization': 'Token token='+this.getToken()}
  }

  getUserSales (): Observable<any[]> {
    var reqHeader = new HttpHeaders(this.getHeader())
    return this.http.get<any>(this._baseSalesUrl, {headers: reqHeader})
                .catch(this.errorHandler);
  }

  errorHandler(error: HttpErrorResponse) {
    let _router = this.router
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
    // console.log(error.statusText)
    // console.log(error.headers)
    // console.log(error.name)
    // console.log(error.status)
    // console.log(error.type)
    // console.log(error.url)
    return Observable.throw(error || "Server error")
  }
}
