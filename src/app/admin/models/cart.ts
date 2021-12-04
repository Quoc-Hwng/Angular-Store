import { ArrayType } from "@angular/compiler";

export class Cart{
    id!: string
    idCustomer!: string;
    products!:[
        {
            productName:string;
            productCode:string;
            quality:number;
            price:number;
        }
    ];
    total!:string;
  }
  