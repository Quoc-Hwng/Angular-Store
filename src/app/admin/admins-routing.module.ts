import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandsComponent } from './brands/brands.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { NewsComponent } from './news/news.component';
import { ProductComponent } from './product/product.component';
import { SalesComponent } from './sales/sales.component';
import { AdminsComponent } from './admins.component';

const routes: Routes = [
  // { path: '', component: AdminsComponent,pathMatch: 'full', children: [
  //   { path: 'home-admin', component: HomeAdminComponent },
  //   { path: 'dashboard', component: DashboardComponent },
  //   { path: 'sale', component: SalesComponent },
  //   { path: 'brands', component: BrandsComponent },
  //   { path: 'product', component: ProductComponent },
  //   { path: 'news', component: NewsComponent },
  // ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
