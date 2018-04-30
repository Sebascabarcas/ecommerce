import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-user-products-comments',
  templateUrl: './user-products-comments.component.html',
  styleUrls: ['./user-products-comments.component.scss']
})
export class UserProductsCommentsComponent implements OnInit {

  @Input() productId: any;
  comments = []
  newComment = {}
  // userId:any;
  constructor(private _product: ProductService, private route: ActivatedRoute) { }

  ngOnInit() {
    // this.userId = JSON.parse(localStorage.getItem('auth')).user_id
    $(document).ready(function(){
      $('.dropdown-menu').on("click", function(e){
        e.stopPropagation();
        e.preventDefault();
      });
    });
    this._product.getProductComments(this.productId)
    .subscribe(
      res => {
        console.log(res)
        this.comments = res
        console.log(this.comments)
      },
      err => console.log(err)
    )
  }

  makeComment() {
    this._product.createComment(this.newComment, this.productId)
      .subscribe(
        res => {
          this.comments.push(res)
          this.newComment = {}
        },
        err => console.log(err)
      )
  }
  
}
