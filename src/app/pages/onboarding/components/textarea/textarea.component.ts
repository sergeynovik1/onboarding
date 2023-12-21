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
import { InputOptions } from '../../consts/interfaces/input-options.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-textarea[inputOptions]',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TextareaComponent,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: TextareaComponent,
      multi: true,
    },
  ],
})
export class TextareaComponent
  implements OnInit, ControlValueAccessor, OnDestroy
{
  @Input()
  public inputOptions!: InputOptions;
  public form: FormGroup | undefined;
  private onChange: any = () => {};
  private onTouched: any = () => {};
  private subscription: Subscription | undefined;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.subscription = new Subscription();
    this.form = this.fb.group({
      text: ['', this.inputOptions.validators],
    });
  }

  public writeValue(val: any): void {
    val && this.form && this.form.setValue({ text: val }, { emitEvent: false });
  }

  public registerOnChange(fn: any): void {
    this.subscription?.add(
      this.form?.controls['text'].valueChanges.subscribe(fn)
    );
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public validate(): ValidationErrors | null | undefined {
    return this.form?.controls['text'].errors;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
