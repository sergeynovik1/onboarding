import { AuthService } from './../../../services/auth.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../../../components/input/input.component';
import { PhoneInputComponent } from '../../../components/phone-input/phone-input.component';
import { AdressInputComponent } from '../../../components/adress-input/adress-input.component';
import { DateInputComponent } from '../../../components/date-input/date-input.component';
import { InputOptions } from '../../../consts/interfaces/input-options.interface';
import { INPUT_OPTIONS } from '../../../consts/input-options/input-options';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Subscription, BehaviorSubject } from 'rxjs';
import { StateManagerService } from '../../../services/state-managment/state-manager.service';
import { State } from '../../../consts/interfaces/state.interface';
import * as moment from 'moment';
import { ProgressBarService } from '../../services/progress-bar.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    InputComponent,
    PhoneInputComponent,
    AdressInputComponent,
    DateInputComponent,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './info-edit.component.html',
  styleUrls: ['./info-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoEditComponent implements OnInit {
  public inputOptions: Record<string, InputOptions> = INPUT_OPTIONS;
  public editForm: FormGroup | undefined;
  private subscription: Subscription = new Subscription();
  private state: BehaviorSubject<State | null> =
    new BehaviorSubject<State | null>(null);

  constructor(
    private fb: FormBuilder,
    private stateManagerService: StateManagerService,
    private progressBarService: ProgressBarService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.editForm = this.fb.group({
      id: [''],
      firstName: [''],
      lastName: [''],
      mobile: [''],
      email: [''],
      address: [''],
      birthDate: [''],
      ssn: [''],
    });

    this.subscription.add(
      this.stateManagerService.getData().subscribe((res) => {
        this.state.next(res);
        this.initializeForm();
      })
    );
    this.setProgressState();
  }

  public updateUser() {
    const { address, birthDate, mobile, ...user } = this.editForm?.value;
    const payload = {
      ...user,
      mobile: `${mobile}`,
      addresses: [address],
      dob: moment(birthDate).format('MM/DD/YYYY'),
    };
    this.subscription.add(
      this.authService
        .updateUser({
          ...payload,
        })
        .subscribe((res) => {
          this.stateManagerService.setData('user', { ...payload });
          this.router.navigate(['/register/info/check']);
        })
    );
  }

  private initializeForm() {
    if (
      this.state.value &&
      this.state.value.user &&
      this.state.value.user.dob &&
      this.state.value.user.addresses
    ) {
      this.editForm?.patchValue({
        ...this.state.value.user,
        mobile: this.state.value.user.mobile?.substring(1),
        address: this.state.value.user.addresses[0],
        birthDate: new Date(this.state.value.user.dob),
      });
    }
  }

  private setProgressState() {
    this.progressBarService.setState({
      display: false,
    });
  }
}
