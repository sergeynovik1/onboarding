import { CommonModule } from '@angular/common';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Component, OnDestroy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  FormsModule,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { PhoneNumberValidator } from '../../consts/validators/phone-number.validator';

@Component({
  selector: 'app-phone-input',
  templateUrl: './phone-input.component.html',
  styleUrls: ['./phone-input.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    NgxMaskDirective,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    provideNgxMask(),
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: PhoneInputComponent,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: PhoneInputComponent,
      multi: true,
    },
  ],
})
export class PhoneInputComponent implements ControlValueAccessor, OnDestroy {
  public phoneForm: FormGroup | undefined;
  private onChange: any = () => {};
  private onTouched: any = () => {};
  private subscription: Subscription = new Subscription();

  constructor(private fb: FormBuilder) {
    this.phoneForm = this.fb.group({
      phone: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          PhoneNumberValidator('US'),
        ],
      ],
    });
  }

  public writeValue(val: any): void {
    val &&
      this.phoneForm &&
      this.phoneForm.setValue({ phone: val }, { emitEvent: false });
  }

  public registerOnChange(fn: any): void {
    this.subscription.add(
      this.phoneForm?.controls['phone'].valueChanges.subscribe(fn)
    );
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public validate(): ValidationErrors | null | undefined {
    return this.phoneForm?.controls['phone'].errors;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
