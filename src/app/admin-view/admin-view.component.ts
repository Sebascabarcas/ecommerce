import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ProductService } from '../product.service';
import { WeekDay } from '@angular/common';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss']
})
export class AdminViewComponent implements OnInit {

  users = []
  products = []
  modalMessage = false
  messages = []
  currentUserId:any;
  constructor(private router: Router, private _auth: AuthService, private _product: ProductService) { }

  ngOnInit() {
    let userInfo = JSON.parse(localStorage.getItem('auth'))
    // let userInfo = JSON.parse(localStorage.getItem('auth'))
    this.currentUserId = userInfo.user_id
    this._auth.getUsers().subscribe (
      res => {
        this.users = res
        console.log(res)
      },
      err => console.log(err)
    )
    this._product.getProducts().subscribe (
      res => {
        this.products = res
        console.log(res)
      },
      err => console.log(err)
    )
  }

  blockUser(userId) {
    this._auth.blockUser(userId).subscribe(
      res => {
        this.openMessage("User blocked successfully")
      },
      err => {
        this.openMessage(err)
      }
    )
  }

  unblockUser(userId) {
    this._auth.unblockUser(userId).subscribe(
      res => {
        this.openMessage("User unblocked successfully")
      },
      err => {
        this.openMessage(err)
      }
    )
  }

  blockProduct(productId) {
    this._auth.blockProduct(productId).subscribe(
      res => {
        this.openMessage("Product blocked successfully")
      },
      err => {
        this.openMessage(err)
      }
    )
  }

  unblockProduct(productId) {
    this._auth.unblockProduct(productId).subscribe(
      res => {
        this.openMessage("Product unblocked successfully")
      },
      err => {
        this.openMessage(err)
      }
    )
  }

  noUnblockProduct() {
    this.openMessage("You cannot unblock this product because the user owner is blocked")
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
