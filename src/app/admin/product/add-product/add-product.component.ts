import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Component, OnInit, TemplateRef } from '@angular/core';
import { RestApiService } from 'src/app/service/rest-api.service';
import { DataService } from 'src/app/service/data.service';
import { Brand } from 'src/app/models/brand';
import { FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  saving=false;
  product: Product;
  url1='http://localhost:3000/api/v1/admin/product/add'

  brands!: Brand[];
  btnDisabled= false;
  url='http://localhost:3000/api/v1/admin/brand'

  constructor(private modelService: NgbModal,
    private rest:RestApiService,
    private data: DataService,
    private fb: FormBuilder) {
      this.product= new Product;
     }
     infoproduct = this.fb.group({
      "productName":["",[Validators.required,Validators.minLength(2)]],
      "productCode":["",[Validators.required,Validators.minLength(2),]],
      "size":["",[Validators.required,Validators.min(3),Validators.max(50)]],
      "amount":["",[Validators.required,Validators.min(1)]],
      "price":["",[Validators.required,Validators.min(10000)]],
      "brand":["",[Validators.required]],
      "gender":["",[Validators.required]],
      "colour":["",[Validators.required]],
      "status":["",[Validators.required]],
      "selling":["",[Validators.required]],
      "priceSale":["",[Validators.required]],
      "productImg1":["", Validators.pattern("(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?")],
      "productImg2":["", Validators.pattern("(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?")],
      "productImg3":["", Validators.pattern("(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?")],
      "description":["",[Validators.required]]
     })

  ngOnInit() {
    this.btnDisabled=true;
    this.rest.get(this.url).then(data=>{
        this.brands =( data as {brands: Brand[]}).brands;
        this.btnDisabled=false;
      })
      .catch(error=>{
        this.data.error(error['message']);
      })
  }
  open(content: TemplateRef<any>){
    this.modelService.open(content, {ariaDescribedBy: 'modal-basic-title'});
  }
  save(){
    this.saving=true;

    this.rest.post(this.url1,this.product)
      .then(data =>{
        this.saving=false;
        this.data.success('Product is saved');
        this.ngOnInit();
      }).catch(error =>{
        this.saving =false;
        this.data.error('Mã sản phẩm đã tồn tại')
      });

  }

}
