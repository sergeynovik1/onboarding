import { ProgressBarService } from './../../services/progress-bar.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { InputComponent } from '../../../components/input/input.component';
import { InputOptions } from '../../../consts/interfaces/input-options.interface';
import { INPUT_OPTIONS } from '../../../consts/input-options/input-options';
import { TextareaComponent } from '../../../components/textarea/textarea.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    InputComponent,
    TextareaComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ContactUsComponent implements OnInit {
  public inputOptions: Record<string, InputOptions> = INPUT_OPTIONS;
  public messageOption: InputOptions = {
    mask: undefined,
    placeholder: 'Type your message here',
    validators: [Validators.required],
    outputTransformFn: null,
  };
  public form: FormGroup | undefined;

  constructor(
    private fb: FormBuilder,
    private progressBarService: ProgressBarService
  ) {}

  ngOnInit(): void {
    this.progressBarService.setState({ display: false });
    this.form = this.fb.group({
      fullName: [''],
      email: [''],
      message: [''],
    });
  }

  public onSendClick() {
    console.log({ ...this.form?.value });
  }
}
