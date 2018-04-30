import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user = {}
  products = []
  buyerScore:any;
  sellerScore:any;
  constructor(private _auth: AuthService, private route: ActivatedRoute) { }

  ngOnInit() {
    let id = parseInt(this.route.snapshot.paramMap.get('id'))
    this._auth.showUser(id).subscribe(
      res => {
        this.user = res
        console.log(res)
        this.products = res.product
        console.log(this.products)
      },
      err => console.log(err)
    )

    this._auth.getBuyerScore(id).subscribe (
      res => this.buyerScore = res,
      err => {
        this.buyerScore = 0
      }
    )

    this._auth.getSellerScore(id).subscribe (
      res => this.sellerScore = res,
      err => {
        this.sellerScore = 0
      }
    )
  }

}
