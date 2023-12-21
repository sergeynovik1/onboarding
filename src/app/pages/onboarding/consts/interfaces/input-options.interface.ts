import { Validators } from '@angular/forms';
import { OutputTransformFn } from 'ngx-mask';

export interface InputOptions {
  mask: string | undefined;
  placeholder: string;
  validators: Validators[];
  outputTransformFn: OutputTransformFn | null;
}
