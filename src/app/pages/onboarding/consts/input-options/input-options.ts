import { Validators } from '@angular/forms';
import { InputOptions } from '../interfaces/input-options.interface';
import { dateValidator } from '../validators/date.validator';

export const INPUT_OPTIONS: Record<string, InputOptions> = {
  firstName: {
    mask: undefined,
    placeholder: 'Enter your first name',
    validators: [Validators.required],
    outputTransformFn: null,
  },
  lastName: {
    mask: undefined,
    placeholder: 'Enter your last name',
    validators: [Validators.required],
    outputTransformFn: null,
  },
  fullName: {
    mask: undefined,
    placeholder: 'Enter your full name',
    validators: [Validators.required],
    outputTransformFn: null,
  },
  email: {
    mask: undefined,
    placeholder: 'Enter your email',
    validators: [Validators.required, Validators.email],
    outputTransformFn: null,
  },
  ssn: {
    mask: '000-00-0000',
    placeholder: 'xxx-xx-xxxx',
    validators: [Validators.required],
    outputTransformFn: null,
  },
  date: {
    mask: 'M0/d0/0000',
    placeholder: 'MM/DD/YYYY',
    validators: [Validators.required, dateValidator('MM/DD/YYYY')],
    outputTransformFn: null,
  },
  cardNumberName: {
    mask: undefined,
    placeholder: 'Enter name on card',
    validators: [Validators.required],
    outputTransformFn: null,
  },
  cardNumber: {
    mask: '0000-0000-0000-0000',
    placeholder: '0000-0000-0000-0000',
    validators: [Validators.required],
    outputTransformFn: null,
  },
  cvc: {
    mask: 'M0/00',
    placeholder: 'MM/YY',
    validators: [Validators.required],
    outputTransformFn: null,
  },
  shortBirthDate: {
    mask: 'M0/d0',
    placeholder: 'MM/DD',
    validators: [Validators.required],
    outputTransformFn: (value: string | number | null | undefined) =>
      typeof value == 'string' && (value.length == 4 || value.length == 3)
        ? value.length == 4
          ? value.slice(0, 2) + '/' + value.slice(2)
          : value.slice(0, 1) + '/' + value.slice(1)
        : value,
  },
  zipCode: {
    mask: '0*',
    placeholder: 'Enter your ZIP code',
    validators: [Validators.required],
    outputTransformFn: null,
  },
};
