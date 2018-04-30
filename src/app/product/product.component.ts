import { Component, OnInit} from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { Location } from '@angular/common';
declare var jquery:any;
declare var noUiSlider:any;
declare var $ :any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products = []
  messages = []
  currentUserId = {}
  minRange = 1;
  maxRange = 10000000;
  someRange = [1,10000000]
  modalMessage = false
  category:any;
  keyword:any;

  constructor(private _product: ProductService, private _router: Router, private _cart: CartService, private location: Location) { }

  ngOnInit() {
    this.category = ""
    this.keyword = ""
    if (localStorage.getItem('auth')) {
      this.currentUserId = JSON.parse(localStorage.getItem('auth')).user_id
    }
    var globalThis = this
    if (localStorage.getItem('search')) {
      let search = JSON.parse(localStorage.getItem('search'))
      this.keyword = search.input
      if (search.category) {
        this.category = search.category
      }
      this._product.search(search).subscribe (
        res => {
          this.products = res.products
          localStorage.removeItem('search')
        },
        err => console.log(err)
      )      
    } else {
      this._product.getProducts()
        .subscribe(
          res => {
            console.log(res)
            this.products = res
            console.log(this.products)
          },
          err => console.log(err)
        )
    }
  }

  goToDetails(id) {
    this._router.navigate(['product/' + id])
  }

  onChange(e) {
    console.log("hola")
    this.minRange = e[0]
    this.maxRange = e[1]
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
    location.reload()
  }
  
  clearAllFilters() {
    localStorage.removeItem('search')
    location.reload()
  }

  addToCart(product, qty) {
    this._cart.addToCart(product, qty)
    this.messages.push("Added to the cart")
    this.modalMessage = true
  }

}
