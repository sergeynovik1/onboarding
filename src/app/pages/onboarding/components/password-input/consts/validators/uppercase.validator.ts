import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function uppercaseValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value;
    if (value && /[A-Z]/.test(value)) {
      return null;
    } else {
      return {
        uppercaseError: 'Password must contain one or more uppercase text.',
      };
    }
  };
}
