import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin.component';
import { LoginRoutingModule } from './signin-routing.module';
import { InputComponent } from '../components/input/input.component';
import { PasswordInputComponent } from '../components/password-input/password-input.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SigninComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    InputComponent,
    PasswordInputComponent,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class LoginModule {}
