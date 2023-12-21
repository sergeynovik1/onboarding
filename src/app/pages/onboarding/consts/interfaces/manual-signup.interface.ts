import { Address } from './user.interface';

export interface ManualSignup {
  dob: string;
  email: string;
  firstName: string;
  lastName: string;
  mobile: string;
  password: string;
  rePassword: string;
  ssn: string;
  addresses: Address[];
}
