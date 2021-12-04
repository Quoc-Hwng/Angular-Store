import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from 'src/app/service/rest-api.service';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  url='http://localhost:3000/api/v1/auth/user/resetPassword';
  resetPasswordForm: FormGroup;
  password: FormControl;
  successMessage: string;
  errorMessage: string;
  token: string;
  constructor(private fb: FormBuilder,
    private rest: RestApiService,
    private dataService: DataService,
    private router: Router, private route: ActivatedRoute) {
      this.token = route.snapshot.params['token'];
    }

  ngOnInit() {
    this.resetPasswordForm = new FormGroup({
      'password': new FormControl(null, [Validators.required]),
    });
  }
  changePassword(data: any) { // change any to what this post request will return
    console.log(data);
  if (data) {
    console.log(this.resetPasswordForm.value)
    this.rest.patchToken(this.url,this.token,this.resetPasswordForm.value).then(data => {
        this.resetPasswordForm.reset();
        this.successMessage = "Reset password sucessfully.";
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
