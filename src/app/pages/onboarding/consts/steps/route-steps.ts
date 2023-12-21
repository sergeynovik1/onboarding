import { RegisterStep } from '../interfaces/register-step.interface';

export const ROUTE_STEPS: Record<string, RegisterStep> = {
  'create-account-auto': {
    route: '/register/create-account/auto',
    guard: () => true,
  },
  'create-account-manually': {
    route: '/register/create-account/manually',
    guard: () => true,
  },
  'wait-smfa-confirmation': {
    route: '/register/link-verification/sent',
    guard: () => true,
  },
  'smfa-success': {
    route: '/register/link-verification/success',
    guard: () => true,
  },
  'personal-details': {
    route: '/register/info/check',
    guard: () => true,
  },
  identity: {
    route: '/register/verification',
    guard: () => true,
  },
  'identity-id': {
    route: '/register/verification/id',
    guard: () => true,
  },
  'identity-passport': {
    route: '/register/verification/passport',
    guard: () => true,
  },
  'rent-reporting': {
    route: '/register/rent-reporting',
    guard: () => true,
  },
  payment: {
    route: '/register/payment',
    guard: () => true,
  },
  'landlord-details': {
    route: '/register/landlord',
    guard: () => true,
  },
};
