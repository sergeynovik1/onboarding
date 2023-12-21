import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { ROUTE_STEPS } from '../steps/route-steps';

export const CanActivateGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  if (route.data['name']) {
    const fn = ROUTE_STEPS[route.data['name']].guard;
    return fn();
  }
  return true;
};
