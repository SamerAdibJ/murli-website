import { Component, computed, inject } from '@angular/core';
import { MenuModule } from 'primeng/menu';
import { AppService } from '../../services/app.service';
import { AuthService } from '../../services/auth.service';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-sidebar-menu',
  standalone: true,
  imports: [MenuModule, ButtonModule],
  templateUrl: './sidebar-menu.html',
  styleUrl: './sidebar-menu.scss',
})
export class SidebarMenuComponent {
  readonly authService = inject(AuthService);
  private confirmationService = inject(ConfirmationService);

  constructor(public appService: AppService) {}

  sidebarMenu = computed(() => [
    {
      items: this.appService.navItems.map((item) => ({
        label: item.label,
        icon: item.icon,
        routerLink: item.route,
      })),
    },
  ]);

  profileMenu = computed(() => [
    {
      label: 'Account',
      items: this.appService.sidebarProfile().map((item) => ({
        label: item.label,
        icon: item.icon,
        routerLink: item.route,
      })),
    },
  ]);

  confirmLogout(event?: Event): void {
    this.confirmationService.confirm({
      target: event?.target as EventTarget | undefined,
      message: 'Are you sure you want to sign out?',
      header: 'Sign Out',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'Cancel',
      acceptLabel: 'Sign Out',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-outline',
      accept: () => this.authService.logout(),
    });
  }
}
