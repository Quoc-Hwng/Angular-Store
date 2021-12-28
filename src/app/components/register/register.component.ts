import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { DataService } from 'src/app/service/data.service';
import { RestApiService } from 'src/app/service/rest-api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  employee: Employee;
  saving= false;
  url='https://desolate-dusk-27866.herokuapp.com/api/v1/auth/register'
  constructor(private rest:RestApiService,
    private data: DataService,
    private router: Router) {
      this.employee= new Employee;
     }

  ngOnInit() {
  }
  validate(){
    return true;
  }
  async register(){
    this.saving=true;
    this.rest.post(this.url,this.employee)
      .then(data =>{
        this.saving=false;
        this.router.navigate(['/login'])
      }).catch(error =>{
        this.saving =false;
        this.data.error('mess')
      });
    }

}
