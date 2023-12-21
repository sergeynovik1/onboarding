import { Address } from './user.interface';
export interface ComponentHandlers {
  [key: string]: (
    component: google.maps.GeocoderAddressComponent,
    address: Address
  ) => Address;
}
