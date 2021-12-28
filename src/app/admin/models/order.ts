export class Order {
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
  stateOrder!: string;
}
