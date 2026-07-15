import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/today-murli/today-murli.component').then((m) => m.TodayMurliComponent),
  },
  {
    path: 'blessing',
    loadComponent: () =>
      import('./pages/blessing-card/blessing-card.component').then((m) => m.BlessingCardComponent),
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
];
