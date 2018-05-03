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
  modalMessage = false
  messages = []
  buyerScore:any;
  sellerScore:any;
  userInfo:any;
  role:any;
  constructor(private _auth: AuthService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.userInfo = JSON.parse(localStorage.getItem('auth'))
    this.role = JSON.parse(localStorage.getItem('role')).role
    this.user = {user: {}}
    let id = parseInt(this.route.snapshot.paramMap.get('id'))
    this._auth.showUser(id).subscribe(
      res => {
        this.user = res
        this.products = res.product
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

  blockUser(userId) {
   this._auth.blockUser(userId).subscribe (
     res => this.openMessage("User blocked successfully"),
     err => this.openMessageErr(err)
   ) 
  }

  unblockUser(userId) {
   this._auth.unblockUser(userId).subscribe (
     res => this.openMessage("User unblocked successfully"),
     err => this.openMessageErr(err)
   ) 
  }

}
