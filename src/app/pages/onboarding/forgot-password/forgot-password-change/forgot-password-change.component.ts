import { ResetPasswordService } from './../services/reset-password.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password-change',
  templateUrl: './forgot-password-change.component.html',
  styleUrls: ['./forgot-password-change.component.scss'],
})
export class ForgotPasswordChangeComponent implements OnInit {
  public form: FormGroup | undefined;

  constructor(
    private fb: FormBuilder,
    private resetPasswordService: ResetPasswordService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      password: [''],
      rePassword: [''],
    });
  }

  public onChangePassword() {
    this.resetPasswordService
      .changePassword({ ...this.form?.value })
      .subscribe((res) => {
        this.router.navigate(['/reset-password/success']);
      });
  }
}
