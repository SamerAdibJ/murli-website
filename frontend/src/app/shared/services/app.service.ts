import { Injectable, signal, computed, effect } from '@angular/core';

export interface NavItem {
  label: string;
  icon: string;
  route: string;
  adminOnly?: boolean; // ← add this
}

@Injectable({ providedIn: 'root' })
export class AppService {
  private _isRtl = signal(false);
  private _darkMode = signal(true);
  private _role = signal<'member' | 'admin'>('member'); // ← default to member

  readonly isRtl = this._isRtl.asReadonly();
  readonly darkMode = this._darkMode.asReadonly();
  readonly role = this._role.asReadonly();
  readonly dir = computed(() => (this._isRtl() ? 'rtl' : 'ltr'));

  readonly isAdmin = computed(() => this._role() === 'admin');

  constructor() {
    effect(() => {
      document.documentElement.classList.toggle('p-dark', this._darkMode());
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
