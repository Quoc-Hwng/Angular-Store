import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import {  CUSTOM_ELEMENTS_SCHEMA,NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchAdminPipe } from '../shared/search-admin.pipe';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list'

import { HeaderComponent } from './header/header.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidenavComponent } from './sidenav/sidenav.component';

import { SalesComponent } from './sales/sales.component';
import { BrandsComponent } from './brands/brands.component';
import { AddBrandsComponent } from './brands/add-brands/add-brands.component';
import { EditBrandsComponent } from './brands/edit-brands/edit-brands.component';

import { ProductComponent } from './product/product.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { NewsComponent } from './news/news.component';
import { AddNewsComponent } from './news/add-news/add-news.component';
import { EditNewsComponent } from './news/edit-news/edit-news.component';
import { MessageComponent } from './message/message.component';
import { AdminsComponent } from './admins.component';
import { AdminRoutingModule } from './admins-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RestApiService } from 'src/app/service/rest-api.service';
import { DataService } from 'src/app/service/data.service';
import { EditOderComponent } from './home-admin/edit-oder/edit-oder.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    HeaderComponent,
    HomeAdminComponent,
    DashboardComponent,
    SidenavComponent,
    SalesComponent,
    BrandsComponent,
    AddBrandsComponent,
    EditBrandsComponent,
    ProductComponent,
    AddProductComponent,
    EditProductComponent,
    NewsComponent,
    AddNewsComponent,
    EditNewsComponent,
    MessageComponent,
    AdminsComponent,
    EditOderComponent,
    SearchAdminPipe,
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    AdminRoutingModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [RestApiService, DataService]
})
export class AdminModule { }
