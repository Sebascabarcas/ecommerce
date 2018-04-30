import { Injectable } from '@angular/core';

@Injectable()
export class CartService {

  constructor() { }

  addToCart(product, qty) {
    product.quantity = qty
    console.log(product)
    console.log(qty)
    let cart = JSON.parse(localStorage.getItem('cart')) || []
    let amount = JSON.parse(localStorage.getItem('amount')) || {total: '0'}
    amount.total = parseInt(amount.total) + (product.price * qty)
    if(!cart.some(function(currentProduct, index, originalCart) {
      if (currentProduct.id == product.id) {
        cart[index].quantity = parseInt(cart[index].quantity) + parseInt(qty)
        return true 
      }
    })){
      cart.push(product)
      // console.log("papi quantity + 1")
    }
    // else {
    // }
    
    localStorage.setItem('cart', JSON.stringify(cart))
    localStorage.setItem('amount', JSON.stringify(amount))
  }

  removeFromCart(i) {
    let amount = JSON.parse(localStorage.getItem('amount'))
    let products = JSON.parse(localStorage.getItem('cart'))
    let productPrice = products[i].price
    if (products[i].quantity == "1") {
      products.splice(i,1)
    } else {
      products[i].quantity = parseInt(products[i].quantity) - 1
    }
    amount.total = parseInt(amount.total) - productPrice
    localStorage.removeItem('cart')
    localStorage.removeItem('amount')
    localStorage.setItem('cart', JSON.stringify(products))  
    localStorage.setItem('amount', JSON.stringify(amount))  
  }

  deleteCart(){
    localStorage.removeItem('cart')
    localStorage.removeItem('amount')
  }

}
