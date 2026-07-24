import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const tokenService = inject(TokenService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  if (!tokenService.getRefreshToken()) {
    return router.parseUrl('/signin');
  }

  return authService.refreshToken().pipe(
    take(1),
    map(() => true),
  );
};
