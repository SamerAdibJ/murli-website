import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject, Injector } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';
import { API } from '../api/api.config';

const skipPaths = [API.auth.login, API.auth.register, API.auth.refresh];

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const injector = inject(Injector);
  const messageService = inject(MessageService);
  const isAuthPath = skipPaths.some((path) => req.url.includes(path));
  const token = tokenService.getAccessToken();

  if (token && !isAuthPath) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }

  return next(req).pipe(
    catchError((err) => {
      if (err instanceof HttpErrorResponse && err.status === 401 && !isAuthPath) {
        const authService = injector.get(AuthService);
        return authService.refreshToken().pipe(
          switchMap(() => {
            const newToken = tokenService.getAccessToken();
            return next(
              req.clone({
                setHeaders: { Authorization: `Bearer ${newToken}` },
              }),
            );
          }),
          catchError(() => {
            authService.logout();
            return throwError(() => err);
          }),
        );
      }
      if (err.status >= 500 || err.status === 0) {
        messageService.add({
          severity: 'error',
          summary: 'Server Error',
          detail: 'Something went wrong. Please try again.',
          life: 5000,
        });
      }
      return throwError(() => err);
    }),
  );
};
