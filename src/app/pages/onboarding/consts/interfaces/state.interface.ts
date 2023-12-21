import { SmfaVerification } from './smfa-verification.interface';
import { User } from './user.interface';

export interface State {
  user?: User;
  smfaVerification?: SmfaVerification;
}
