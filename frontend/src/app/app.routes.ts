import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';
import { pendingApprovalGuard } from './shared/guards/pending-approval.guard';
import { guestGuard } from './shared/guards/guest.guard';

export const routes: Routes = [
  {
    path: 'signin',
    loadComponent: () => import('./pages/signin/signin').then((m) => m.Signin),
    canActivate: [guestGuard],
  },
  {
    path: 'pending-approval',
    loadComponent: () =>
      import('./pages/pending-approval/pending-approval').then((m) => m.PendingApproval),
    canActivate: [pendingApprovalGuard, guestGuard],
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/signup/signup').then((m) => m.Signup),
    canActivate: [guestGuard],
  },
  {
    path: '',
    loadComponent: () => import('./shell/shell').then((m) => m.ShellComponent),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: '/murli',
        pathMatch: 'full',
      },
      {
        path: 'murli',
        pathMatch: 'full',
        loadComponent: () =>
          import('./pages/today-murli/today-murli.component').then((m) => m.TodayMurliComponent),
      },
      {
        path: 'blessing',
        loadComponent: () =>
          import('./pages/blessing-card/blessing-card.component').then(
            (m) => m.BlessingCardComponent,
          ),
      },
      {
        path: 'bookmarks',
        loadComponent: () =>
          import('./pages/bookmarks/bookmarks.component').then((m) => m.BookmarksComponent),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./pages/profile/profile.component').then((m) => m.ProfileComponent),
      },
      {
        path: 'members',
        loadComponent: () =>
          import('./pages/members/members.component').then((m) => m.MembersComponent),
      },
      {
        path: 'settings',
        loadComponent: () => import('./pages/settings/settings.component').then((m) => m.Settings),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
