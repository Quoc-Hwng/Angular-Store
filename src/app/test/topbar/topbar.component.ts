import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  public searchTerm : string = '';
  constructor(private cartService: CartService, public data: DataService) {
    this.data.getProfile();
   }
  ngOnInit() {
  }
  search(event: any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.cartService.search.next(this.searchTerm);
  }
  logout(){
    this.data.employee = null;
    localStorage.removeItem('tokens');
  }

}
