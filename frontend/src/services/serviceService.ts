import { apiClient } from './api';
import { ServiceItem } from '../types';

export const serviceService = {
  getServices: async () => {
    return apiClient<ServiceItem[]>('/services');
  },
  getAllServicesAdmin: async () => {
    return apiClient<ServiceItem[]>('/services/admin/all');
  },
  getServiceBySlug: async (slug: string) => {
    return apiClient<ServiceItem>(`/services/slug/${slug}`);
  },
  createService: async (data: Partial<ServiceItem>) => {
    return apiClient<ServiceItem>('/services', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  updateService: async (id: string, data: Partial<ServiceItem>) => {
    return apiClient<ServiceItem>(`/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  deleteService: async (id: string) => {
    return apiClient(`/services/${id}`, {
      method: 'DELETE',
    });
  },
};
