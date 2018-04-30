import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductComponent } from './product/product.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserProductsComponent } from './user-products/user-products.component';
import { AuthGuard } from './auth.guard';
import { UserProductsCommentsComponent } from './user-products-comments/user-products-comments.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ProfileComponent } from './profile/profile.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { UserPurchasesComponent } from './user-purchases/user-purchases.component';
import { UserSalesComponent } from './user-sales/user-sales.component';
import { UserBidsComponent } from './user-bids/user-bids.component';
import { ProductBidsComponent } from './product-bids/product-bids.component';
import { AdminViewComponent } from './admin-view/admin-view.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {path: '', redirectTo: 'shop', pathMatch: 'full'},
      {path: 'shop', component: ProductComponent},
      {path: 'product/:id', component: ProductDetailComponent},
      {path: 'product-add', component: AddProductComponent, canActivate: [AuthGuard]}
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'admin',
    component: AdminViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'my-profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', redirectTo: '', pathMatch: 'prefix'}
      // {path: 'origin/:id', component: OriginEditComponent}
    ]
  },
  {
    path: 'my-purchases',
    component: UserPurchasesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'my-sales',
    component: UserSalesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'my-bids',
    component: UserBidsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'my-product/:id/bids',
    component: ProductBidsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile/:id',
    component: ProfileComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'my-products',
    // For always fetch the data when navigates
    // runGuardsAndResolvers: "always",
    component: UserProductsComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', redirectTo: '', pathMatch: 'prefix'},
      {path: 'comments', component: UserProductsCommentsComponent},
      {path: ':id', component: ProductEditComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
