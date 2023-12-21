import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import * as moment from 'moment';

export const dateValidator =
  (format: string): ValidatorFn =>
  (control: AbstractControl): ValidationErrors | null => {
    if (
      control &&
      control.value &&
      !moment(control.value, format, true).isValid()
    ) {
      return { invalidDate: true };
    }
    return null;
  };
