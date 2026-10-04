import { apiClient } from './api';
import { BusinessInfo } from '../types';

export const businessService = {
  getBusinessInfo: async () => {
    return apiClient<BusinessInfo>('/business');
  },
  updateBusinessInfo: async (data: Partial<BusinessInfo>) => {
    return apiClient<BusinessInfo>('/business', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
};
