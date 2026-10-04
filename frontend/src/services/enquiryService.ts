import { apiClient } from './api';
import { ContactEnquiryInput } from '../types';

export const enquiryService = {
  submitEnquiry: async (data: ContactEnquiryInput) => {
    return apiClient('/enquiries', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  getEnquiries: async () => {
    return apiClient('/enquiries');
  },
  updateStatus: async (id: string, status: string, notes?: string) => {
    return apiClient(`/enquiries/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status, notes }),
    });
  },
  deleteEnquiry: async (id: string) => {
    return apiClient(`/enquiries/${id}`, {
      method: 'DELETE',
    });
  },
};
