import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';
import { map, take } from 'rxjs/operators';

export const guestGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const tokenService = inject(TokenService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return router.parseUrl('/');
  }

  if (!tokenService.getRefreshToken()) {
    return true;
  }

  return authService.refreshToken().pipe(
    take(1),
    map(() => {
      if (authService.isAuthenticated()) {
        return router.parseUrl('/');
      }
      return true;
    }),
  );
};
