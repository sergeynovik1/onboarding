import { ResetPasswordService } from './../services/reset-password.service';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './forgot-password-sent.component.html',
  styleUrls: ['./forgot-password-sent.component.scss'],
})
export class ForgotPasswordSentComponent implements OnInit {
  public email: string | undefined;

  constructor(private resetPasswordService: ResetPasswordService) {}

  ngOnInit(): void {
    this.email = this.resetPasswordService.getState()?.email;
  }
}
