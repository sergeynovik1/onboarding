import { Observable } from 'rxjs';

export interface RegisterStep {
  route: string;
  guard: () => boolean | Observable<boolean>;
}
