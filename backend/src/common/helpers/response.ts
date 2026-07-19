import { ApiResponse } from 'shared';

export function ok<T>(data: T, message?: string): ApiResponse<T> {
  return { success: true, data, message };
}
