import { Component, OnInit,Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestApiService } from 'src/app/service/rest-api.service';
import { DataService } from 'src/app/service/data.service';
import { Order } from 'src/app/admin/models/order';
import { ProductService } from 'src/app/service/product.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.component.html',
  styleUrls: ['./detail-order.component.css']
})
export class DetailOrderComponent implements OnInit {

  doing=false;
  order: Order;
  @Input() Id: any;
  messageError = '';
  url1='https://desolate-dusk-27866.herokuapp.com/api/v1/cart';
  constructor(
    private rest : RestApiService,
    private productService: ProductService,
    private data: DataService,
    private modelService: NgbModal
  ) { }

  ngOnInit() {
    this.rest.getOne(this.url1,this.Id)
    .then((data:any) => {
      this.doing=true;
      this.order = data.cart as Order;
      this.order.products.forEach(item =>{
        this.productService.getProById(item.product).subscribe((data:any)=>{
          item.name = data.product.productName;
          item.size = data.product.size;
          item.image = data.product.productImg1;
          item.price = data.product.price;
          item.totalP = data.product.price * item.quantity;
        })
      })
      console.log(data);
      this.messageError = "";
    }).catch(error =>{
      this.doing =false;
      this.data.error(error['message'])
    });

  }
  ViewBill(Id:any){
    if(Id === '' || this.doing === false)
    {
      this.messageError = 'Không tìm thấy đơn hàng của bạn';
      this.ngOnInit();
    }else{
    this.ngOnInit();
    this.messageError='';
    }
  }
  update(){
    this.doing=true;
    this.order.state = 'No';
    this.rest.put(this.url1 +'/edit',this.Id,this.order)
      .then(data =>{
        this.doing=false;
        this.ngOnInit();
        console.log(data);
      }).catch(error =>{
        this.doing =false;
        this.data.error(error['message'])
      });

  }
  open(content: TemplateRef<any>){
    this.modelService.open(content, {ariaDescribedBy: 'modal-basic-title', size: "1000px" });
  }

}
