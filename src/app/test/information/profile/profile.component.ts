import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee'
import { DataService } from 'src/app/service/data.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  emloyee: Employee;
  constructor(public data: DataService) { }

  ngOnInit() {
  }
  finishAndAlert( message: any){
    this.data.success(message);
    this.ngOnInit();
  }
}
