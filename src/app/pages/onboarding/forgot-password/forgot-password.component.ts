import { Component, OnDestroy, OnInit } from '@angular/core';
import { InputOptions } from '../consts/interfaces/input-options.interface';
import { INPUT_OPTIONS } from '../consts/input-options/input-options';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ResetPasswordService } from './services/reset-password.service';
import { Subscription, tap } from 'rxjs';

@Component({
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  public inputOptions: Record<string, InputOptions> = INPUT_OPTIONS;
  public resetForm: FormGroup | undefined;
  private subscription: Subscription | undefined;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private resetPasswordService: ResetPasswordService
  ) {}

  ngOnInit(): void {
    this.resetForm = this.fb.group({
      email: ['', []],
    });
  }

  public onReset() {
    this.resetPasswordService
      .sendResendPassword({ ...this.resetForm?.value })
      .pipe(
        tap(() =>
          this.resetPasswordService.setState({
            email: this.resetForm?.controls['email'].value,
          })
        )
      )
      .subscribe(() => {
        this.router.navigate(['/reset-password/sent']);
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
