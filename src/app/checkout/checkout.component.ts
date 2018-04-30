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

  constructor(private _cart: CartService, private _purchase: PurchaseService, private _origin: OriginService, private router: Router) { }

  ngOnInit() {
    console.log(this._cart)
    console.log(this._purchase)
    this.products = JSON.parse(localStorage.getItem('cart'))
    this.amount = JSON.parse(localStorage.getItem('amount'))
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
  
  placeOrder(){ 
    // console.log(this._purchase)
    // var purchaseService = this._purchase
    var destinyFinal = this.destiny
    var cart = {} 
    this.products.forEach( function(product, index){
        console.log(product)
        console.log(index)
        cart["product"+index] = JSON.stringify({
          product_id: product.id,
          destiny: destinyFinal,
          quantity: product.quantity
        })
        console.log(cart)
    })
    this._purchase.createPurchase(cart).subscribe(
      res => {{
        setTimeout(() => {
        this._cart.deleteCart()
        this.router.navigate(['my-purchases'])
        }, 1000);}
      },
      err => {
        this.openMessage(err)
      }
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
  }

  removeFromCart(i) {
    this._cart.removeFromCart(i)
  }
  
}