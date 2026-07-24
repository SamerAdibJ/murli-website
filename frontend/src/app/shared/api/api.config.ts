import { environment } from '../../../environments/environment';

export const API = {
  baseUrl: environment.apiUrl,

  auth: {
    register: '/auth/register',
    login: '/auth/login',
    refresh: '/auth/refresh',
    logout: '/auth/logout',
    logoutAll: '/auth/logout-all',
  },

  murlis: {
    today: '/murli/today',
    byDate: (date: string) => `/murli/${date}`,
    list: '/murlis',
    create: '/murli',
    update: (id: number) => `/murli/${id}`,
    delete: (id: number) => `/murli/${id}`,
  },

  blessings: {
    today: '/blessing/today',
    history: '/blessing/history',
    list: '/blessings',
    create: '/blessings',
    update: (id: number) => `/blessings/${id}`,
    delete: (id: number) => `/blessings/${id}`,
  },

  bookmarks: {
    list: '/bookmarks',
    create: '/bookmarks',
    delete: (murliId: number) => `/bookmarks/${murliId}`,
  },

  admin: {
    users: '/admin/users',
    pending: '/admin/users/pending',
    approve: (id: string) => `/admin/users/${id}/approve`,
    reject: (id: string) => `/admin/users/${id}/reject`,
    promote: (id: string) => `/admin/users/${id}/promote`,
  },
};
