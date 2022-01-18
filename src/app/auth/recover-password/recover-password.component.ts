import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ErrorHandlerService } from 'app/shared/services/error-handler.service';
import { AuthService } from 'app/shared/services/auth.service';
import { SharedDataService } from 'app/shared/services/shared-data.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UtilityService } from 'app/shared/utility/utility.service';
import { validateAllFormFields } from 'app/shared/utility/custom-validators';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {
  resetDone: boolean;
  recoverPasswordForm: FormGroup;
  isRecoverPasswordSubmitted: boolean = false;
  previousMail: string;
  constructor(
    private loader: NgxUiLoaderService,
    private errorHandler: ErrorHandlerService,
    private authService: AuthService,
    private utilityService: UtilityService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.resetDone = false;
    this.recoverPasswordForm = new FormGroup({
      email_id: new FormControl('', [
        Validators.required,
        this.utilityService.validateEmail
      ])
    });
  }

  onSubmitRecoverPassword() {
    this.isRecoverPasswordSubmitted = true;
    if (this.recoverPasswordForm.valid) {
      this.loader.start();
      this.previousMail = this.recoverPasswordForm.controls.email_id.value;
      this.authService
        .recoverPassword(this.recoverPasswordForm.value)
        .subscribe(
          success => {
            console.log(success);
            this.messageService.add({
              severity: 'success',
              summary: 'Verification Link Sent!'
            });
            this.resetDone = true;
            this.loader.stop();
          },
          error => {
            this.errorHandler.routeAccordingToError(error);
            this.loader.stop();
          }
        );
      this.utilityService.scrollToTop();
    } else {
      validateAllFormFields(this.recoverPasswordForm);
    }
  }

  resendLink() {
    this.isRecoverPasswordSubmitted = false;
    this.recoverPasswordForm.reset();
    this.resetDone = false;
  }
}
