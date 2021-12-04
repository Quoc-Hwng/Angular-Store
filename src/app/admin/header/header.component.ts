import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../models/employee';
import { DataService } from 'src/app/service/data.service';
import { RestApiService } from 'src/app/service/rest-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  refreshToken='';
  employee:Employee
  url='http://localhost:3000/api/v1/auth/logout'
  constructor( private data: DataService,private router: Router
    ,private rest:RestApiService) {

  }
  ngOnInit(): void {
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
  logout(){
    const token = localStorage.getItem('tokens')
    console.log(token)
    this.refreshToken!= token;
    console.log(this.refreshToken)
    console.log(token);
    localStorage.clear();
    this.router.navigate(['/login']);
    // if(token) {
    //   this.rest.delete(this.url,token).then(data=>{
    //   localStorage.clear();
    //   this.router.navigate(['/login']);
    //   console.log(data);
    //   console.log(token);
    //   })
    // }
  }
}
