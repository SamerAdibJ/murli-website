// Shared types for Murli Website
// Import in frontend/backend as: import { User } from 'shared'

export type Role = "admin" | "member";
export type UserStatus = "pending" | "active" | "rejected";
export type MurliType = "morning" | "avyakt";

export interface User {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	country: string;
	role: Role;
	status: UserStatus;
	emailVerified: boolean;
	createdAt: string;
	updatedAt: string;
}

export interface MurliResponse {
	id: number;
	date: string; // ISO date: '2026-07-09'
	type: MurliType;
	titleEn: string | null;
	titleAr: string | null;
	essenceAr: string | null;
	essenceEn: string | null;
	questionAr: string | null;
	questionEn: string | null;
	answerAr: string | null;
	answerEn: string | null;
	mainContentAr: string | null;
	mainContentEn: string | null;
	essenceForDharnaAr: string | null;
	essenceForDharnaEn: string | null;
	blessingAr: string | null;
	blessingEn: string | null;
	sloganAr: string | null;
	sloganEn: string | null;
	avyaktSignalAr: string | null;
	avyaktSignalEn: string | null;
	songTitleEn: string | null;
	songTitleAr: string | null;
	songUrl: string | null; // YouTube URL
	published: boolean;
	createdBy: string | null; // User ID
	createdAt: string;
	updatedAt: string;
}

export interface CreateMurliDto {
	date: string;
	type?: MurliType;
	titleEn?: string | null;
	titleAr?: string | null;
	essenceAr?: string | null;
	essenceEn?: string | null;
	questionAr?: string | null;
	questionEn?: string | null;
	answerAr?: string | null;
	answerEn?: string | null;
	mainContentAr?: string | null;
	mainContentEn?: string | null;
	essenceForDharnaAr?: string | null;
	essenceForDharnaEn?: string | null;
	blessingAr?: string | null;
	blessingEn?: string | null;
	sloganAr?: string | null;
	sloganEn?: string | null;
	avyaktSignalAr?: string | null;
	avyaktSignalEn?: string | null;
	songTitleEn?: string | null;
	songTitleAr?: string | null;
	songUrl?: string | null;
	published?: boolean;
	createdBy?: string | null;
}

export interface UpdateMurliDto {
	type?: MurliType;
	titleEn?: string | null;
	titleAr?: string | null;
	essenceAr?: string | null;
	essenceEn?: string | null;
	questionAr?: string | null;
	questionEn?: string | null;
	answerAr?: string | null;
	answerEn?: string | null;
	mainContentAr?: string | null;
	mainContentEn?: string | null;
	essenceForDharnaAr?: string | null;
	essenceForDharnaEn?: string | null;
	blessingAr?: string | null;
	blessingEn?: string | null;
	sloganAr?: string | null;
	sloganEn?: string | null;
	avyaktSignalAr?: string | null;
	avyaktSignalEn?: string | null;
	songTitleEn?: string | null;
	songTitleAr?: string | null;
	songUrl?: string | null;
	published?: boolean;
	date?: string;
}

export interface PaginatedResponse<T> {
	items: T[];
	total: number;
	page: number;
	limit: number;
}

export interface BlessingCard {
	id: number;
	contentEn: string;
	contentAr: string;
	theme: string | null;
	published: boolean;
	createdBy: string | null;
	createdAt: string;
	updatedAt: string;
}

export interface CreateBlessingDto {
	contentAr: string;
	contentEn: string;
	theme?: string | null;
	published?: boolean;
	createdBy?: string | null;
}

export interface UpdateBlessingDto {
	contentAr?: string;
	contentEn?: string;
	theme?: string | null;
	published?: boolean;
}

export interface UserBlessing {
	id: number;
	userId: string;
	blessingCardId: number;
	assignedDate: string;
	createdAt: string;
}

export interface Bookmark {
	id: number;
	userId: string;
	murliId: number;
	createdAt: string;
}

export interface CreateBookmarkDto {
	userId: string;
	murliId: number;
}

// API response wrapper
export interface ApiResponse<T> {
	success: boolean;
	data: T;
	message?: string;
}

export interface AuthResponse {
	user: User;
	token: string;
}

export interface LoginResponse {
	accessToken: string;
	refreshToken: string;
	user: {
		id: string;
		firstName: string;
		lastName: string;
		email: string;
		country: string;
		role: Role;
	};
}

export interface RefreshTokenDto {
	refreshToken: string;
}

export interface RefreshTokenResponse {
	accessToken: string;
	refreshToken: string;
}
