import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';


@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent implements OnInit {

  url='https://desolate-dusk-27866.herokuapp.com/api/v1/user/product';
  public productList : any ;
  public filterCategory : any
  searchKey:string ="";
  errorMessage: string = "";
  constructor(private productService: ProductService,private cartService: CartService) { }

  ngOnInit() {
    this.productService.getProduct(this.url).subscribe((res: any) =>{
      this.productList = res.data.data;
      this.filterCategory = res;
      console.log(res);
    })
    this.cartService.search.subscribe((val :any) =>{
      this.searchKey = val;
      console.log(this.searchKey);
    })
    if(this.searchKey === '' || this.productList?.length === 0)
    {
      this.errorMessage = 'No products found';
    }else {this.errorMessage = ''}

  }
}
