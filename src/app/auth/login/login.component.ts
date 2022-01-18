import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ng5-validation';
import { validateAllFormFields } from 'app/shared/utility/custom-validators';
import { AuthService } from 'app/shared/services/auth.service';
import { SharedDataService } from 'app/shared/services/shared-data.service';
import { Router } from '@angular/router';
import { UtilityService } from 'app/shared/utility/utility.service';
import { HttpResponse } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  isLoginSubmitted: boolean = false;
  loginForm = new FormGroup({
    email_id: new FormControl('', [
      Validators.required,
      CustomValidators.email
    ]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    private authService: AuthService,
    private sharedDataService: SharedDataService,
    private router: Router,
    private utility: UtilityService
  ) {}

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  onSubmit() {
    console.log("onSubmit dunction")
    this.isLoginSubmitted = true;
    if (this.loginForm.valid) {
      this.utility.loaderStart();
      this.authService
        .login(this.loginForm.value)
        .subscribe(
          (response: HttpResponse<any>) => {
            localStorage.setItem('token', response.headers.get('authtoken'));
            localStorage.setItem('adminId', JSON.stringify(response.body.data.id));
            localStorage.setItem('userPermission', JSON.stringify(response.body.data.subAdminPermission));
            localStorage.setItem('userName', JSON.stringify(response.body.data.first_name ? response.body.data.first_name: '' + response.body.data.last_name ? response.body.data.last_name : ''));
            this.sharedDataService.updateUserDataStore(response.body.data);
            this.router.navigateByUrl('/dashboard');
          },
          error => {
            this.utility.routingAccordingToError(error);
          }
        )
        .add(() => {
          this.utility.resetPage();
        });
    } else {
      validateAllFormFields(this.loginForm);
    }
  }
}
