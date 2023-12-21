import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../../../components/input/input.component';
import { InputOptions } from '../../../consts/interfaces/input-options.interface';
import { INPUT_OPTIONS } from '../../../consts/input-options/input-options';
import { AdressInputComponent } from '../../../components/adress-input/adress-input.component';
import { PromoInputComponent } from '../../../components/promo-input/promo-input.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PaymentService } from '../../../services/payment.service';
import { Subscription, switchMap, map, Observable, share, tap } from 'rxjs';
import { SubscriptionPackage } from '../../../consts/interfaces/subscription-package.interface';
import { ProgressBarService } from '../../services/progress-bar.service';
import { Router } from '@angular/router';
import { ROUTE_STEPS } from '../../../consts/steps/route-steps';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    InputComponent,
    AdressInputComponent,
    PromoInputComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentComponent implements OnInit, OnDestroy {
  public inputOption: Record<string, InputOptions> = INPUT_OPTIONS;
  public paymentForm: FormGroup | undefined;
  public selectedPackage: Observable<SubscriptionPackage> | undefined;
  private subscription: Subscription = new Subscription();
  private selectedPackageBuffer: SubscriptionPackage | undefined;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private paymentService: PaymentService,
    private progressBarService: ProgressBarService
  ) {}

  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      cardName: ['', [Validators.required]],
      expirationDate: ['', [Validators.required]],
      billingAdress: [
        {
          city: '',
          state: '',
          streetAddress: '',
          type: 'CURRENT',
          zipCode: '',
        },
        [Validators.required],
      ],
      promo: [''],
    });
    this.selectedPackage = this.paymentService.getPlans('lite').pipe(
      map((res) => res.data.subscriptionList[0]),
      tap((res) => (this.selectedPackageBuffer = res)),
      tap(() => this.setProgressState()),
      share()
    );

    this.subscription.add(
      this.paymentForm.valueChanges.subscribe((res) => this.setProgressState())
    );
    this.setProgressState();
  }

  public onContinue() {
    const [month, year] =
      this.paymentForm?.controls['expirationDate'].value.split('/');
    const { cardName, ...form } = this.paymentForm?.value;
  }

  private setProgressState() {
    this.progressBarService.setState({
      display: true,
      activeStep: 'payment',
      primaryButton: {
        disabled: !!this.paymentForm?.invalid || !this.paymentForm?.dirty,
        text: `Pay ${
          this.selectedPackageBuffer?.amount_discount
            ? this.selectedPackageBuffer?.amount_discount
            : ''
        }`,
        action: () => this.onContinue(),
      },
      secondaryButton: {
        disabled: false,
        text: 'Back',
        action: () => this.router.navigate(['/register/rent-reporting']),
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
