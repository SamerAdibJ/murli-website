import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { SelectButtonModule } from 'primeng/selectbutton';
import { AppService } from '../../shared/services/app.service';
import { FormsModule } from '@angular/forms';
interface ToggleOption {
  label: string;
  value: boolean;
  icon: string;
}

@Component({
  selector: 'app-settings',
  imports: [CardModule, SelectButtonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class Settings {
  constructor(public appService: AppService) {}

  themeOptions: ToggleOption[] = [
    { label: 'Light', value: false, icon: 'pi pi-sun' },
    { label: 'Dark', value: true, icon: 'pi pi-moon' },
  ];

  langOptions: ToggleOption[] = [
    { label: 'English', value: false, icon: 'pi pi-language' },
    { label: 'العربية', value: true, icon: 'pi pi-globe' },
  ];

  onThemeChange(value: boolean): void {
    this.appService.setDarkMode(value);
  }

  onLangChange(value: boolean): void {
    this.appService.setRtl(value);
  }
}
