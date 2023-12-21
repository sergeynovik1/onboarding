import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordIconSvgComponent } from './components/password-icon-svg/password-icon-svg.component';
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
import { uppercaseValidator } from './consts/validators/uppercase.validator';
import { lowercaseValidator } from './consts/validators/lowercase.validator';
import { numberValidator } from './consts/validators/number.validator';
import { specialCharacterValidator } from './consts/validators/special-character.validator';

@Component({
  selector: 'app-password-input',
  standalone: true,
  imports: [
    CommonModule,
    PasswordIconSvgComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: PasswordInputComponent,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordInputComponent,
      multi: true,
    },
  ],
})
export class PasswordInputComponent
  implements ControlValueAccessor, OnInit, OnDestroy
{
  @Input()
  public showPrompt: boolean | undefined;
  public isPasswordVisible: boolean = false;
  public passwordForm: FormGroup | undefined;
  private onChange: any = () => {};
  private onTouched: any = () => {};
  private subscription: Subscription = new Subscription();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(12),
          uppercaseValidator(),
          lowercaseValidator(),
          numberValidator(),
          specialCharacterValidator(),
        ],
      ],
    });
  }

  public writeValue(val: string): void {
    val &&
      this.passwordForm &&
      this.passwordForm.controls['password'].setValue(val, {
        emitEvent: false,
      });
  }

  public registerOnChange(fn: any): void {
    this.subscription.add(
      this.passwordForm?.controls['password'].valueChanges.subscribe(fn)
    );
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    isDisabled
      ? this.passwordForm?.disable({ emitEvent: false })
      : this.passwordForm?.enable({ emitEvent: false });
  }

  public validate(): ValidationErrors | null | undefined {
    return this.passwordForm?.controls['password'].errors;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
