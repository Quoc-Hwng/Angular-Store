import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { Order } from 'src/app/admin/models/order';
import { DataService } from 'src/app/service/data.service';
import { RestApiService } from 'src/app/service/rest-api.service';
import { FormBuilder, Validators  } from '@angular/forms';
import {Employee} from 'src/app/models/employee';
import { CartItem } from 'src/app/common/cart';
import { Router } from '@angular/router';

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
  dataUser : Employee;
  isUser = false;
  url = 'http://localhost:3000/api/v1/cart/add';

  constructor(private cartService: CartService,
    public data: DataService,
    private rest: RestApiService,
    private fb: FormBuilder,
    private router: Router) {
      this.order = new Order;
    }

    public infocheckout = this.fb.group({
      "displayName":["",[Validators.required,Validators.minLength(2)]],
      "email":["",[Validators.required]],
      "phone":["",[Validators.required,Validators.min(0)]],
      "address":["",[Validators.required]],
     })

  ngOnInit() {
   this.dataUser = JSON.parse(localStorage.getItem('user')!);
   if(this.dataUser !== null){
     this.isUser = true;
   }else if(this.infocheckout){this.isUser = false;}
    this.cartService.getProducts()
    .subscribe(res=>{
      this.items = res;
      this.grandTotal = this.cartService.getTotalPrice();
      console.log(this.items);
    })
  }
  checkOut(){
    console.log(this.infocheckout.controls.displayName.value )
    if(this.isUser === true && (this.infocheckout.controls.displayName.value === undefined ||
     this.infocheckout.controls.email.value === undefined || this.infocheckout.controls.phone.value === undefined || this.infocheckout.controls.address.value === undefined)){
      this.order.address = this.dataUser.address;
      this.order.displayName = this.dataUser.displayName;
      this.order.phone = this.dataUser.phone;
      this.order.email = this.dataUser.email;
    }
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
        setTimeout(() => {
        //  this.successMessage = '';
          this.router.navigate(['/homes']);
        }, 3500);
      }).catch(error =>{
        this.checkout =false;
        this.data.error('Fail');
      });

  }

}
