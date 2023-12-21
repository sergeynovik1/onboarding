import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PasswordInputComponent } from '../../../components/password-input/password-input.component';
import { PhoneInputComponent } from '../../../components/phone-input/phone-input.component';
import { Router, RouterModule } from '@angular/router';
import { InputComponent } from '../../../components/input/input.component';
import { InputOptions } from '../../../consts/interfaces/input-options.interface';
import { INPUT_OPTIONS } from '../../../consts/input-options/input-options';
import { AuthService } from '../../../services/auth.service';
import { passwordMatchValidator } from '../../../consts/validators/password-match.validator';
import { ROUTE_STEPS } from '../../../consts/steps/route-steps';
import { Subscription } from 'rxjs';
import { ProgressBarService } from '../../services/progress-bar.service';

@Component({
  templateUrl: './create-account-auto.component.html',
  styleUrls: ['./create-account-auto.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    PasswordInputComponent,
    PhoneInputComponent,
    ReactiveFormsModule,
    RouterModule,
    InputComponent,
    RouterModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateAccountAutoComponent implements OnInit, OnDestroy {
  public createAccountForm: FormGroup | undefined;
  public inputOptions: Record<string, InputOptions> = INPUT_OPTIONS;
  private subscription: Subscription | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private progressBarService: ProgressBarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription = new Subscription();

    this.createAccountForm = this.formBuilder.group(
      {
        phoneNumber: [''],
        dob: [''],
        zipCode: [''],
        password: [''],
        rePassword: [''],
      },
      {
        validators: passwordMatchValidator,
      }
    );

    this.progressBarService.setState({
      display: false,
    });
  }

  public autoSignUp() {
    const { rePassword, ...payload } = this.createAccountForm?.value;
    this.subscription?.add(
      this.authService.autoSignup(payload).subscribe((res) => {
        this.router.navigate([ROUTE_STEPS[res.data.next].route]);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
