import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { AuthService } from '../auth.service';
import { Location } from '@angular/common';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    userInfo:any;
    productsCart = []
    amount = {}
    messages = []
    modalMessage = false
    logged = false
    search:any;
   constructor(private router: Router, private _cart: CartService, private _auth: AuthService, private location: Location){
      // System.import('path/to/your/module').then(refToLoadedModule => {
        // refToLoadedModule.someFunction();
      // }
    // );
  }

  ngOnInit() {
    this.search = {category: ''}
    this.productsCart = JSON.parse(localStorage.getItem('cart')) || []
    this.amount = JSON.parse(localStorage.getItem('amount')) || {}
    this.userInfo = JSON.parse(localStorage.getItem('auth')) || {}
    if  (Object.keys(this.userInfo).length != 0) {
      this.logged = true;
    }

    if ((!this.userInfo.username || !this.userInfo.profilePhoto) && Object.keys(this.userInfo).length != 0 ) {
      console.log("HOLA")
      this._auth.showUser(this.userInfo.user_id).subscribe (
        res => {
          this.userInfo.username = res.user.username
          localStorage.setItem('role', JSON.stringify({role: res.user.role}))
          if (!this.userInfo.profilePhoto && res.user.picture) {
            this.userInfo.profilePhoto = res.user.picture.url
          }
          localStorage.removeItem('auth')
          localStorage.setItem('auth', JSON.stringify(this.userInfo))
        },
        err => console.log(err)
      )
    }

    if (Object.keys(this.userInfo).length == 0) {
      localStorage.setItem('role', JSON.stringify({role: 'guess'}))
    }

    console.log(this.logged)
    var responsiveNav = $('#responsive-nav'),
    catToggle = $('#responsive-nav .category-nav .category-header'),
    catList = $('#responsive-nav .category-nav .category-list'),
    // menuToggle = $('#responsive-nav .menu-nav .menu-header'),
    menuList = $('#responsive-nav .menu-nav .menu-list');
    catToggle.on('click', function() {
      menuList.removeClass('open');
      catList.toggleClass('open');
    });
  
    // menuToggle.on('click', function() {
    //   catList.removeClass('open');
    //   menuList.toggleClass('open');
    // });
  }

  searchProducts () {
    if (Object.keys(this.search).length != 0) {
      if (this.search.category == '') {
        // console.log("aqui")
        this.search = {input: this.search.input}
      }
      console.log(this.search)
      if (!this.search.input) {
        this.search = {input: this.search.category}
      }
      
      localStorage.setItem('search', JSON.stringify(this.search))
      location.reload()
    }
  }

  logOut() {
    this._auth.logOut().subscribe(
     res =>{  
      console.log(res)
      localStorage.removeItem('auth')
      this.router.navigate(['login'])
     },
     err => console.log(err)
    )
  }

  goToCheckout() {
    if (Object.keys(this.userInfo).length != 0) {
      this.router.navigate(['checkout'])
    } else {
      localStorage.setItem('checkout', JSON.stringify({}))
      this.router.navigate(['login'])
    }
  }

 
  deleteCart() {
    this._cart.deleteCart()
    this.messages.push("Cart deleted")
    this.modalMessage = true
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
    location.reload()
  }

  removeFromCart(i) {
    console.log("Eche aja")
    this.messages.push("Product deleted")
    this.modalMessage = true
    this._cart.removeFromCart(i)
  }
}
