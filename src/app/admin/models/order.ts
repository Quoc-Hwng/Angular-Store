export class Order {
  // id!:string
  // lastName!: string;
  // firstName!: string;
  // email!:string;
  // phone!: string;
  // image!:string;
  // password!:string;
  // address!:string;
  // country!:string;
  // city!:string;
  // status!:string;
  // idCart!:string;
  // idUser!:string;
  id!: string;
  user!: string;
  displayName!:string;
  email!:string;
  phone!:number;
  address!:string;
  state!:string;
  products:any[] ;
  total: number;
  timeOrder: Date;
}
