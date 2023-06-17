import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { ProductsComponent } from './Components/products/products.component';
import { GuardGuard } from './Guards/auth.guard';
import { ProductdetailsComponent } from './Components/productdetails/productdetails.component';

const routes: Routes = [
  {path:'', redirectTo: "login" , pathMatch: "full"},
  {path : 'login', component: LoginComponent },
  {path : 'products', component: ProductsComponent , canActivate:[GuardGuard] },
  {path : 'dashboard', component: DashboardComponent , canActivate:[GuardGuard]},
  {path : 'details/:productId' , component: ProductdetailsComponent ,  canActivate:[GuardGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
