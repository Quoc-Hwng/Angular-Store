import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Order } from '../models/order';
import { DataService } from 'src/app/service/data.service';
import { RestApiService } from 'src/app/service/rest-api.service';
import { ProductService } from 'src/app/service/product.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss']
})
export class HomeAdminComponent implements OnInit {

  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  order!: Order[];
  order1!: Order[];
  order2!: Order[];
  btnDisabled = false;
  Prod: any;
  url = 'http://localhost:3000/api/v1/cart'
  url2='http://localhost:3000/api/v1/user/product'
  deleteId!: string;
  confirmMessage = '';
  key = '';
  size = 5;
  sizes = 5;
  page = 1;
  pages = 1;

  constructor(private rest: RestApiService,
    private data: DataService,
    private modalService: NgbModal,
    private productService: ProductService) {

  }
  search(keys: string) {
    if (keys !== '') {
      this.key = keys;
      this.ngOnInit();
    }
  }
  Loadpage(pages: number) {
    console.log(pages)
    if (pages > 0) {
      this.page = pages;
      this.pages = pages
      this.ngOnInit()
    }
  }
  Loadsize(sizes:number){
    console.log(sizes)
    if(sizes>4){
      this.size=sizes;
      this.sizes=sizes;
      this.ngOnInit();
    }
  }
  namePro : string[];
  ngOnInit() {
    this.btnDisabled = true;
      this.rest.get(this.url).then((data:any)=>{
       this.order =( data.carts as Order[]);
       console.log(data);
       console.log(this.order);
       this.order.forEach(order =>{
         order.products.forEach(item =>{
           this.productService.getProById(item.product).subscribe((data:any)=>{
             item.name = data.product.productName;
           })
         })
       })
       console.log(this.order);
       this.btnDisabled=false;
     })
     .catch(error=>{
       this.data.error(error['message']);
     })
    // if (this.key == '') {
    //   this.rest.getOder(this.url, this.page, this.size, 'unconfimed').then(data => {
    //     console.log(data);
    //     this.order = (data as { order: Order[] }).order;
    //     this.btnDisabled = false;
    //   })
    //   this.rest.getOder(this.url, this.page, this.size, 'confimed').then(data => {
    //     this.order1 = (data as { order: Order[] }).order;
    //     this.btnDisabled = false;
    //   })
    //   this.rest.getOder(this.url, this.page, this.size, 'No').then(data => {
    //     this.order2 = (data as { order: Order[] }).order;
    //     this.btnDisabled = false;
    //   })
    // } else {
    //   this.rest.search(this.url, this.key).then(data => {
    //     this.order = (data as { order: Order[] }).order;
    //     this.btnDisabled = false;
    //   })
    //     .catch(error => {
    //       this.data.error(error['message']);
    //     })
    // }
  }
  finishAndAlert( message: string){
    this.data.success(message);
    this.ngOnInit();
  }
}
