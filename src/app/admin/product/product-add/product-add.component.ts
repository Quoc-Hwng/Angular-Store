import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { DataService } from 'src/app/service/data.service';
import { RestApiService } from 'src/app/service/rest-api.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  product: Product;
  btnDisabled= false;
  url1='http://localhost:3000/api/v1/admin/product/add'
  constructor(private rest:RestApiService,
    private data: DataService) {
      this.product= new Product;
     }

  ngOnInit() {
  }
  validate(){
    return true;
  }
  save(){
    this.btnDisabled=true;
    if(this.validate()){
      this.rest.post(this.url1,this.product).then(data=>{
        this.data.success('Product is saved');
        this.btnDisabled=false;
      })
      .catch(error=>{
        this.data.error(error['message']);
      })
    }
  }
}
