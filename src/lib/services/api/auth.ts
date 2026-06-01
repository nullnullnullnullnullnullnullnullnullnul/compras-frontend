import { apiClient }      from './client';
import type { Usuario }   from '$lib/types';

export const authService = {
  async me(fetch?: typeof globalThis.fetch): Promise<Usuario> {
    return apiClient.get<Usuario>('/api/v1/me', { fetch });
  },

  async logout(): Promise<void> {
    return apiClient.post('/api/v1/auth/logout');
  },
} as const;