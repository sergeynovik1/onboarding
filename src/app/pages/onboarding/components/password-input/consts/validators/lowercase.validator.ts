import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function lowercaseValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value;
    if (value && /[a-z]/.test(value)) {
      return null;
    } else {
      return {
        lowercaseError: 'Password must contain one or more lowercase text.',
      };
    }
  };
}
