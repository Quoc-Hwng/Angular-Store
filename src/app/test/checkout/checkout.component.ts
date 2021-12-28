import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { Order } from 'src/app/admin/models/order';
import { DataService } from 'src/app/service/data.service';
import { RestApiService } from 'src/app/service/rest-api.service';
import { FormBuilder, Validators  } from '@angular/forms';
import {Employee} from 'src/app/models/employee';
import { CartItem } from 'src/app/common/cart';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

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
  orderPayPay: Order;
  public payPalConfig?: IPayPalConfig;
  exchangeD: any;
  url = 'https://desolate-dusk-27866.herokuapp.com/api/v1/cart/add';

  constructor(private cartService: CartService,
    public data: DataService,
    private rest: RestApiService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService) {
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
    const exchangeUrl =
            'https://openexchangerates.org/api/latest.json?app_id=1660c56ea4cc47039bcd5513b6c43f1a';
            this.rest.getSort(exchangeUrl).then((data:any) => {
               this.exchangeD = data.rates.VND;
            });
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
    this.order.stateOrder = "COD"
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
        this.toastr.success('Success', 'Thanks for choosing our products!!');
        this.ngOnInit();
        this.cartService.removeAllCart();
        setTimeout(() => {
          this.router.navigate(['/homes']);
        }, 1000);
      }).catch(error =>{
        this.checkout =false;
        this.data.error('Fail');
      });

  }
  payPal(){
    //	setLoading(true);
    this.checkout=true;
    this.order.user = this.data.employee?.id!
    this.order.products = this.items.map((item:CartItem) =>{
      return {
        product: item.product.id,
        quantity: item.quantity,
      }
    });
    this.order.total = this.grandTotal;
    this.orderPayPay = this.order;
    this.initConfig();

    }
    private initConfig(): void {
      this.orderPayPay.total = 0;
      this.orderPayPay.products = this.items.map((item:CartItem) =>{
        this.orderPayPay.total += Math.round(item.product.priceSale/this.exchangeD)*item.quantity;

        console.log(item.total);
        return {
          unit_amount:{
            currency_code: 'USD',
            value: Math.round(item.product.priceSale/this.exchangeD).toString(),
          },
          quantity: item.quantity,
          name: item.product.productName
        }
      });
      console.log(this.orderPayPay.total);
      console.log(this.orderPayPay.products);
      this.payPalConfig = {
          currency: 'USD',
          clientId: 'AUwNSEfoyT3YmqhkANrcL9D_nJSh1I5ffjgTuG2mXBKdXOmSZcEFipOOJ9kBiC2Kwr7eU_TkiAyyzvYm',
          createOrderOnClient: (data) => < ICreateOrderRequest > {
              intent: 'CAPTURE',
              purchase_units: [{
                  amount: {
                      currency_code: 'USD',
                      value: this.orderPayPay.total.toString(),
                      breakdown: {
                          item_total: {
                              currency_code: 'USD',
                              value: this.orderPayPay.total.toString(),
                          }
                      }
                  },
                  items: this.orderPayPay.products
              }]
          },
          advanced: {
              commit: 'true'
          },
          style: {
              label: 'paypal',
              layout: 'vertical'
          },
          onApprove: (data, actions) => {
              console.log('onApprove - transaction was approved, but not authorized', data, actions);
              actions.order.get().then((details:any) => {
                  console.log('onApprove - you can get full order details inside onApprove: ', details);
              });

          },
          onClientAuthorization: (data) => {

              console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
            //  this.showSuccess = true;
             this.checkOutPayPal();
          },
          onCancel: (data, actions) => {
              console.log('OnCancel', data, actions);
          //    this.showCancel = true;

          },
          onError: err => {
              console.log('OnError', err);
          //    this.showError = true;
          },
          onClick: (data, actions) => {
              console.log('onClick', data, actions);
         //     this.resetStatus();
          }
      };
  }
  checkOutPayPal(){
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
    this.order.stateOrder = "PayPal";
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
        this.toastr.success('Success', 'Thanks for choosing our products!!');
        this.cartService.removeAllCart();
        this.ngOnInit();
        setTimeout(() => {
          this.router.navigate(['/homes']);
        }, 1000);
      }).catch(error =>{
        this.checkout =false;
        this.data.error('Fail');
      });

  }

}
