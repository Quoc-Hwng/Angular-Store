import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Order } from '../models/order';
import { DataService } from 'src/app/service/data.service';
import { RestApiService } from 'src/app/service/rest-api.service';
import { ProductService } from 'src/app/service/product.service';
import { Product } from 'src/app/models/product';
import { ActivatedRoute, Router } from '@angular/router';

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
  order3!: Order[];
  btnDisabled = false;
  Prod: any;
  url = 'http://localhost:3000/api/v1/cart?sort=-timeOrder'
  url2='http://localhost:3000/api/v1/user/product'
  deleteId!: string;
  confirmMessage = '';
  key = '';
  page:number = 1;
  limit: any = 5;
  totalLength: number;
  page2:number = 1;
  limit2: any = 5;
  totalLength2: number;
  page3:number = 1;
  limit3: any = 5;
  totalLength3: number;

  constructor(private rest: RestApiService,
    private data: DataService,
    private modalService: NgbModal,
    private productService: ProductService,
    private route: ActivatedRoute,
    private _router: Router) {

  }
  search(keys: string) {
    if (keys !== '') {
      this.key = keys;
      this.ngOnInit();
    }
  }
  namePro : string[];
  ngOnInit() {
    this.btnDisabled = true;
      this.rest.getSort(this.url).then((data:any)=>{
       this.order1 =( data.carts as Order[]);
       console.log(this.url);
       this.order = this.order1.filter(c => c.state === 'unconfirmed');
       console.log(this.order);
       this.totalLength = this.order!.length;
       this.order2 = this.order1.filter(c => c.state === 'confirmed');
       this.totalLength2 = this.order2!.length;
       this.order3 = this.order1.filter(c => c.state === 'No');
       this.totalLength3 = this.order3!.length;
       this.order1.forEach(order =>{
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
  }
  finishAndAlert( message: string){
    this.data.success(message);
    this.ngOnInit();
  }
}
