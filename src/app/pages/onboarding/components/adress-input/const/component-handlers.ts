import { ComponentHandlers } from '../../../consts/interfaces/component-handlers.interface';
import { Address } from '../../../consts/interfaces/user.interface';

export const componentHandlers: ComponentHandlers = {
  street_number: (
    component: google.maps.GeocoderAddressComponent,
    address: Address
  ) => ({
    ...address,
    streetAddress: component.long_name,
  }),
  route: (
    component: google.maps.GeocoderAddressComponent,
    address: Address
  ) => ({
    ...address,
    streetAddress: address.streetAddress + ' ' + component.short_name,
  }),
  postal_code: (
    component: google.maps.GeocoderAddressComponent,
    address: Address
  ) => ({
    ...address,
    zipCode: component.long_name.replace(/-/g, ''),
  }),
  locality: (
    component: google.maps.GeocoderAddressComponent,
    address: Address
  ) => ({
    ...address,
    city: component.long_name,
  }),
  sublocality_level_1: (
    component: google.maps.GeocoderAddressComponent,
    address: Address
  ) => ({
    ...address,
    city: component.long_name,
  }),
  administrative_area_level_1: (
    component: google.maps.GeocoderAddressComponent,
    address: Address
  ) => ({
    ...address,
    state: component.long_name,
  }),
};
