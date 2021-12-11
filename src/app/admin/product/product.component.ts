import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Product } from 'src/app/models/product';
import { DataService } from 'src/app/service/data.service';
import { RestApiService } from 'src/app/service/rest-api.service';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  product!: Product[];
  btnDisabled= false;
  url='http://localhost:3000/api/v1/admin/product'
  url1 = 'http://localhost:3000/api/products'
  deleteId!:string;
  confirmMessage='';
  key='';
  size=5;
  limit=5;
  page=1;
  pages=1;

  confirmDeleteProduct(confirmDialog: TemplateRef<any>, id: string, productCode: string){
    this.confirmMessage = `Bạn thật sự muốn xóa sản phẩm này ${productCode}` ;
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
    private modalService: NgbModal,
    private cartService: CartService,
    private productService: ProductService,
    private _router: Router,
    private route: ActivatedRoute) {
     }
     navigatePage(page: number,limit: number){
      this._router.navigate([], {
       relativeTo: this.route,
       queryParams: {
         page: page,
         limit: limit,
       },
       queryParamsHandling: 'merge',
       skipLocationChange: false
     });
    }
  ngOnInit() {
    this.btnDisabled=true;
   /*  this.rest.get(this.url).then(data=>{
      this.product =( data as {product: Product[]}).product;
      this.btnDisabled=false;
    })
    .catch(error=>{
      this.data.error(error['message']);
    }) */
    if(this.key===''){
      this.route.queryParams
      .subscribe(params => {
        this.page = params.page;
        this.limit = params.limit;
      this.rest.paginate(this.url1,{page:this.page,limit:this.limit}).then((data:any)=>{
        this.product =( data.data.data as Product[]);
     //   this.product = (data as {product: Product[]}).product;
        console.log(data);
        this.btnDisabled=false;
      })
      .catch(error=>{
        this.data.error(error['message']);
      })})
    }else{
      this.route.queryParams
      .subscribe(params => {
        this.page = params.page;
        this.limit = params.limit;
      this.rest.paginateSearch(this.url1,this.key,{page:this.page,limit:this.limit}).then((data:any)=>{
      //  this.product =data.data.data as Product[];
       this.product = (data as {product: Product[]}).product;
        this.btnDisabled=false;
      })
      .catch(error=>{
        this.data.error(error['message']);
      })})
    }
  }
  Search(){
    if(this.key===''){
      this.ngOnInit();
    }else{
      this.product = this.product.filter(res=>{
        return res.productCode.toLocaleLowerCase().match(this.key.toLocaleLowerCase())
      })
    }
  }
  Loadpage(pages:number){
    console.log(pages)
      if(pages>0){
        this.page = pages;
        this.pages=pages
   //     this.ngOnInit()
      }
  }
  Loadsize(limit:number){
    console.log(limit)
    if(limit>4){
      this.size=limit;
      this.limit=limit;
 //     this.ngOnInit();
    }
  }
  finishAndAlert( message: string){
    this.data.success(message);
    this.ngOnInit();
  }
  deleteProduct(){
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

}
