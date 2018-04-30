import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../product.service';
import { Router} from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-products',
  templateUrl: './user-products.component.html',
  styleUrls: ['./user-products.component.scss']
})
export class UserProductsComponent implements OnInit {
  
  @ViewChild('fileInput') fileInput;
  currentProductId:any;
  products = []
  origins = []
  url = []
  coverPhoto = []
  file:any;
  modalDelete = false
  messages = [];
  modalMessage = false
  cover_photo = {image: ''}
  userInfo:any;
  textModalDelete = "You will delete this product, are you sure?"
  textProductDeleted = "Your product was deleted successfully"
  constructor(private _product: ProductService, private _auth: AuthService, private router: Router, private location: Location) { }
  
  ngOnInit() {
    this.userInfo = JSON.parse(localStorage.getItem('auth'))
    this._auth.showUser(this.userInfo.user_id)
      .subscribe(
        res => {
          console.log(res)
          this.products = res.product
          // this.origins = res.product.origin
          console.log(this.products)
        },
        err => console.log(err)
      )

      
    
  }

  onSelectFile(productId, event, i) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event:any) => { // called once readAsDataURL is completed
        this.url[i] = event.target.result;
        this.uploadCoverPhoto(productId, this.url[i])
      }
    }
  }

  goToEditProduct(productId) {
    this.router.navigate(['my-products/'+productId])
  }
  
  goToProductBids(productId){
    this.router.navigate(['my-product/'+productId+'/bids'])
  }

  // openModalDelete(doFunction: any){
  openModalDelete(productId){
    this.messages = []
    this.modalDelete = true
    this.currentProductId = productId
    // doFunction.make ? this.deleteProduct(doFunction.productId) : console.log("Hola")
    // this.modalDelete = false
  }

  closeMessage() {
    this.modalMessage = false
    location.reload()
  }

  openMessage(err) {
    for (var key in err.error) {
      console.log(key)
      this.messages.push(err.error[key])
    }
    this.modalMessage = true
  }

  doFunctione(doAction) {
    // console.log(this.textModalDelete)
    this.modalDelete = false
    doAction ? this.deleteProduct(this.currentProductId) : this.modalDelete = false
    
  }

  deleteProduct(productId) {
    this._product.deleteProduct(productId).subscribe(
      res => {
        this.messages.push(this.textProductDeleted)
        this.modalMessage = true
      },
      err => {
        this.openMessage(err)
      }
    )
  }

  uploadCoverPhoto(productId, photo) {
    this._product.updateCoverPhoto(productId, {image: photo}).subscribe (
      res => console.log(res),
      err => console.log(err)
    )
  }
  

}
