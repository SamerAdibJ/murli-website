import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AppService } from '../../shared/services/app.service';

@Component({
  selector: 'app-profile',
  imports: [CardModule, ButtonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  constructor(public appService: AppService) {}

  readonly user = {
    firstName: 'Samer',
    lastName: 'Jaafar',
    email: 'samer@example.com',
    role: 'admin' as const,
    joined: new Date('2026-01-15'),
    bookmarks: 6,
    blessings: 12,
  };

  get displayName(): string {
    return `${this.user.firstName} ${this.user.lastName}`;
  }

  get initials(): string {
    return `${this.user.firstName[0]}${this.user.lastName[0]}`;
  }

  get joinDate(): string {
    return this.user.joined.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
  }

  onChangePassword(): void {
    console.log('Change password clicked');
  }

  onDeleteAccount(): void {
    console.log('Delete account clicked');
  }
}
