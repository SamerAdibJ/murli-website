import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { User, LoginResponse, ApiResponse } from 'shared';
import { API } from '../api/api.config';
import { AppService } from './app.service';
import { TokenService } from './token.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _user = signal<User | null>(null);
  readonly user = this._user.asReadonly();
  readonly isAuthenticated = computed(() => this._user() !== null);
  private _pendingApproval = signal(false);
  readonly pendingApproval = this._pendingApproval.asReadonly();

  constructor(
    private http: HttpClient,
    private router: Router,
    private appService: AppService,
    private tokenService: TokenService,
  ) {
    const savedUser = this.tokenService.getUser();
    if (savedUser) {
      this._user.set(savedUser);
      this.appService.setRole(savedUser.role);
    }
  }

  register(dto: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }): Observable<User> {
    return this.http
      .post<ApiResponse<User>>(`${API.baseUrl}${API.auth.register}`, dto)
      .pipe(map((res) => res.data));
  }

  login(dto: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<ApiResponse<LoginResponse>>(`${API.baseUrl}${API.auth.login}`, dto).pipe(
      map((res) => res.data),
      tap((data) => {
        this.tokenService.setAccessToken(data.accessToken);
        this.tokenService.setRefreshToken(data.refreshToken);
        const user = {
          id: data.user.id,
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          email: data.user.email,
          country: data.user.country,
          role: data.user.role,
          status: 'active',
          emailVerified: false,
          createdAt: '',
          updatedAt: '',
        } as User;
        this._user.set(user);
        this.tokenService.setUser(user);
        this.appService.setRole(data.user.role);
      }),
    );
  }

  refreshToken(): Observable<{ accessToken: string; refreshToken: string }> {
    const storedRefresh = this.tokenService.getRefreshToken();
    if (!storedRefresh) {
      this.clearSession();
      return throwError(() => new Error('No refresh token'));
    }

    return this.http
      .post<ApiResponse<{ accessToken: string; refreshToken: string }>>(
        `${API.baseUrl}${API.auth.refresh}`,
        { refreshToken: storedRefresh },
      )
      .pipe(
        map((res) => res.data),
        tap((data) => {
          this.tokenService.setAccessToken(data.accessToken);
          this.tokenService.setRefreshToken(data.refreshToken);
          const saved = this.tokenService.getUser();
          if (saved) {
            this._user.set(saved);
            this.appService.setRole(saved.role);
          }
        }),
        catchError((err) => {
          this.clearSession();
          return throwError(() => err);
        }),
      );
  }

  logout(): void {
    const storedRefresh = this.tokenService.getRefreshToken();
    if (storedRefresh) {
      this.http
        .post(`${API.baseUrl}${API.auth.logout}`, { refreshToken: storedRefresh })
        .subscribe({ error: () => {} });
    }
    this.clearSession();
    this.router.navigate(['/signin']);
  }

  logoutAll(): void {
    this.http.post(`${API.baseUrl}${API.auth.logoutAll}`, {}).subscribe({
      next: () => this.logout(),
      error: () => this.logout(),
    });
  }

  getAccessToken(): string | null {
    return this.tokenService.getAccessToken();
  }

  setPendingApproval(value: boolean): void {
    this._pendingApproval.set(value);
  }

  private clearSession(): void {
    this._user.set(null);
    this.tokenService.clearTokens();
  }
}
