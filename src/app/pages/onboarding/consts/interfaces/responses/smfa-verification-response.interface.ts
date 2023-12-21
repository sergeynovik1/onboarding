import { User } from '../user.interface';

export interface SmfaVerificationResponse {
  status: 'error' | 'success';
  error?: string;
  data?: User;
}
