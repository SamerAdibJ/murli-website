import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { AppService } from '../../shared/services/app.service';
import { ThemeLangToggle } from '../../shared/components/theme-lang-toggle/theme-lang-toggle';

@Component({
  selector: 'app-pending-approval',
  standalone: true,
  imports: [RouterLink, ButtonModule, CardModule, ThemeLangToggle],
  templateUrl: './pending-approval.html',
  styleUrl: './pending-approval.scss',
})
export class PendingApproval {
  constructor(public appService: AppService) {}
}
