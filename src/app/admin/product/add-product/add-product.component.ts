import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Component, OnInit, TemplateRef } from '@angular/core';
import { RestApiService } from 'src/app/service/rest-api.service';
import { DataService } from 'src/app/service/data.service';
import { Brand } from 'src/app/models/brand';
import { FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { Observable } from 'rxjs';
import { getDownloadURL, ref, Storage } from '@angular/fire/storage';
import { AngularFireStorage } from '@angular/fire/compat/storage';




@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  saving=false;
  product: Product;
  img1: string;
  url1='https://desolate-dusk-27866.herokuapp.com/api/v1/admin/product/add'

  brands!: Brand[];
  btnDisabled= false;
  url='https://desolate-dusk-27866.herokuapp.com/api/v1/admin/brand'

  constructor(private modelService: NgbModal,
    private rest:RestApiService,
    private data: DataService,
    private fb: FormBuilder,
    private storage: AngularFireStorage) {
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
     // "selling":["",[Validators.required]],
      "priceSale":["",[Validators.required]],
      // "productImg1":["", Validators.pattern("(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?")],
      // "productImg2":["", Validators.pattern("(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?")],
      // "productImg3":["", Validators.pattern("(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?")],
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
    if(this.product.price !== this.product.priceSale){
      this.product.selling = 'sale';
    }else{
      this.product.selling = 'new';
    }
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
  onFileSelected(event: any) {
    const file = event.target.files[0];
    const filePath = file.name;
    const ref = this.storage.ref(filePath);
    const task = ref.put(file).then(data =>{
      console.log(data);
      getDownloadURL(data.ref).then(data =>{
        console.log(data);
        this.product.productImg1 = data;

      })
    }).catch(error =>{
      console.log(error);
    });
  }
  onFileSelected2(event: any) {
    const file = event.target.files[0];
    const filePath = file.name;
    const ref = this.storage.ref(filePath);
    const task = ref.put(file).then(data =>{
      console.log(data);
      getDownloadURL(data.ref).then(data =>{
        console.log(data);
        this.product.productImg2 = data;

      })
    }).catch(error =>{
      console.log(error);
    });
  }
  onFileSelected3(event: any) {
    const file = event.target.files[0];
    const filePath = file.name;
    const ref = this.storage.ref(filePath);
    const task = ref.put(file).then(data =>{
      console.log(data);
      getDownloadURL(data.ref).then(data =>{
        console.log(data);
        this.product.productImg3 = data;

      })
    }).catch(error =>{
      console.log(error);
    });
  }

}
