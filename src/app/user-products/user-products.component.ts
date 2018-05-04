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
  // coverPhotoId = []
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
          this.products = res.product
          for(var k in this.products) {
            if (!this.products[k].cover && this.products[k].product_picture.length > 0) {
              this.setCoverPhoto(this.products[k].product_picture[0].id)
            }
          }
        },
        err => console.log(err)
      )

    
  }

  onSelectFile(product, event, i, pictureId) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event:any) => { // called once readAsDataURL is completed
        this.url[i] = event.target.result;
        console.log(pictureId)
        if (i == 0) {
          if (product.product_picture[0]) {
            this.deletePhoto(pictureId)
          }
          // this.uploadCoverPhoto(productId, this.url[i])
          this.uploadPhotos(product.id, {cover: this.url[i]})
        } else {
          if (i==1) {
            if (product.product_picture[1]) {
              this.deletePhoto(pictureId)
            }
            this.uploadPhotos(product.id, {image1: this.url[i]})
            // this.product.image1 = event.target.result;
          } else {
            if (i==2) {
              if (product.product_picture[2]) {
                this.deletePhoto(pictureId)
              }
              this.uploadPhotos(product.id, {image2: this.url[i]})
              // this.product.image2 = event.target.result;
            } else {
                if (product.product_picture[3]) {
                  this.deletePhoto(pictureId)
                }
                this.uploadPhotos(product.id, {image3: this.url[i]})
                // this.product.image3 = event.target.result;
            }
          }
        }
        // 
      }
    }
  }

  goToAddProduct() {
    this.router.navigate(['product-add'])
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

  setCoverPhoto(photoId) {
    console.log("aqui")
    this._product.setCoverPhoto(photoId).subscribe (
      res => {
        location.reload()
      },
      err => console.log(err)
    )
  }

  closeMessage() {
    this.messages = []
    this.modalMessage = false
    location.reload()
  }

  openMessageErr(err) {
    for (var key in err.error) {
      this.messages.push(err.error[key])
    }
    this.modalMessage = true
  }

  openMessage(str) {
    this.messages.push(str)
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

  uploadPhotos(productId, photo) {
    this._product.uploadPictures(productId, photo).subscribe (
      res => {
        location.reload()
      },
      err => console.log(err)
    )
  }

  deletePhoto(photoId) {
    this._product.deletePicture(photoId).subscribe (
      res => {
        this.openMessage("Photo deleted succesfully")
      },
      err => {
        this.openMessageErr(err)
        // this.modalMessage = true
      }
    )
  }

  deletePhotoIcon(photoId) {
    this._product.deletePicture(photoId).subscribe (
      res => {
        this.openMessage("Photo deleted succesfully")
      },
      err => {
        this.openMessageErr(err)
      }
    )
  }
  

}
