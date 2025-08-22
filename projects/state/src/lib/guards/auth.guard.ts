import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StateFacade } from '@state';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  // Add your authentication logic here
  const isAuthenticated = true; // Replace with your actual authentication check
  const stateFacade = inject(StateFacade);

  if (stateFacade.userLoggedIn()) {
    return true;
  } else {
    return router.parseUrl('/login');
  }
};
