import {
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  FormsModule,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { InputOptions } from '../../consts/interfaces/input-options.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-date-input',
  standalone: true,
  imports: [
    CommonModule,
    NgxMaskDirective,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss'],
  providers: [
    provideNgxMask(),
    { provide: MAT_DATE_LOCALE, useValue: 'en-US' },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DateInputComponent,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: DateInputComponent,
      multi: true,
    },
  ],
})
export class DateInputComponent
  implements ControlValueAccessor, OnInit, OnDestroy
{
  @Input()
  public inputOption: InputOptions | undefined;
  public dateForm: FormGroup | undefined;
  private onChange: any = () => {};
  private onTouched: any = () => {};
  private subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.dateForm = this.fb.group({
      date: ['', this.inputOption?.validators],
    });
  }

  constructor(private fb: FormBuilder) {}

  public writeValue(val: any): void {
    val &&
      this.dateForm &&
      this.dateForm.setValue({ date: val }, { emitEvent: false });
  }

  public registerOnChange(fn: any): void {
    this.subscription.add(
      this.dateForm?.controls['date'].valueChanges.subscribe(fn)
    );
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    isDisabled
      ? this.dateForm?.disable({ emitEvent: false })
      : this.dateForm?.enable({ emitEvent: false });
  }

  public validate(): ValidationErrors | null | undefined {
    return this.dateForm?.controls['date'].errors;
  }

  public dispatch(value: any, input: HTMLInputElement) {
    input.value = value;
    input.dispatchEvent(new Event('input'));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
