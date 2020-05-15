import { ValidatorFn, AbstractControl } from '@angular/forms';

export function isIntegerValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    return parseInt(control.value, 10) && !isNaN(+control.value)
      ? null
      : { notInteger: true };
  };
}
