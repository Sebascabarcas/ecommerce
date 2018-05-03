import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../cart.service';
import { AuthService } from '../auth.service';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  qty:any;
  bid:any;
  product:any;
  modalMessage = false
  messages = []
  comments = []
  newComment = {}
  currentUserId:any;
  userInfo:any;
  role:any;
  
  constructor(private route: ActivatedRoute, private router: Router, private _product: ProductService, private _cart: CartService, private _auth: AuthService) { }
  
  ngOnInit() {
    this.product = {product_picture: [], user: {}, category: ''}
    // this.product = {}
    this.userInfo = JSON.parse(localStorage.getItem('auth'))
    this.role = JSON.parse(localStorage.getItem('role')).role
    if (this._auth.loggedIn()) {
      this.currentUserId = this.userInfo.user_id
    } else {
      this.currentUserId = "none"
    }

  // PRODUCT DETAILS SLICK
    $('#product-main-view').slick({
      infinite: true,
      speed: 300,
      dots: false,
      arrows: true,
      fade: true,
      asNavFor: '#product-view',
    });
  
    $('#product-view').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      centerMode: true,
      focusOnSelect: true,
      asNavFor: '#product-main-view',
    });
  
    // PRODUCT ZOOM
    $('#product-main-view .product-view').zoom();
    
    this.qty = 1;
    let id = parseInt(this.route.snapshot.paramMap.get('id'))
    this._product.getProduct(id)
      .subscribe(
        res => {
          this.product = res
          if (this.product.bids.length > 0) {
            this.bid = this.product.bids[this.product.bids.length-1].bid + 1
          } else {
            this.bid = this.product.price + 1
            console.log("aja papa")
          }
          console.log(this.product)
        },
        err => console.log(err)
      )

    this._product.getProductComments(id)
    .subscribe(
      res => {
        console.log(res)
        this.comments = res
        console.log(this.comments)
      },
      err => console.log(err)
    )
  }

  bidUp(bid) {
    if (this._auth.loggedIn()) {
      this._product.createBid({bid: bid}, this.product.id).subscribe(
        res => {
          this.openMessage("Bid made successfully")
        },
        err => this.openMessageErr(err)
      )
    } else {
      this.router.navigate(['login'])
    }
  }

  makeComment() {
    this._product.createComment(this.newComment, parseInt(this.route.snapshot.paramMap.get('id')))
      .subscribe(
        res => {
          this.comments.push(res)
          this.newComment = {}
        },
        err => console.log(err)
      )
  }

  blockProduct(productId) {
    this._auth.blockProduct(productId).subscribe (
      res => this.openMessage("Product blocked successfully"),
      err => this.openMessageErr(err)
    )
  }

  unblockProduct(productId) {
    this._auth.unblockProduct(productId).subscribe (
      res => this.openMessage("Product unblocked successfully"),
      err => this.openMessageErr(err)
    )
  }

  addToCart(qty) {
    this.openMessage("Added to the cart")
    this._cart.addToCart(this.product, qty)
  }

  closeMessage() {
    this.modalMessage = false
    this.messages = []
    location.reload()
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
}
