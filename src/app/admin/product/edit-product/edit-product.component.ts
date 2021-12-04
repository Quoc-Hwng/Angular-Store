import { RestApiService } from 'src/app/service/rest-api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { Product } from 'src/app/models/product';
import { DataService } from 'src/app/service/data.service';
import { Brand } from 'src/app/models/brand';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  doing=false;
  product: Product;
  url1='http://localhost:3000/api/v1/admin/product/edit'

  brand!: Brand[];
  btnDisabled= false;
  url='http://localhost:3000/api/v1/admin/brand'

  @Input("id")
  editId!: string;

  @Output()
  updateFinished: EventEmitter<string> = new EventEmitter<string>();

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
    if(this.editId!==''){
    this.doing=true;
    this.rest.getOne(this.url1,this.editId)
      .then(data =>{
        this.doing=false;
        this.product =(data as {product: Product}).product;
      }).catch(error =>{
        this.doing =false;
        this.data.error(error['message'])
      });
      this.btnDisabled=true;
    this.rest.get(this.url).then(data=>{
        this.brand =( data as {brands: Brand[]}).brands;
        this.btnDisabled=false;
      })
      .catch(error=>{
        this.data.error(error['message']);
      })
    }
  }
  open(content: TemplateRef<any>){
    this.modelService.open(content, {ariaDescribedBy: 'modal-basic-title'});
  }
  update(){
    this.doing=true;
    this.rest.put(this.url1,this.editId,this.product)
      .then(data =>{
        this.doing=false;
        this.updateFinished.emit('product is update')
        this.modelService.dismissAll();
        this.product = new Product();
      }).catch(error =>{
        this.doing =false;
        this.data.error(error['lỗi'])
      });

  }

}
