import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductComponent } from './product/product.component';
import { ProductService } from './product.service';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserProductsComponent } from './user-products/user-products.component';
import { UserProductsCommentsComponent } from './user-products-comments/user-products-comments.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileProductComponent } from './profile-product/profile-product.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartService } from './cart.service';
import { OriginService } from './origin.service';
import { OriginAddComponent } from './origin-add/origin-add.component';
import { OriginChangeComponent } from './origin-change/origin-change.component';
import { PurchaseService } from './purchase.service';
import { UserPurchasesComponent } from './user-purchases/user-purchases.component';
import { UserSalesComponent } from './user-sales/user-sales.component';
import { UserBidsComponent } from './user-bids/user-bids.component';
import { ProductBidsComponent } from './product-bids/product-bids.component';
import { ModalConfirmComponent } from './modal-confirm/modal-confirm.component';
import { ModalMessageComponent } from './modal-message/modal-message.component';
import { BarRatingModule } from "ngx-bar-rating";
import { RateComponent } from './rate/rate.component';
import { NouisliderModule } from 'ng2-nouislider';
import { FilterJsonPipe } from './filter-json.pipe';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { CategoryDisplayPipe } from './category-display.pipe';
import { NotOwnerPipe } from './not-owner.pipe';
import { NoCoverImagePipe } from './no-cover-image.pipe';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    ProductDetailComponent,
    ProductComponent,
    UserProfileComponent,
    UserProductsComponent,
    UserProductsCommentsComponent,
    ProductEditComponent,
    AddProductComponent,
    ProfileComponent,
    ProfileProductComponent,
    CheckoutComponent,
    OriginAddComponent,
    OriginChangeComponent,
    UserPurchasesComponent,
    UserSalesComponent,
    UserBidsComponent,
    ProductBidsComponent,
    ModalConfirmComponent,
    ModalMessageComponent,
    RateComponent,
    FilterJsonPipe,
    AdminViewComponent,
    CategoryDisplayPipe,
    NotOwnerPipe,
    NoCoverImagePipe
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyBehLlI6uwdbYzciV4r6SF6_VTxOgaCqZU",
      libraries: ["places"]
    }),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BarRatingModule,
    NouisliderModule
  ],
  providers: [AuthService, AuthGuard, ProductService, CartService, OriginService, PurchaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
