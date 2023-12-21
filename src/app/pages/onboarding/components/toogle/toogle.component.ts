import { Subscription } from 'rxjs';
import { Component, Input, OnDestroy, OnInit, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgToggleModule } from 'ng-toggle-button';
import { ToogleConfig } from './consts/interfaces/toogle-config.interface';
import {
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-toogle',
  standalone: true,
  imports: [CommonModule, NgToggleModule, FormsModule, ReactiveFormsModule],
  templateUrl: './toogle.component.html',
  styleUrls: ['./toogle.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToogleComponent),
      multi: true,
    },
  ],
})
export class ToogleComponent
  implements ControlValueAccessor, OnInit, OnDestroy
{
  @Input()
  public disabled: boolean = false;
  public config: ToogleConfig | undefined;
  public value: boolean | undefined;
  public toogleForm: FormGroup | undefined;
  private onChange: any = () => {};
  private onTouched: any = () => {};
  private subscription: Subscription = new Subscription();
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.toogleForm = this.fb.group({
      toogle: [],
    });

    this.config = {
      value: this.toogleForm.controls['toogle'].value,
      disabled: this.disabled,
      color: {
        checked: '#92D590',
        unchecked: '#CED1D1',
        disabled: this.toogleForm.controls['toogle'].value
          ? '#CAEDC9'
          : '#EAEDED',
      },
      switchColor: {
        checked: '#fff',
        unchecked: '#fff',
        disabled: '#fff',
      },
    };
  }

  public writeValue(val: any): void {
    val &&
      this.toogleForm &&
      this.toogleForm.setValue({ toogle: val }, { emitEvent: false });

    this.config && (this.config.value = val);
  }

  public registerOnChange(fn: any): void {
    this.subscription.add(
      this.toogleForm?.controls['toogle'].valueChanges.subscribe(fn)
    );
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
