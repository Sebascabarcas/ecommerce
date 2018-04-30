import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-product',
  templateUrl: './profile-product.component.html',
  styleUrls: ['./profile-product.component.scss']
})
export class ProfileProductComponent implements OnInit {
  @Input() products:any;
  userId:any;

  constructor(private _product: ProductService, private route: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.products)
    this.userId = this.route.snapshot.paramMap.get('id')
  }

}
