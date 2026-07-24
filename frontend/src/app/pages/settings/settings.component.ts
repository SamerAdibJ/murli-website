import { Component, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ButtonModule } from 'primeng/button';
import { AppService } from '../../shared/services/app.service';
import { AuthService } from '../../shared/services/auth.service';
import { ConfirmationService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
interface ToggleOption {
  label: string;
  value: boolean;
  icon: string;
}

@Component({
  selector: 'app-settings',
  imports: [CardModule, SelectButtonModule, ButtonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class Settings {
  private confirmationService = inject(ConfirmationService);

  constructor(
    public appService: AppService,
    public authService: AuthService,
  ) {}

  themeOptions: ToggleOption[] = [
    { label: 'Light', value: false, icon: 'pi pi-sun' },
    { label: 'Dark', value: true, icon: 'pi pi-moon' },
  ];

  langOptions: ToggleOption[] = [
    { label: 'English', value: false, icon: 'pi pi-language' },
    { label: 'العربية', value: true, icon: 'pi pi-globe' },
  ];

  confirmLogout(event: Event): void {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to sign out?',
      header: 'Sign Out',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'Cancel',
      acceptLabel: 'Sign Out',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => this.authService.logout(),
    });
  }

  onThemeChange(value: boolean): void {
    this.appService.setDarkMode(value);
  }

  onLangChange(value: boolean): void {
    this.appService.setRtl(value);
  }
}
