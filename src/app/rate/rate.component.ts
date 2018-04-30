import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss']
})
export class RateComponent implements OnInit {
  @Input() action:any;
  @Input() id:any;
  @Output() closeRate = new EventEmitter<any>();
  rating:any;
  constructor(private _auth: AuthService) { }

  ngOnInit() {
  }

  rate() {
    if (this.action.includes("seller")) {
      this._auth.setSellerScore({seller_score: this.rating}, this.id).subscribe (
        res => {
          this.closeRate.emit()
        },
        err => console.log(err)
      )
    } else {
      this._auth.setBuyerScore({buyer_score: this.rating}, this.id).subscribe (
        res => {
          this.closeRate.emit()
        },
        err => console.log(err)
      )
    }
  }

}
