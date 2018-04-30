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
  currentUserId:any;
  comments = []
  newComment = {}
  
  
  constructor(private route: ActivatedRoute, private router: Router, private _product: ProductService, private _cart: CartService, private _auth: AuthService) { }
  
  ngOnInit() {
    this.product = {product_picture: [], user: {}}
    // this.product = {}
    if (this._auth.loggedIn()) {
      this.currentUserId = JSON.parse(localStorage.getItem('auth')).user_id

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
          console.log(res)
          this.product = res
          console.log(this.product.cover.url)
          if (this.product.bids) {
            this.bid = this.product.bids[this.product.bids.length-1].bid + 1
          } else {
            this.bid = this.product.price + 1
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
        res => console.log(res),
        err => console.log(err)
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


  addToCart(qty) {
    this._cart.addToCart(this.product, qty)
  }
}
