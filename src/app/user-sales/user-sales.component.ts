import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { PurchaseService } from '../purchase.service';

@Component({
  selector: 'app-user-sales',
  templateUrl: './user-sales.component.html',
  styleUrls: ['./user-sales.component.scss']
})
export class UserSalesComponent implements OnInit {
  sales = []
  pendingActions = []
  currentSaleId:any;
  modalRate = false
  stringAction = 'buyer'
  constructor(private _auth: AuthService, private _purchase: PurchaseService) { }

  ngOnInit() {  
    this._purchase.getSales().subscribe (
      res => this.sales = res,
      err => console.log(err)
    )

    this._auth.pendingActions().subscribe (
      res => this.pendingActions = res,
      err => console.log(err)
    )
  }

  setShipped(saleId) {
    this._auth.setShipped(saleId).subscribe(
      res => {
        location.reload()
      },
      err => console.log(err)
    )
  }

  goToFeedback(saleId){
    this.currentSaleId = saleId
    this.modalRate = true
  }
  
  closeModalRate() {
    this.modalRate = false
    location.reload()
  }
}
