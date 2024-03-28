import { CanActivateFn, Router } from '@angular/router';
import { AuthStatus } from '../interfaces/auth-status.enum';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  if(authService.authStatus() === AuthStatus.authenticated){
    return false;
  }

  return true;
};
