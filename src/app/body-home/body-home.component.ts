import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { ProductService } from '../service/product.service';
import { RestApiService } from '../service/rest-api.service';
import {Product} from './../models/product';
import { Brand } from 'src/app/models/brand';

@Component({
  selector: 'app-body-home',
  templateUrl: './body-home.component.html',
  styleUrls: ['./body-home.component.css']
})
export class BodyHomeComponent implements OnInit {
  images = [944, 1011, 984].map((n) => `https://bizweb.dktcdn.net/100/424/874/themes/817899/assets/slider_3.jpg?1634203525795`);
  product!: Product[];
  products!: Product[];
  btnDisabled= false;
  brand: Brand[];

  url='https://desolate-dusk-27866.herokuapp.com/api/v1/user/product';
  url1='https://desolate-dusk-27866.herokuapp.com/api/v1/admin/brand';
  constructor(private rest:RestApiService,
    private data: DataService) { }

  ngOnInit(): void {
    this.btnDisabled=true;
    this.rest.filter(this.url,{selling:"sale"}).then((data:any)=>{
      this.product = data.data.data as Product[];
      console.log(data);
      this.btnDisabled=false;
    })
    this.rest.filter(this.url,{status:'new'}).then((data:any)=>{
      this.products =data.data.data as Product[];
      this.btnDisabled=false;
    })
    this.rest.get(this.url1).then((data:any)=>{
      this.brand =data.brands as Brand[];
      console.log(data);
      this.btnDisabled=false;
    })
  }

}
