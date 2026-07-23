import { Component, computed } from '@angular/core';
import { MenuModule } from 'primeng/menu';
import { AppService } from '../../services/app.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-sidebar-menu',
  standalone: true,
  imports: [MenuModule, ButtonModule],
  templateUrl: './sidebar-menu.html',
  styleUrl: './sidebar-menu.scss',
})
export class SidebarMenuComponent {
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
}
