import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppService } from '../shared/services/app.service';
import { SidebarMenuComponent } from '../shared/components/sidebar-menu/sidebar-menu';
import { BottomNavComponent } from '../shared/components/bottom-nav/bottom-nav';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, SidebarMenuComponent, BottomNavComponent],
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
})
export class ShellComponent {
  constructor(public appService: AppService) {}
}
