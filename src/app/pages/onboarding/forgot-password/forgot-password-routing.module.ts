import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password.component';
import { ForgotPasswordSentComponent } from './forgot-password-sent/forgot-password-sent.component';
import { ForgotPasswordChangeComponent } from './forgot-password-change/forgot-password-change.component';
import { ForgotPasswordSuccessComponent } from './forgot-password-success/forgot-password-success.component';

const routes: Routes = [
  {
    path: '',
    component: ForgotPasswordComponent,
  },
  {
    path: 'sent',
    component: ForgotPasswordSentComponent,
  },
  {
    path: 'change',
    component: ForgotPasswordChangeComponent,
  },
  {
    path: 'success',
    component: ForgotPasswordSuccessComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForgotPasswordRoutingModule {}
