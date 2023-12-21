import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function numberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value;
    if (value && /\d/.test(value)) {
      return null;
    } else {
      return { numberError: 'Password must contain one or more number.' };
    }
  };
}
