import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { RestApiService } from 'src/app/service/rest-api.service';
import { DataService } from 'src/app/service/data.service';
import { Brand } from '../models/brand';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {

  brands!: Brand[];
  btnDisabled= false;
  url='http://localhost:3000/api/v1/admin/brand'

  deleteId!:string;
  confirmMessage='';
  key='';

  confirmDeleteBrand(confirmDialog: TemplateRef<any>, id: string, nameBrand: string){
    this.confirmMessage = `Bạn thật sự muốn xóa thương hiệu ${nameBrand}` ;
    this.deleteId =id;
    this.modalService.open(confirmDialog, {ariaDescribedBy: 'modal-basic-title'}).result.then((result)=>{
      this.deleteId='';
    },(err)=>{

    })
  }
  search(keys: string){
    if (keys!==''){
      this.key=keys;
      this.ngOnInit();
    }
  }

  constructor(private rest:RestApiService,
    private data: DataService,
    private modalService: NgbModal) {
     }

  ngOnInit() {
    this.btnDisabled=true;
    if(this.key==''){
    this.rest.get(this.url).then(data=>{
        this.brands =( data as {brands: Brand[]}).brands;
        this.btnDisabled=false;
      })
      .catch(error=>{
        this.data.error('Lỗi');
      })
    }else{
      this.rest.search(this.url,this.key).then(data=>{
        this.brands =( data as {brands: Brand[]}).brands;
        this.btnDisabled=false;
      })
      .catch(error=>{
        this.data.error('lỗi');
      })
    }
  }
  Search(){
    if(this.key==''){
      this.ngOnInit();
    }else{
      this.brands = this.brands.filter(res=>{
        return res.nameBrand.toLocaleLowerCase().match(this.key.toLocaleLowerCase())
      })
    }
  }
  delete(){
    if (this.deleteId!==''){
      this.rest.delete(this.url,this.deleteId).then(data =>{
        this.modalService.dismissAll();
        this.ngOnInit();
      })
      .catch(error=>{
        this.data.error(error['message']);
      })
    }
  }

  finishAndAlert( message: string){
    this.data.success(message);
    this.ngOnInit();
  }

}
