import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { StateFacade } from '@state';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const stateFacade = inject(StateFacade);

  if (stateFacade.userLoggedIn()) {
    return true;
  } else {
    return router.parseUrl('/login');
  }
};
