import { BehaviorSubject, Subscription, tap } from 'rxjs';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdressInputComponent } from '../../../components/adress-input/adress-input.component';
import { DateInputComponent } from '../../../components/date-input/date-input.component';
import { ToogleComponent } from '../../../components/toogle/toogle.component';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { State } from '../../../consts/interfaces/state.interface';
import { StateManagerService } from '../../../services/state-managment/state-manager.service';
import { InputOptions } from '../../../consts/interfaces/input-options.interface';
import { INPUT_OPTIONS } from '../../../consts/input-options/input-options';
import * as moment from 'moment';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { ROUTE_STEPS } from '../../../consts/steps/route-steps';
import { ProgressBarService } from '../../services/progress-bar.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    AdressInputComponent,
    DateInputComponent,
    ToogleComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './rent-reporting.component.html',
  styleUrls: ['./rent-reporting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RentReportingComponent implements OnInit, OnDestroy {
  public adressForm: FormGroup | undefined;
  public inputOptions: Record<string, InputOptions> = INPUT_OPTIONS;
  private subscription: Subscription | undefined;
  private state: BehaviorSubject<State | null> =
    new BehaviorSubject<State | null>(null);

  constructor(
    private fb: FormBuilder,
    private stateManagerService: StateManagerService,
    private authService: AuthService,
    private progressBarService: ProgressBarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription = new Subscription();
    this.adressForm = this.fb.group({
      isRenting: [false],
      currentAdress: [''],
      currentMoveInDate: [''],
    });

    this.subscription.add(
      this.stateManagerService.getData().subscribe((res) => {
        this.state.next(res);
        this.initializeForm();
      })
    );

    this.setProgressState();

    this.toogleDisabledState(
      this.adressForm?.controls['currentAdress'],
      this.adressForm?.controls['isRenting'].value
    );
    this.toogleDisabledState(
      this.adressForm?.controls['currentMoveInDate'],
      this.adressForm?.controls['isRenting'].value
    );

    this.checkYearDifference(
      this.adressForm?.controls['currentMoveInDate'].value
    );

    this.subscription.add(
      this.adressForm.controls['isRenting'].valueChanges.subscribe((res) => {
        this.toogleDisabledState(
          this.adressForm?.controls['currentAdress'],
          res
        );
        this.toogleDisabledState(
          this.adressForm?.controls['currentMoveInDate'],
          res
        );
        !res && this.adressForm?.markAsPristine();
      })
    );

    this.subscription.add(
      this.adressForm.controls['currentMoveInDate'].valueChanges.subscribe(
        (res) => {
          this.checkYearDifference(res);
        }
      )
    );

    this.subscription.add(
      this.adressForm.valueChanges.subscribe((res) => {
        this.setProgressState();
      })
    );
  }

  public onContinueClick() {
    const currentAddress = {
      ...this.adressForm?.controls['currentAdress'].value,
      moveInDate: moment(
        this.adressForm?.controls['currentMoveInDate'].value
      ).format('MM/DD/YYYY'),
    };

    const payload = [currentAddress];

    const previousAddress = this.adressForm?.controls['previousAdress'];
    const previousMoveInDate = this.adressForm?.controls['previousMoveInDate'];
    const previousMoveOutDate =
      this.adressForm?.controls['previousMoveOutDate'];

    if (previousAddress && previousMoveInDate && previousMoveOutDate) {
      const previousAddressData = {
        ...previousAddress.value,
        moveInDate: moment(previousMoveInDate.value).format('MM/DD/YYYY'),
        moveOutDate: moment(previousMoveOutDate.value).format('MM/DD/YYYY'),
      };

      payload.push(previousAddressData);
    }
    this.subscription?.add(
      this.authService.updateUserAdresses(payload).subscribe((res) => {
        this.router.navigate([ROUTE_STEPS[res.data.next].route]);
      })
    );
  }

  private checkYearDifference(value: string): void {
    const difference = this.getYearDifference(value);
    difference != null && difference < 2
      ? this.addPreviousControls()
      : this.removePreviousControls();
  }

  private addPreviousControls(): void {
    this.adressForm?.addControl('previousAdress', this.fb.control(''));
    this.adressForm?.addControl('previousMoveInDate', this.fb.control(''));
    this.adressForm?.addControl('previousMoveOutDate', this.fb.control(''));
    this.adressForm?.markAsPristine();
  }

  private removePreviousControls(): void {
    this.adressForm?.removeControl('previousAdress');
    this.adressForm?.removeControl('previousMoveInDate');
    this.adressForm?.removeControl('previousMoveOutDate');
  }

  private toogleDisabledState(
    control: AbstractControl | undefined,
    value: boolean
  ): void {
    value
      ? control?.disable({ emitEvent: false })
      : control?.enable({ emitEvent: false });
  }

  private getYearDifference(date: string | undefined): number | null {
    if (!date) {
      return null;
    }
    var timeDiff = Math.abs(new Date().getTime() - new Date(date).getTime());
    return Math.floor(timeDiff / 31536000000);
  }

  private initializeForm() {
    const currentAddress = this.state.value?.user?.addresses?.find(
      (address) => address.type.toLowerCase() == 'current'
    );
    const previousAddress = this.state.value?.user?.addresses?.find(
      (address) => address.type.toLowerCase() == 'previous'
    );
    if (currentAddress) {
      this.adressForm?.patchValue({
        currentAdress: currentAddress,
      });
    }
    if (previousAddress) {
      this.adressForm?.patchValue({
        previousAddress: previousAddress,
      });
    }
  }

  private setProgressState() {
    this.progressBarService.setState({
      display: true,
      activeStep: 'rent-reporting',
      primaryButton: {
        disabled: !!this.adressForm?.invalid || !this.adressForm?.dirty,
        text: 'Continue',
        action: () => this.onContinueClick(),
      },
      secondaryButton: {
        disabled: false,
        text: 'Back',
        action: () => this.router.navigate(['/register/verification']),
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
