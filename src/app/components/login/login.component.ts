import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { DataService } from 'src/app/service/data.service';
import { RestApiService } from 'src/app/service/rest-api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  employee: Employee;
  role: any;
  btnDisabled= false;
  errorMessage: string;
  successMessage: string;
  url='https://desolate-dusk-27866.herokuapp.com/api/v1/auth/user/login'
  constructor(private rest:RestApiService,
    private dataSer: DataService,
    private router: Router,
    private toastr: ToastrService) {
      this.employee= new Employee;
     // this.role = data.employee!.role;
     }

  ngOnInit() {
  }
  validate(){
    return true;
  }
  async login(){
    this.btnDisabled=true;
    if(this.validate()){
      this.rest.post(this.url,this.employee).then(async(data:any)=>{
        let value = (data as {user: string,token:string})
        console.log(data.data.user.role);
        this.successMessage = "Success";
        localStorage.setItem('tokens',value.token);
        const jsonData = JSON.stringify(data.data.user)
        localStorage.setItem('user',jsonData);
        await this.dataSer.getProfile();
        this.toastr.success('Login success');
        if(data.data.user.role === 'admin')
        { this.router.navigate(['/admin/home-admin'])
          return;}
        this.router.navigate(['/homes'])


      })
      .catch(error=>{
        this.dataSer.error('Incorrect email or password');
        this.errorMessage = 'Incorrect email or password'
        this.toastr.error('Incorrect email or password');
        this.btnDisabled=false;
      })
    }
  }


}
