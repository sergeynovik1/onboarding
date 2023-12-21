import { environment } from './../../../../../environments/environment.staging';
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
import { Subscription, map, tap } from 'rxjs';
import { InputOptions } from '../../consts/interfaces/input-options.interface';
import { NgxMaskDirective, provideNgxMask, NgxMaskService } from 'ngx-mask';

@Component({
  selector: 'app-input[inputOptions]',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputComponent,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: InputComponent,
      multi: true,
    },
    NgxMaskService,
    provideNgxMask(),
  ],
})
export class InputComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @Input()
  public inputOptions!: InputOptions;
  public inputForm: FormGroup | undefined;
  private onChange: any = () => {};
  private onTouched: any = () => {};
  private subscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private ngxMaskService: NgxMaskService
  ) {}

  ngOnInit(): void {
    this.inputForm = this.fb.group({
      input: ['', this.inputOptions?.validators],
    });
  }

  public writeValue(val: any): void {
    val &&
      this.inputForm &&
      this.inputForm.setValue({ input: val }, { emitEvent: false });
  }

  public registerOnChange(fn: any): void {
    this.subscription.add(
      this.inputForm?.controls['input'].valueChanges.subscribe(fn)
    );
  }

  public test(e: any) {
    return e.length == 4 || e.length == 3
      ? e.length == 4
        ? e.slice(0, 2) + '/' + e.slice(2)
        : e.slice(0, 1) + '/' + e.slice(1)
      : e;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    isDisabled
      ? this.inputForm?.disable({ emitEvent: false })
      : this.inputForm?.enable({ emitEvent: false });
  }

  public validate(): ValidationErrors | null | undefined {
    return this.inputForm?.controls['input'].errors;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
