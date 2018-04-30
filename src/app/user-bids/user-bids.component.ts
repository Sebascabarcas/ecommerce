import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-user-bids',
  templateUrl: './user-bids.component.html',
  styleUrls: ['./user-bids.component.scss']
})
export class UserBidsComponent implements OnInit {

  bids:any;
  productBids:any;
  constructor(private _auth: AuthService, private _product: ProductService, private router: Router) { }

  ngOnInit() {
    this.bids = []
    this._auth.showUserBids().subscribe(
      res => this.bids = res,
      err => console.log(err)
    )
  }

  goToBid(productId) {
    this.router.navigate(['product/' + productId])
  }

}
