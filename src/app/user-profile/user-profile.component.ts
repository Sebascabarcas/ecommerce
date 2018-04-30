import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { OriginService } from '../origin.service';
import { FormControl } from '@angular/forms';
import { ProductService } from '../product.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  @ViewChild('fileInput') fileInput;
  user:any
  userInfo:any
  origins = []
  originId:any;
  initial = false;
  showModal = false;
  url=""
  change=false;
  file:any;
  
  constructor(private _auth: AuthService,  
    private _origin: OriginService, 
    private location: Location
  ) { }
  
  ngOnInit() {
    this.user = {}
    this.userInfo = JSON.parse(localStorage.getItem('auth'))
    console.log(this.userInfo.user_id)
    this._auth.showUser(this.userInfo.user_id).subscribe(
      res => {
        this.user = res.user
        console.log(res)
        if (this.user.picture) {
          this.url = this.user.picture.url
        } else {

        }
      },
      err => console.log(err)
    )
    
    this._origin.getOrigins()
      .subscribe(
        res => {
          // console.log(res)
          this.origins = res
          // console.log(this.origins)
        },
        err => console.log(err)
      )
    }

    onSelectFile(event, i, photo) {
      this.change = true
      console.log(this.file)
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
  
        reader.readAsDataURL(event.target.files[0]); // read file as data url
  
        reader.onload = (event:any) => { // called once readAsDataURL is completed
          this.url = event.target.result;
          this.uploadProfilePhoto() 
        }
      }
    }
    
    uploadProfilePhoto() {
      let fileBrowser = this.fileInput.nativeElement;
      if (fileBrowser.files && fileBrowser.files[0]) {
        const formData = new FormData();
        formData.append("image", fileBrowser.files[0]);
      // this.cover_photo.image = photo
      this._auth.updateUserProfilePhoto(formData).subscribe (
        res => {
          // console.log(res)
          let currentUser = JSON.parse(localStorage.getItem('auth'))
          currentUser.profilePhoto = res.picture.url
          localStorage.removeItem('auth')
          localStorage.setItem('auth', JSON.stringify(currentUser))
          location.reload();
        },
        err => console.log(err)
      )
    }
    }

    updateUser() {
      this.user.userId = this.userInfo.user_id
      this._auth.updateUser(this.user).subscribe(
        res => {
          this.user = res
          location.reload()
        },
        err => console.log(err)
      )
    }

    deleteOrigin() {
      this._origin.deleteOrigin(this.originId).subscribe(
        res => {
          this.showModal = false
          location.reload();
        },
        err => console.log(err)
      )
    }

    openModal(originId) {
      this.showModal = true
      this.originId = originId
    }

    closeModal() {
      this.showModal = false
    }
}
