import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { OriginService } from '../origin.service';
import { FormControl } from '@angular/forms';
import { PurchaseService } from '../purchase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  
  products = []
  origins = []
  messages = []
  initial = false;
  modalMessage = false;
  destiny:any;
  amount:any;
  userInfo:any;

  constructor(private _cart: CartService, private _purchase: PurchaseService, private _origin: OriginService, private router: Router) { }

  ngOnInit() {
    this.userInfo = JSON.parse(localStorage.getItem('auth'))
    if (localStorage.getItem('cart')) {
      this.products = JSON.parse(localStorage.getItem('cart'))
    } else {
      this.router.navigate(['shop'])
    }
    for(var k in this.products) {
      if (this.products[k].user.id == this.userInfo.user_id) {
        localStorage.removeItem('cart')
        this.messages = []
        this.openMessage("You are trying to buy a product that is yours")
      }
    }
    this.amount = JSON.parse(localStorage.getItem('amount'))
    this._origin.getOrigins()
    .subscribe(
      res => {
        this.origins = res
        if (this.origins.length > 0) {
          this.destiny = this.origins[0].id
        } else {
          this.initial = true;
        }
      },
      err => console.log(err)
    )
  }
  
  placeOrder(){ 
    // console.log(this._purchase)
    // var purchaseService = this._purchase
    var destinyFinal = this.destiny
    var cart = {} 
    this.products.forEach( function(product, index){
        cart["product"+index] = JSON.stringify({
          product_id: product.id,
          destiny: destinyFinal,
          quantity: product.quantity
        })
    })
    this._purchase.createPurchase(cart).subscribe(
      res => {{
        setTimeout(() => {
        this._cart.deleteCart()
        this.router.navigate(['my-purchases'])
        }, 1000);}
      },
      err => {
        this.openMessageErr(err)
      }
    ) 

  }

  openMessageErr(err) {
    for (var key in err.error) {
      console.log(key)
      this.messages.push(err.error[key])
    }
    this.modalMessage = true
  }

  openMessage(str) {
    this.messages.push(str)
    this.modalMessage = true
  }

  closeMessage() {
    this.messages = []
    this.modalMessage = false
    location.reload()
  }

  removeFromCart(i) {
    this._cart.removeFromCart(i)
  }
  
}