import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function specialCharacterValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value;
    if (value && /[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      return null;
    } else {
      return {
        specialCharacterError:
          'Password must contain one or more special character.',
      };
    }
  };
}
