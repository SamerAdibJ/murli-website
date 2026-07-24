import { Injectable, signal } from '@angular/core';
import { User } from 'shared';

@Injectable({ providedIn: 'root' })
export class TokenService {
  private _accessToken = signal<string | null>(null);
  private readonly USER_KEY = 'user';

  getAccessToken(): string | null {
    return this._accessToken();
  }

  setAccessToken(token: string | null): void {
    this._accessToken.set(token);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  setRefreshToken(token: string): void {
    localStorage.setItem('refreshToken', token);
  }

  getUser(): User | null {
    const raw = localStorage.getItem(this.USER_KEY);
    return raw ? JSON.parse(raw) : null;
  }

  setUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  clearTokens(): void {
    this._accessToken.set(null);
    localStorage.removeItem('refreshToken');
    localStorage.removeItem(this.USER_KEY);
  }
}
