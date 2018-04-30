import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  // @Input() product:Product;
  product = {}
  messages = []
  modalMessage = false
  constructor(private _product: ProductService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    let id = parseInt(this.route.snapshot.paramMap.get('id'))
    this._product.getProduct(id)
      .subscribe(
        res => {
          console.log(res)
          this.product = res
          console.log(this.product)
        },
        err => console.log(err)
      )
  }

  openMessage(err) {
    for (var key in err.error) {
      console.log(key)
      this.messages.push(err.error[key])
    }
    this.modalMessage = true
  }

  closeMessage() {
    this.modalMessage = false
    this.messages = []
    this.goBack()
  }

  updateProduct() {
    console.log(this.product)
    this._product.updateProduct(this.product)
    .subscribe(
      res => {
        console.log(res)
        this.product = res
        console.log(this.product)
      },
      err => {
        console.log(err)
        this.openMessage(err)
      }
    )
  }

  goBack(){
    this.router.navigate(['my-products'])
  }
}
