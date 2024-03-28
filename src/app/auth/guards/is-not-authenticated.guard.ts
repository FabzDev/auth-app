import { CanActivateFn } from '@angular/router';
import { AuthStatus } from '../interfaces/auth-status.enum';

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {

  if(AuthStatus.authenticated){
    return false;
  }

  return true;
};
