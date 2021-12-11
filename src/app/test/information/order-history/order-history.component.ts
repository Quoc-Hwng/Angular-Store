import { Component, OnInit } from '@angular/core';
import { RestApiService } from 'src/app/service/rest-api.service';
import { Order } from 'src/app/admin/models/order';
import { ProductService } from 'src/app/service/product.service';
import { DataService } from 'src/app/service/data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  url='http://localhost:3000/api/v1/cart?sort=-timeOrder';
  order!: Order[];
  orders!: Order[];
  totalLength: number;
 page:number = 1;
 limit: any = 5;
  constructor(private rest: RestApiService,
    public data: DataService,
    private modalService: NgbModal,
    private productService: ProductService,
    ) { }

  ngOnInit() {
    this.rest.getSort(this.url).then((data:any)=>{
      this.orders =( data.carts as Order[]);
      this.order = this.orders.filter(item => item.user === this.data.employee?.id)
      this.totalLength = this.order?.length;
      this.order.forEach(order =>{
        order.products.forEach(item =>{
          this.productService.getProById(item.product).subscribe((data:any)=>{
            item.name = data.product.productName;
          })
        })
      })
      console.log(this.order);
    })
  }

}
