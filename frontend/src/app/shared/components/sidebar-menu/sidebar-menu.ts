import { Component, computed } from '@angular/core';
import { MenuModule } from 'primeng/menu';
import { LayoutService } from '../../services/layout.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-sidebar-menu',
  standalone: true,
  imports: [MenuModule, ButtonModule],
  templateUrl: './sidebar-menu.html',
  styleUrl: './sidebar-menu.scss',
})
export class SidebarMenuComponent {
  constructor(public layout: LayoutService) {}

  sidebarMenu = computed(() => [
    {
      items: this.layout.navItems.map((item) => ({
        label: item.label,
        icon: item.icon,
        routerLink: item.route,
      })),
    },
  ]);

  profileMenu = computed(() => [
    {
      label: 'Account',
      items: this.layout.profile.map((item) => ({
        label: item.label,
        icon: item.icon,
        routerLink: item.route,
      })),
    },
  ]);
}
