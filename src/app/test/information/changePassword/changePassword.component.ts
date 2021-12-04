import { RestApiService } from 'src/app/service/rest-api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-changePassword',
  templateUrl: './changePassword.component.html',
  styleUrls: ['./changePassword.component.css']
})
export class ChangePasswordComponent implements OnInit {
  url='http://localhost:3000/api/v1/auth/user/updateMyPassword';
  updatePasswordForm: FormGroup;
  passwordCurrent: FormControl;
  password: FormControl;
  cnewPassword: FormControl;
  successMessage: string;
  errorMessage: string;
  constructor(private fb: FormBuilder,
    private rest: RestApiService,
    private dataService: DataService,
    private router: Router) { }

  ngOnInit() {
    this.updatePasswordForm = new FormGroup({
      'passwordCurrent': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required]),
    });
    // this.passwordCurrent = new FormControl('',[Validators.required]);
    // this.password = new FormControl('',[Validators.required]);
    // this.cnewPassword = new FormControl('',[Validators.required]);
  }
  changePassword(data: any) { // change any to what this post request will return
    console.log(data);
  // const submitData = {
  //   token:  localStorage.getItem('tokens'),
  //   ['passwordCurrent']: data.passwordCurrent,
  //   ['password']: data.password,
  // };
  // return this.rest.post(this.url, submitData);
  if (data) {
    console.log(this.updatePasswordForm.value)
    this.rest.patch(this.url,this.updatePasswordForm.value).then(data => {
        this.updatePasswordForm.reset();
        this.successMessage = "Change password sucessfully.";
        setTimeout(() => {
          this.successMessage = '';
          this.router.navigate(['/login']);
          localStorage.removeItem('tokens');
        }, 3000);
      },
      err => {

        if (err.error.message) {
          this.errorMessage = err.error.message;
          console.log(this.errorMessage);
        }
      }
    );
  }
}

}
