import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = 'https://desolate-dusk-27866.herokuapp.com/api/v1/user/product';
  url1= 'https://desolate-dusk-27866.herokuapp.com/api/v1/auth';
  url2='https://desolate-dusk-27866.herokuapp.com/api/v1/user/product/edit';

constructor(private httpClient: HttpClient) {

}
getAll(){
  return this.httpClient.get(this.url)
}
getProById(id: any){
  return this.httpClient.get(this.url2+'/'+id)
}
getUserById(id: any){
  return  this.httpClient.get(this.url1+'/'+id);
}
getProduct(url:any){
  return this.httpClient.get<any>(url)
  .pipe(map((res:any)=>{
    return res;
  }))
}
}
