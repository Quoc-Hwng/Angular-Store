import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from 'src/app/common/cart';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public status : string = '';
  public gender : string = '';
  public selling : string = '';
  cart:  CartItem[] = [];
  totalItem: number = 0;

  constructor(private route: ActivatedRoute,
    private _router: Router,
    private cartService: CartService) { }

  ngOnInit() {
    this.cartService.getProducts()
    .subscribe((res: any)=>{
      this.cart = res;
      if(this.cart !== null) {
      this.totalItem = this.cart.length;}
    })
  }
  navigateToFoo(filter: string){
    if(filter === 'new' || filter === 'seconhand'){
      this.status =  filter;
      this.gender = '';
      this.selling = '';
    }else if(filter === 'nam' || filter === 'nu'){
      this.gender = filter;
      this.status = '';
      this.selling = '';
    }
    else{
      this.selling = filter;
      this.gender = '';
      this.status = '';
    }

    this._router.navigate(['/homes'], {
     relativeTo: this.route,
     queryParams: {
       status : this.status,
       gender : this.gender,
       selling: this.selling,

     },
     queryParamsHandling: 'merge',
     skipLocationChange: false
   });
  }
}
