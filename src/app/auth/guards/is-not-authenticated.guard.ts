import { CanActivateFn, Router } from '@angular/router';
import { AuthStatus } from '../interfaces/auth-status.enum';
import { inject } from '@angular/core';

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  if(AuthStatus.authenticated){
    return false;
  }

  router.navigateByUrl('/dashboard')
  return true;
};
