import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { RestApiService } from 'src/app/service/rest-api.service';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  employee: Employee[];
  size = 5;
  sizes = 5;
  page = 1;
  pages = 1;
  key = '';
  url = 'http://localhost:3000/api/v1/users'
  constructor(private rest: RestApiService,private data: DataService) { }
  search(keys: string) {
    if (keys !== '') {
      this.key = keys;
      this.ngOnInit();
    }
  }
  Loadpage(pages: number) {
    console.log(pages)
    if (pages > 0) {
      this.page = pages;
      this.pages = pages
      this.ngOnInit()
    }
  }
  Loadsize(sizes:number){
    console.log(sizes)
    if(sizes>4){
      this.size=sizes;
      this.sizes=sizes;
      this.ngOnInit();
    }
  }
  ngOnInit(): void {
    if (this.key == '') {
      this.rest.gets(this.url, this.page, this.size).then(data => {
        this.employee = (data as { employee: Employee[] }).employee;
      })
        .catch(error => {
          this.data.error(error['message']);
        })
    } else {
      this.rest.search(this.url, this.key).then(data => {
        this.employee = (data as { employee: Employee[] }).employee;
      })
        .catch(error => {
          this.data.error(error['message']);
        })
    }
  }

}
