import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { OriginService } from '../origin.service';
import { BarRatingModule } from 'ngx-bar-rating';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  @ViewChild('fileInput') fileInput;
  product:any;
  origins = []
  destiny:any;
  initial = false
  image = false
  url = []
  stars = 5
  constructor(private _product: ProductService, private _origin: OriginService, private router: Router) { }

  ngOnInit() {
    this.product = {}
    this._origin.getOrigins()
      .subscribe(
        res => {
          console.log(res)
          this.origins = res
          console.log(this.origins)
          if (this.origins.length > 0) {
            this.destiny = this.origins[0].id
          } else {
            this.initial = true;
          }
          console.log(this.destiny)
        },
        err => console.log(err)
      )
    }

  createProduct() {
    this.product.origin_id = this.destiny
    this._product.createProduct(this.product).subscribe(
      res => {
        console.log(res)
        this.router.navigate(['my-products'])
      },
      err => console.log(err)
    )
    console.log(this.product)
  }

  onSelectFile(event, i) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      
      reader.onload = (event:any) => { // called once readAsDataURL is completed
        this.image = true
        this.url[i] = event.target.result;
        if (i == 0) {
          this.product.cover = event.target.result;
        } else {
          if (i==1) {
            this.product.image1 = event.target.result;
          } else {
            if (i==2) {
              this.product.image2 = event.target.result;
            } else {
                this.product.image3 = event.target.result;
            }
          }
        }
        console.log(this.url[i])
      }
    }
  }
}
