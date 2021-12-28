import { MessageComponent } from '../../message/message.component';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { News } from 'src/app/models/news';
import { RestApiService } from 'src/app/service/rest-api.service';
import { DataService } from 'src/app/service/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Order } from '../../models/order';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';


@Component({
  selector: 'app-edit-oder',
  templateUrl: './edit-oder.component.html',
  styleUrls: ['./edit-oder.component.css']
})
export class EditOderComponent implements OnInit {

  doing=false;
  oder: Order;
  url1='https://desolate-dusk-27866.herokuapp.com/api/v1/cart';
  @Input("id")
  editId!: string;

  @Output()
  updateFinished: EventEmitter<string> = new EventEmitter<string>();

  constructor(private modelService: NgbModal,
    private rest:RestApiService,
    private data: DataService,
    private fb: FormBuilder,
    private router: Router,
    private productService: ProductService) {
      this.oder= new Order;

     }

  ngOnInit() {
    this.doing=true;
    this.rest.getOne(this.url1,this.editId)
      .then((data:any) => {
        this.doing=false;
        this.oder =data.cart as Order;
        this.oder.products.forEach(item =>{
          this.productService.getProById(item.product).subscribe((data:any)=>{
            item.name = data.product.productName;
            item.size = data.product.size;
          })
        })
        console.log(data);
      }).catch(error =>{
        this.doing =false;
        this.data.error(error['message'])
      });
  }
  open(content: TemplateRef<any>){
    this.modelService.open(content, {ariaDescribedBy: 'modal-basic-title'});
  }
  update(){
    this.doing=true;
    this.rest.put(this.url1 +'/edit',this.editId,this.oder)
      .then(data =>{
        this.doing=false;
        this.modelService.dismissAll();
        this.ngOnInit()
        console.log(data);
        this.router.navigate(['admin/home-admin'])
      }).catch(error =>{
        this.doing =false;
        this.data.error(error['message'])
      });

  }

}
