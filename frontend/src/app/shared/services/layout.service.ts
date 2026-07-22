import { Injectable, signal, computed, effect } from '@angular/core';

export interface NavItem {
  label: string;
  icon: string;
  route: string;
}

@Injectable({ providedIn: 'root' })
export class LayoutService {
  private _isRtl = signal(false);
  private _darkMode = signal(true);

  readonly isRtl = this._isRtl.asReadonly();
  readonly darkMode = this._darkMode.asReadonly();
  readonly dir = computed(() => (this._isRtl() ? 'rtl' : 'ltr'));

  constructor() {
    // Sync dark mode to <html> class for both PrimeNG and Tailwind
    effect(() => {
      document.documentElement.classList.toggle('p-dark', this._darkMode());
      document.documentElement.classList.toggle('dark', this._darkMode());
    });
  }

  readonly navItems: NavItem[] = [
    { label: 'Murli', icon: 'pi pi-home !text-xl', route: '/murli' },
    { label: 'Blessings', icon: 'pi pi-heart !text-xl', route: '/blessing' },
    { label: 'Bookmarks', icon: 'pi pi-book !text-xl', route: '/bookmarks' },
  ];

  readonly profile: NavItem[] = [
    { label: 'Profile', icon: 'pi pi-user !text-xl', route: '/profile' },
    { label: 'Settings', icon: 'pi pi-cog !text-xl', route: '/settings' },
  ];

  readonly bottomNavItems: NavItem[] = [...this.navItems, ...this.profile];

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
