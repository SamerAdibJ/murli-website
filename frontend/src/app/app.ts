import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarMenu } from './shared/components/sidebar-menu/sidebar-menu';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarMenu],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('murli-website');
}
