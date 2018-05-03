import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { PurchaseService } from '../purchase.service';
import { OriginService } from '../origin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-purchases',
  templateUrl: './user-purchases.component.html',
  styleUrls: ['./user-purchases.component.scss']
})
export class UserPurchasesComponent implements OnInit {

  purchases = []
  pendingActions = {}  
  origins = []
  currentPurchaseId:any;
  modalRate = false
  stringAction = 'seller'
  destiny:any;
  constructor(private _auth: AuthService, private router: Router, private _purchase: PurchaseService, private _origin: OriginService) { }

  ngOnInit() {
    this._purchase.getPurchases(). subscribe (
      res => this.purchases = res,
      err => console.log(err)
    )

    this._auth.pendingActions().subscribe (
      res => this.pendingActions = res,
      err => console.log(err)
    )

    this._origin.getOrigins().subscribe (
      res => this.origins = res,
      err => console.log(err)
    ) 
  }

  setAddress(productId, originId) {
    this._purchase.setPurchaseDestination(productId, originId).subscribe (
      res => {   
        location.reload()
        console.log(res)
      }
    )
  }

  setDelivered(purchaseId) {
    this._auth.setDelivered(purchaseId).subscribe(
      res => {
        location.reload()
      },
      err => console.log(err)
    )
  }

  goToShop(){
    this.router.navigate(['shop'])
  }

  goToFeedback(purchaseId){
    this.currentPurchaseId = purchaseId
    this.modalRate = true
  }
  
  closeModalRate() {
    this.modalRate = false
    location.reload()
  }

}
