import { OrderTrackingComponent } from './components/order-tracking/order-tracking.component';
import { CheckoutComponent } from './test/checkout/checkout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyHomeComponent } from './body-home/body-home.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { CartComponent } from './test/cart/cart.component';
import { DetailComponent } from './test/detail/detail.component';
import { HomeComponent } from './test/home/home.component';
import { SearchProductComponent } from './components/search-product/search-product.component';
import { InformationComponent } from './test/information/information.component';
import { BrandsComponent } from './admin/brands/brands.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { HomeAdminComponent } from './admin/home-admin/home-admin.component';
import { NewsComponent } from './admin/news/news.component';
import { ProductComponent } from './admin/product/product.component';
import { SalesComponent } from './admin/sales/sales.component';
import { AdminsComponent } from './admin/admins.component';
import { ProfileComponent } from './test/information/profile/profile.component';
import { ChangePasswordComponent } from './test/information/changePassword/changePassword.component';
import { OrderHistoryComponent } from './test/information/order-history/order-history.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/forgot-password/reset-password/reset-password.component';

const routes: Routes = [
  { path: 'checkout', component:CheckoutComponent  },
  { path: 'cart', component:CartComponent  },
  { path: 'homes', component: HomeComponent },
  { path: 'detail/:id', component: DetailComponent },
  { path: '', component: BodyHomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'search', component: SearchProductComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: 'resetPassword/:token', component: ResetPasswordComponent },
  { path: 'information', component: InformationComponent, children: [
    { path: 'profile', component: ProfileComponent},
    { path: 'changPassword', component: ChangePasswordComponent},
    { path: 'history', component: OrderHistoryComponent},
  ]},
  { path: 'admin', component: AdminsComponent, children: [
    { path: 'home-admin', component: HomeAdminComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'sale', component: SalesComponent },
    { path: 'brands', component: BrandsComponent },
    { path: 'product', component: ProductComponent },
    { path: 'news', component: NewsComponent },
  ]},
  { path: 'tracking', component: OrderTrackingComponent},
  { path: '**', component: PageNotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
