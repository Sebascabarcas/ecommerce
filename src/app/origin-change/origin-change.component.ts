import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../product.service';
import { OriginService } from '../origin.service';

@Component({
  selector: 'app-origin-change',
  templateUrl: './origin-change.component.html',
  styleUrls: ['./origin-change.component.scss']
})
export class OriginChangeComponent implements OnInit {

  @Input() product:any;
  origins=[]
  messages = [];
  modalMessage = false
  constructor(private _product: ProductService, private _origin: OriginService) { }

  ngOnInit() {
    this._origin.getOrigins()
      .subscribe(
        res => {
          console.log(res)
          this.origins = res
          console.log(this.origins)
        },
        err => {
          this.openMessage(err)
        }
      )
  }

  changeProductOrigin(product) {
    product.origin_id = product.origin.id
    this._product.updateProduct(product).subscribe(
      res => {
        this.openMessage('Shipping address updated successfully') 
      },
      err => {
        this.openMessageErr(err)
      }
    )
  } 

  closeMessage() {
    this.messages = []
    this.modalMessage = false
    location.reload()
  }

  openMessageErr(err) {
    for (var key in err.error) {
      console.log(key)
      this.messages.push(err.error[key])
    }
    this.modalMessage = true
  }
  
  openMessage(message) {
    this.messages.push(message)
    this.modalMessage = true
  }

}
