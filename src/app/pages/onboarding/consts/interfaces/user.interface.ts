export interface User {
  id?: string;
  firstName?: string;
  lastName?: string;
  mobile?: string;
  addresses?: Address[];
  dob?: string;
  ssn?: string;
  zipCode?: string;
  password?: string;
  email?: string;
  isDocumentUpload?: boolean;
  emailAddress?: string;
}

export interface Address {
  city: string;
  state: string;
  streetAddress: string;
  type: string;
  zipCode: string;
}
