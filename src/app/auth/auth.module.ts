import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from 'app/shared/shared.module';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng5-validation';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule
  ],
  declarations: [LoginComponent, RecoverPasswordComponent, ResetPasswordComponent]
})
export class AuthModule { }
