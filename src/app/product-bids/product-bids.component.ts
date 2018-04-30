import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { PurchaseService } from '../purchase.service';

@Component({
  selector: 'app-product-bids',
  templateUrl: './product-bids.component.html',
  styleUrls: ['./product-bids.component.scss']
})
export class ProductBidsComponent implements OnInit {
  bids = []
  currentProductId:any;
  currentProductPhoto:any
  constructor(private _product: ProductService, private _purchase: PurchaseService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.currentProductId = parseInt(this.route.snapshot.paramMap.get('id'))
    this._product.getProductBids(this.currentProductId).subscribe (
      res => this.bids = res,
      err => console.log(err)
    )
    
    this._product.getProductPhotos(this.currentProductId).subscribe (
      res => this.currentProductPhoto = res[0].picture
    )
  }
  
  finishAuction(){
    this._purchase.finishAuction(this.currentProductId).subscribe (
      res => {
        console.log(res)
      },
      err => console.log(err)
    )
  }

}
