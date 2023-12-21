import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SelectOptionComponent } from '../select-option/select-option.component';
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
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-select-input[options]',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    ScrollingModule,
    SelectOptionComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SelectInputComponent,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: SelectInputComponent,
      multi: true,
    },
  ],
  animations: [
    trigger('expandAnimation', [
      state(
        'expanded',
        style({ height: '128px', opacity: 1, display: 'block' })
      ),
      state('collapsed', style({ height: '0', opacity: 0, display: 'none' })),
      transition('expanded <=> collapsed', animate('0.15s')),
    ]),
  ],
})
export class SelectInputComponent
  implements OnInit, ControlValueAccessor, OnDestroy
{
  @Input()
  public options!: string[];

  public isBackdropVisible: boolean | undefined;
  public form: FormGroup | undefined;
  private onChange: any = () => {};
  private onTouched: any = () => {};
  private subscription: Subscription | undefined;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.isBackdropVisible = false;
    this.form = this.fb.group({
      option: ['', [Validators.required]],
    });
    this.subscription = new Subscription();
  }

  public onOptionSelect(option: string) {
    this.form?.setValue(
      {
        option,
      },
      { emitEvent: true }
    );
  }

  public writeValue(option: string): void {
    option && this.form && this.form.setValue({ option }, { emitEvent: false });
  }

  public registerOnChange(fn: any): void {
    this.subscription?.add(
      this.form?.controls['option'].valueChanges.subscribe(fn)
    );
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public validate(): ValidationErrors | null | undefined {
    return this.form?.controls['option'].errors;
  }

  public setDisabledState?(isDisabled: boolean): void {
    isDisabled
      ? this.form?.controls['option'].disable({ emitEvent: false })
      : this.form?.controls['option'].enable({ emitEvent: false });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
