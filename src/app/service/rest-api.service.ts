import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

constructor(private http: HttpClient, private router: Router) {}
getHeaders(){
  const tokens = localStorage.getItem('tokens');

  return tokens? new HttpHeaders().set('Authorization','Bearer ' + tokens) : null;
}
get(link:string){
  let headers = this.getHeaders();
  if(headers instanceof HttpHeaders)
    return this.http.get(link +'/', {headers: headers}).toPromise();
  return this.http.get(link +'/').toPromise();
}
getOder(link:string, page:number,size: number, status: string){
  let headers = this.getHeaders();
  if(headers instanceof HttpHeaders)
    return this.http.get(link+'/'+status +'?page='+ page+'&&size='+size, {headers: headers}).toPromise();
 return this.router.navigate(['/login'])
}
searchOder(link: string,key:string,status: string){
  let headers= this.getHeaders();
  if(headers instanceof HttpHeaders)
    return this.http.get(link +'/'+status+key, {headers: headers}).toPromise();
  return this.http.get(link +'/'+key ).toPromise();
}
filter(link: string,option?:{status?: string, gender?: string, selling?:string,color?: string,price1?: number,price2?:number,brand?: string,size?: number}){
  let headers= this.getHeaders();
  let param = new HttpParams();
  if(option){
    if(option.status){
      param = param.set("status",option.status);
    }
    if(option.gender){
      param =param.set("gender",option.gender);
    }
    if(option.selling){
      param =param.set("selling",option.selling);
    }
    if(option.color){
      param =param.set("colour",option.color);
    }
    if(option.price1){
      param =param.set("price[gte]",option.price1);
    }
    if(option.price2){
      param =param.set("price[lte]",option.price2);
    }
    if(option.brand){
      param =param.set("brand",option.brand);
    }
    if(option.size){
      param =param.set("size",option.size);
    }
  }
  console.log(option);
  if(headers instanceof HttpHeaders)
    return this.http.get(link, {headers: headers,params:param}).toPromise();
  return this.http.get(link,{params: param} ).toPromise();
}
paginate(link: string,option?:{page?: number,limit?: number}){
  let headers= this.getHeaders();
  let param = new HttpParams();
  if(option){
    if(option.page)
    {param = param.set("page",option.page);}
    if(option.limit)
    {param = param.set("limit",option.limit)}
  }
  if(headers instanceof HttpHeaders)
    return this.http.get(link, {headers: headers,params:param}).toPromise();
  return this.http.get(link,{params: param} ).toPromise();
}
search(link: string,key:string){
  let headers= this.getHeaders();
  if(headers instanceof HttpHeaders)
    return this.http.get(link +'/'+key, {headers: headers}).toPromise();
  return this.http.get(link +'/'+key ).toPromise();
}
getOne(link: string,id:string){
  let headers= this.getHeaders();
  if(headers instanceof HttpHeaders)
    return this.http.get(link +'/'+id, {headers: headers}).toPromise();
  return this.http.get(link +'/'+id ).toPromise();
}
post(link: string, body: any){
  let headers= this.getHeaders();
  if(headers instanceof HttpHeaders)
    return this.http.post(link,body, {headers: headers}).toPromise();
  return this.http.post(link,body).toPromise();
}
put(link: string,id: string, body: any){
  let headers= this.getHeaders();
  if(headers instanceof HttpHeaders)
    return this.http.put(link +'/'+id ,body, {headers: headers}).toPromise();
  return this.http.put(link +'/'+id ,body).toPromise();
}
delete(link: string , id: string){
  let headers= this.getHeaders();
  if(headers instanceof HttpHeaders)
    return this.http.delete(link +'/'+ id, {headers: headers}).toPromise();
  return this.http.delete(link +'/'+ id ).toPromise();
}
patch(link: string, body: any){
  let headers= this.getHeaders();
  if(headers instanceof HttpHeaders)
    return this.http.patch(link,body, {headers: headers}).toPromise();
  return this.http.patch(link,body).toPromise();
}
patchToken(link: string,token: string,body: any){
  let headers= this.getHeaders();
  if(headers instanceof HttpHeaders)
    return this.http.patch(link +'/'+ token,body, {headers: headers}).toPromise();
  return this.http.patch(link +'/'+ token,body).toPromise();
}

}
