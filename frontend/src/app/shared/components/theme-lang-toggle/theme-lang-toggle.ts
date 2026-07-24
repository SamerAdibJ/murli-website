import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-theme-lang-toggle',
  standalone: true,
  imports: [ButtonModule, TooltipModule],
  templateUrl: './theme-lang-toggle.html',
  styles: ':host { position: fixed; top: 1.25rem; inset-inline-end: 1rem; z-index: 10; }',
})
export class ThemeLangToggle {
  readonly appService = inject(AppService);
}
