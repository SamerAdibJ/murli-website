import { Injectable, signal, computed, effect } from '@angular/core';
import { PrimeNG } from 'primeng/config';
import { calendarAr, calendarEn } from '../translations/translations';
export interface NavItem {
  label: string;
  icon: string;
  route: string;
  adminOnly?: boolean; // ← add this
}

@Injectable({ providedIn: 'root' })
export class AppService {
  private _isRtl = signal(localStorage.getItem('isRtl') === 'true');
  private _darkMode = signal(localStorage.getItem('darkMode') === 'true');
  private _role = signal<'member' | 'admin'>('member');

  readonly isRtl = this._isRtl.asReadonly();
  readonly darkMode = this._darkMode.asReadonly();
  readonly role = this._role.asReadonly();
  readonly dir = computed(() => (this._isRtl() ? 'rtl' : 'ltr'));

  readonly isAdmin = computed(() => this._role() === 'admin');

  constructor(private primeNG: PrimeNG) {
    effect(() => {
      document.documentElement.classList.toggle('p-dark', this._darkMode());
      localStorage.setItem('darkMode', String(this._darkMode()));
    });

    effect(() => {
      document.documentElement.dir = this.dir();
      localStorage.setItem('isRtl', String(this._isRtl()));
      if (this._isRtl()) {
        primeNG.setTranslation(calendarAr);
      } else {
        primeNG.setTranslation(calendarEn);
      }
    });
  }

  readonly navItems: NavItem[] = [
    { label: 'Murli', icon: 'pi pi-book !text-xl', route: '/murli' },
    { label: 'Blessings', icon: 'pi pi-heart !text-xl', route: '/blessing' },
    { label: 'Bookmarks', icon: 'pi pi-bookmark-fill !text-xl', route: '/bookmarks' },
  ];

  readonly profile: NavItem[] = [
    { label: 'Profile', icon: 'pi pi-user !text-xl', route: '/profile' },
    { label: 'Members', icon: 'pi pi-address-book !text-xl', route: '/members', adminOnly: true },
    { label: 'Settings', icon: 'pi pi-cog !text-xl', route: '/settings' },
  ];

  readonly bottomNavItems = computed(() => [
    ...this.navItems,
    ...this.profile.filter((item) => !item.adminOnly || this.isAdmin()),
  ]);

  readonly sidebarProfile = computed(() =>
    this.profile.filter((item) => !item.adminOnly || this.isAdmin()),
  );

  setRole(role: 'member' | 'admin') {
    this._role.set(role);
  }

  toggleRtl(): void {
    this._isRtl.update((v) => !v);
  }

  setRtl(value: boolean): void {
    this._isRtl.set(value);
  }

  toggleDarkMode(): void {
    this._darkMode.update((v) => !v);
  }

  setDarkMode(value: boolean): void {
    this._darkMode.set(value);
  }
}
