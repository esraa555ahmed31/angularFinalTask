import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './form/form.component';
import { MyCartComponent } from './my-cart/my-cart.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsComponent } from './products/products.component';
import { UserInfoComponent } from './user-info/user-info.component';


const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'product-details/:id', component: ProductDetailsComponent },
  { path: 'myCart/form', component: FormComponent },
  { path: 'myCart', component: MyCartComponent },
  { path: 'userInfo/:address/:phone/:email', component: UserInfoComponent },
  
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
