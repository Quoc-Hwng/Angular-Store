import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { Order } from 'src/app/admin/models/order';
import { DataService } from 'src/app/service/data.service';
import { RestApiService } from 'src/app/service/rest-api.service';
import { FormBuilder, Validators  } from '@angular/forms';
import {Employee} from 'src/app/models/employee';
import { CartItem } from 'src/app/common/cart';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  public items : any = [];
  public grandTotal !: number;
  order: Order;
  checkout = false;
  url = 'http://localhost:3000/api/v1/cart/add';

  constructor(private cartService: CartService,
    private data: DataService,
    private rest: RestApiService,
    private fb: FormBuilder) {
      this.order = new Order;
    }

    public infocheckout = this.fb.group({
      "displayName":["",[Validators.required,Validators.minLength(2)]],
      "email":["",[Validators.required]],
      "phone":["",[Validators.required,Validators.min(0)]],
      "address":["",[Validators.required]],
     })

  ngOnInit() {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.items = res;
      this.grandTotal = this.cartService.getTotalPrice();
      console.log(this.items);
    })
  }
  checkOut(){
    this.checkout=true;
    this.order.user = this.data.employee?.id!
    this.order.products = this.items.map((item:CartItem) =>{
      return {
        product: item.product.id,
        quantity: item.quantity,
      }
    });
    this.order.total = this.grandTotal;
    console.log(this.order);
    this.rest.post(this.url,this.order)
      .then(data =>{
        this.checkout=false;
        this.data.success('Success');
        this.ngOnInit();
        console.log(data);
      }).catch(error =>{
        this.checkout =false;
        this.data.error('Fail');
      });

  }

}
