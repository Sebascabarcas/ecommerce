import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { PurchaseService } from '../purchase.service';

@Component({
  selector: 'app-user-purchases',
  templateUrl: './user-purchases.component.html',
  styleUrls: ['./user-purchases.component.scss']
})
export class UserPurchasesComponent implements OnInit {

  purchases = []
  pendingActions = {}  
  currentPurchaseId:any;
  modalRate = false
  stringAction = 'seller'
  constructor(private _auth: AuthService, private _purchase: PurchaseService) { }

  ngOnInit() {
    this._purchase.getPurchases(). subscribe (
      res => this.purchases = res,
      err => console.log(err)
    )

    this._auth.pendingActions().subscribe (
      res => this.pendingActions = res,
      err => console.log(err)
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

  goToFeedback(purchaseId){
    this.currentPurchaseId = purchaseId
    this.modalRate = true
  }
  
  closeModalRate() {
    this.modalRate = false
    location.reload()
  }

}
