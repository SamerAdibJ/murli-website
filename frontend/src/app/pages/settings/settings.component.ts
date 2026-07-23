import { Component } from '@angular/core';
import { AppService } from '../../shared/services/app.service';

@Component({
  selector: 'app-settings',
  imports: [],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class Settings {
  constructor(public appService: AppService) {}
}
