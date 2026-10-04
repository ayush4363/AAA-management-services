import { apiClient } from './api';

export interface WebsiteSettingsData {
  _id?: string;
  siteTitle: string;
  metaDescription: string;
  enableQuoteRequests: boolean;
  maintenanceMode: boolean;
  supportPhone: string;
  supportEmail: string;
}

export const settingsService = {
  getSettings: async () => {
    return apiClient<WebsiteSettingsData>('/settings');
  },
  updateSettings: async (data: Partial<WebsiteSettingsData>) => {
    return apiClient<WebsiteSettingsData>('/settings', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
};
