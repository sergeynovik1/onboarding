import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-promo-input',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './promo-input.component.html',
  styleUrls: ['./promo-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: PromoInputComponent,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: PromoInputComponent,
      multi: true,
    },
  ],
})
export class PromoInputComponent
  implements OnInit, ControlValueAccessor, OnDestroy
{
  @Input()
  public placeholder: string = '';
  public promoForm: FormGroup | undefined;
  private onChange: any = () => {};
  private onTouched: any = () => {};
  private subscription: Subscription = new Subscription();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.promoForm = this.fb.group({
      promo: [''],
      isApplied: [false],
    });
  }

  public writeValue(val: any): void {
    val && this.promoForm && this.promoForm.setValue(val, { emitEvent: false });
  }

  public registerOnChange(fn: any): void {
    this.subscription.add(this.promoForm?.valueChanges.subscribe(fn));
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    isDisabled
      ? this.promoForm?.disable({ emitEvent: false })
      : this.promoForm?.enable({ emitEvent: false });
  }

  public validate(): ValidationErrors | null | undefined {
    return {
      ...this.promoForm?.controls['promo'].errors,
      ...this.promoForm?.controls['isApplied'].errors,
    };
  }

  public onInput() {
    if (this.promoForm?.controls['isApplied']) {
      this.promoForm?.controls['isApplied'].setValue(false, {
        emitEvent: false,
      });
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
