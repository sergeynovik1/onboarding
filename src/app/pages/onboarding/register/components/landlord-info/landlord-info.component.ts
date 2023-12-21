import { ProgressBarService } from './../../services/progress-bar.service';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { SelectInputComponent } from '../../../components/select-input/select-input.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { InputComponent } from '../../../components/input/input.component';
import { InputOptions } from '../../../consts/interfaces/input-options.interface';
import { INPUT_OPTIONS } from '../../../consts/input-options/input-options';
import { PhoneInputComponent } from '../../../components/phone-input/phone-input.component';
import { BehaviorSubject, Subscription } from 'rxjs';
import { State } from '../../../consts/interfaces/state.interface';
import { StateManagerService } from '../../../services/state-managment/state-manager.service';
import { Address } from '../../../consts/interfaces/user.interface';
import { LandlordService } from '../../../services/landlord.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-landlord-info',
  standalone: true,
  imports: [
    CommonModule,
    SelectInputComponent,
    ReactiveFormsModule,
    FormsModule,
    InputComponent,
    PhoneInputComponent,
  ],
  templateUrl: './landlord-info.component.html',
  styleUrls: ['./landlord-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandlordInfoComponent implements OnInit, OnDestroy {
  public form: FormGroup | undefined;
  public options = ['PMC', 'Individual', 'Management Company'];
  public inputOptions: Record<string, InputOptions> = INPUT_OPTIONS;
  public state: BehaviorSubject<State | null> =
    new BehaviorSubject<State | null>(null);
  private subscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private stateManagerService: StateManagerService,
    private landlordService: LandlordService,
    private progressBarService: ProgressBarService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({});

    this.subscription.add(
      this.stateManagerService.getData().subscribe((res) => {
        this.hasType(res?.user?.addresses ?? [], 'current') &&
          this.initializeForm('current');

        this.hasType(res?.user?.addresses ?? [], 'previous') &&
          this.initializeForm('previous');

        this.state.next(res);
      })
    );
    this.setProgressState();
    this.form.valueChanges.subscribe((res) => console.log(res));
  }

  public getOption(placeholder: string, option: string): InputOptions {
    return {
      ...this.inputOptions[option],
      placeholder: placeholder,
    };
  }

  public onContinueClick() {
    if (this.form?.invalid) {
      window.location.href = environment.coreUrl;
      return;
    }
    const currentAdress = this.getAdress('current');
    const previousAdress = this.getAdress('previous');
    const payload = [];
    if (this.form?.value['current'] && currentAdress) {
      payload.push({
        ...this.form?.value['current'],
        ...currentAdress,
        isCurrent: true,
      });
    }
    if (this.form?.value['previous'] && previousAdress) {
      payload.push({
        ...this.form?.value['previous'],
        ...previousAdress,
        isCurrent: false,
      });
    }
    this.subscription.add(
      this.landlordService
        .sendLandlordInfo(payload)
        .subscribe(() => (window.location.href = environment.coreUrl))
    );
  }

  public getStringAdress(adresses: Address[], type: string) {
    const adress = adresses.find(
      (item) => item.type.toLowerCase() === type.toLowerCase()
    );
    return `${adress?.streetAddress}, ${adress?.city}, ${adress?.state}, ${adress?.zipCode}`;
  }

  private hasType(adresses: Address[], type: string): boolean {
    return adresses.some(
      (adress) => adress.type.toLowerCase() == type.toLowerCase()
    );
  }

  private getAdress(type: string): Address | undefined {
    return this.state.value?.user?.addresses?.find(
      (adress) => adress.type.toLowerCase() === type.toLowerCase()
    );
  }

  private initializeForm(type: 'current' | 'previous') {
    this.form?.addControl(
      type,
      this.fb.group({
        type: [''],
        firstName: [''],
        lastName: [''],
        email: [''],
        phoneCountryCode: ['+1'],
        phoneNumber: [''],
      })
    );
  }

  private setProgressState() {
    this.progressBarService.setState({
      display: false,
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
