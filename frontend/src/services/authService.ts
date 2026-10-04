import { apiClient } from './api';

export const authService = {
  login: async (credentials: { email: string; password: string }) => {
    return apiClient('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },
  getCurrentUser: async () => {
    return apiClient('/auth/me');
  },
  logout: async () => {
    localStorage.removeItem('aaa_admin_token');
    return apiClient('/auth/logout', { method: 'POST' });
  },
};
