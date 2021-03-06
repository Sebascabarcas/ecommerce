import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Product } from './product';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class ProductService {

  private _baseUrl = "http://ec2-18-219-200-51.us-east-2.compute.amazonaws.com:5006/products"
  private _searchUrl = "http://ec2-18-219-200-51.us-east-2.compute.amazonaws.com:5006/search"
  private _bidsUrl = "http://ec2-18-219-200-51.us-east-2.compute.amazonaws.com:5006/bids"
  private _productPhotoUrl = "http://ec2-18-219-200-51.us-east-2.compute.amazonaws.com:5006/product_picture"
  constructor(private http: HttpClient, private _auth: AuthService, private router: Router) { }
  
  getProducts (): Observable<Product[]> {
    return this.http.get<Product>(this._baseUrl)
                .catch(this.errorHandler);
  }
              
  getProduct (productId): Observable<Product> {
    return this.http.get<Product>(this._baseUrl + '/' + productId)
                .catch(this.errorHandler);
  }
  
  getProductComments (productId): Observable<any[]> {
    return this.http.get<any>(this._baseUrl + '/' + productId + '/comments')
                .catch(this.errorHandler);
  }

  getProductPhotos (productId): Observable<any[]> {
    var reqHeader = new HttpHeaders(this._auth.getHeader())
    return this.http.get<any>(this._baseUrl + '/' + productId + '/pictures', {headers: reqHeader})
    .catch(this.errorHandler);
  }
  
  deleteProduct (productId): Observable<Product> {
    var reqHeader = new HttpHeaders(this._auth.getHeader())
    return this.http.delete<Product>(this._baseUrl + '/' + productId, {headers: reqHeader})
                .catch(this.errorHandler);
  }
  
  search (search): Observable<any> {
    return this.http.post<any>(this._searchUrl, search)
    .catch(this.errorHandler);
  }
  
  createComment (comment, productId): Observable<any> {
    var reqHeader = new HttpHeaders(this._auth.getHeader())
    return this.http.post<any>(this._baseUrl + '/' + productId + '/comments', comment, {headers: reqHeader})
    .catch(this.errorHandler);
  }
  
  createProduct (product): Observable<Product> {
    var reqHeader = new HttpHeaders(this._auth.getHeader())
    return this.http.post<Product>(this._baseUrl, product, {headers: reqHeader})
    .catch(this.errorHandler);
  }
  
  updateProduct (product): Observable<Product> {
    var reqHeader = new HttpHeaders(this._auth.getHeader())
    return this.http.put<Product>(this._baseUrl + '/' + product.id, product,  {headers: reqHeader})
                .catch(this.errorHandler);
  }

  setCoverPhoto (photoId): Observable<any> {
    var reqHeader = new HttpHeaders(this._auth.getHeader())
    return this.http.put<any>(this._productPhotoUrl + '/' + photoId + '/set_cover', {}, {headers: reqHeader})
                .catch(this.errorHandler);
  }

  uploadPictures (productId, photos): Observable<any> {
    var reqHeader = new HttpHeaders(this._auth.getHeader())
    return this.http.put<any>(this._baseUrl + '/' + productId + '/upload_pictures', photos,  {headers: reqHeader})
                .catch(this.errorHandler);
  }

  deletePicture (photoId): Observable<any> {
    var reqHeader = new HttpHeaders(this._auth.getHeader())
    return this.http.delete<any>(this._productPhotoUrl + '/' + photoId,  {headers: reqHeader})
                .catch(this.errorHandler);
  }

  showBid(bidId) {
    return this.http.get<any>(this._bidsUrl + '/' + bidId)
    .catch(this.errorHandler);
  }
  
  getProductBids(productId) {
    return this.http.get<any>(this._baseUrl + '/' + productId + '/bids')
    .catch(this.errorHandler);
  }

  createBid (bid, productId) {
    var reqHeader = new HttpHeaders(this._auth.getHeader())
    return this.http.post<any>(this._baseUrl + '/' + productId + '/bids', bid, {headers: reqHeader})
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
    return Observable.throw(error || "Server error")
  }

}
