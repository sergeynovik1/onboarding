import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputOptions } from '../../../consts/interfaces/input-options.interface';
import { INPUT_OPTIONS } from './../../../consts/input-options/input-options';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhoneInputComponent } from '../../../components/phone-input/phone-input.component';
import { PasswordInputComponent } from '../../../components/password-input/password-input.component';
import { InputComponent } from '../../../components/input/input.component';
import { DateInputComponent } from '../../../components/date-input/date-input.component';
import { AdressInputComponent } from '../../../components/adress-input/adress-input.component';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { ProgressBarService } from '../../services/progress-bar.service';
import { ROUTE_STEPS } from '../../../consts/steps/route-steps';

@Component({
  selector: 'app-create-account-manually',
  templateUrl: './create-account-manually.component.html',
  styleUrls: ['./create-account-manually.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    PhoneInputComponent,
    PasswordInputComponent,
    InputComponent,
    DateInputComponent,
    AdressInputComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateAccountManuallyComponent implements OnInit, OnDestroy {
  public inputOptions: Record<string, InputOptions> = INPUT_OPTIONS;
  public createAccountForm: FormGroup | undefined;
  private subscription: Subscription | undefined;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private progressBarService: ProgressBarService
  ) {}

  ngOnInit(): void {
    this.subscription = new Subscription();
    this.createAccountForm = this.fb.group({
      firstName: ['', []],
      lastName: ['', []],
      mobile: ['', []],
      email: ['', []],
      address: [
        {
          city: '',
          state: '',
          streetAddress: '',
          type: 'CURRENT',
          zipCode: '',
        },
        [],
      ],
      birthDate: ['', []],
      ssn: ['', []],
      password: ['', []],
      rePassword: ['', []],
    });

    this.subscription.add(
      this.createAccountForm.valueChanges.subscribe(() =>
        this.setProgressState()
      )
    );

    this.setProgressState();
  }

  public signUp() {
    this.subscription?.add(
      this.authService
        .manualSignup({
          ...(({ address, birthDate, mobile, rePassword, ...user }) => ({
            ...user,
            phoneNumber: `${mobile}`,
            addresses: [(({ adress, ...addrs }) => addrs)(address)],
            dob: moment(birthDate).format('YYYY-MM-DD'),
          }))(this.createAccountForm?.value),
        })
        .subscribe((res) =>
          this.router.navigate([ROUTE_STEPS[res.data.next].route])
        )
    );
  }

  private setProgressState() {
    this.progressBarService.setState({
      display: true,
      activeStep: 'create-account-manually',
      primaryButton: {
        disabled:
          !!this.createAccountForm?.invalid || !this.createAccountForm?.dirty,
        text: 'Sign Up',
        action: () => this.signUp(),
      },
      secondaryButton: {
        disabled: false,
        text: 'Back',
        action: () => this.router.navigate(['/register/create-account/auto']),
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
