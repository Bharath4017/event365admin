import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ErrorHandlerService } from 'app/shared/services/error-handler.service';
import { AuthService } from 'app/shared/services/auth.service';
import { SharedDataService } from 'app/shared/services/shared-data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UtilityService } from 'app/shared/utility/utility.service';
import {
  passwordMatchValidator,
  validateAllFormFields
} from 'app/shared/utility/custom-validators';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetStatus: boolean;
  resetPasswordForm: FormGroup;
  isResetPasswordSubmitted: boolean = false;
  verificationId: string;
  constructor(
    private loader: NgxUiLoaderService,
    private errorHandler: ErrorHandlerService,
    private authService: AuthService,
    private sharedDataService: SharedDataService,
    private router: Router,
    private utility: UtilityService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.resetStatus = false;

    this.activatedRoute.queryParams.subscribe(params => {
      this.verificationId = params['verifyLink'];
    });

    this.resetPasswordForm = new FormGroup(
      {
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8)
        ]),
        confirmPassword: new FormControl('', Validators.required)
      },
      { validators: passwordMatchValidator }
    );
  }

  resetPassword() {
    this.isResetPasswordSubmitted = true;
    if (this.resetPasswordForm.valid) {
      this.loader.start();
      const resetPasswordBody = {
        password: this.resetPasswordForm.controls.password.value
      };
      console.log("resetPasswordBody"+JSON.stringify(resetPasswordBody));
      this.authService
        .resetPassword(resetPasswordBody, this.verificationId)
        .subscribe(
          response => {
            this.messageService.add({
              severity: 'success',
              summary: `Password Updated`
            });
            this.utility.scrollToTop();
            this.resetStatus = true;
            this.loader.stop();
            console.log("response")
          },
          error => {
            this.errorHandler.routeAccordingToError(error);
            this.loader.stop();
          }
        );
      this.utility.scrollToTop();
    } else {
      validateAllFormFields(this.resetPasswordForm);
    }
  }
}
