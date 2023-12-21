import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from './forgot-password.component';
import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { InputComponent } from '../components/input/input.component';
import { ForgotPasswordSentComponent } from './forgot-password-sent/forgot-password-sent.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResetPasswordService } from './services/reset-password.service';
import { ForgotPasswordChangeComponent } from './forgot-password-change/forgot-password-change.component';
import { PasswordInputComponent } from '../components/password-input/password-input.component';
import { ForgotPasswordSuccessComponent } from './forgot-password-success/forgot-password-success.component';

@NgModule({
  declarations: [
    ForgotPasswordComponent,
    ForgotPasswordSentComponent,
    ForgotPasswordChangeComponent,
    ForgotPasswordSuccessComponent,
  ],
  imports: [
    CommonModule,
    ForgotPasswordRoutingModule,
    InputComponent,
    FormsModule,
    ReactiveFormsModule,
    PasswordInputComponent,
  ],
  providers: [ResetPasswordService],
})
export class ForgotPasswordModule {}
