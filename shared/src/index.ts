// Shared types for Murli Website
// Import in frontend/backend as: import { User } from 'shared'

export type Role = 'admin' | 'member';
export type UserStatus = 'active' | 'inactive' | 'pending';

export interface User {
  id: string;
  email: string;
  displayName: string;
  role: Role;
  status: UserStatus;
  createdAt: string;
}

export interface Murli {
  id: string;
  date: string;          // ISO date: '2026-07-09'
  titleAr: string;
  contentAr: string;
  contentEn?: string;
  summaryAr?: string;
  summaryEn?: string;
  songTitle?: string;
  songUrl?: string;       // YouTube URL
  published: boolean;
  createdBy: string;      // User ID
  createdAt: string;
  updatedAt: string;
}

export interface BlessingCard {
  id: string;
  contentAr: string;
  theme?: string;
  createdAt: string;
}

export interface UserBlessing {
  id: string;
  userId: string;
  blessingCardId: string;
  assignedAt: string;
  refreshedAt?: string;
}

export interface Bookmark {
  id: string;
  userId: string;
  murliId: string;
  createdAt: string;
}

// API response wrapper
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
