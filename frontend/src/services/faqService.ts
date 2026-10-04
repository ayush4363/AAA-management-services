import { apiClient } from './api';

export interface FAQItem {
  _id?: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  isActive: boolean;
}

export const faqService = {
  getFAQs: async () => {
    return apiClient<FAQItem[]>('/faqs');
  },
  getAllFAQsAdmin: async () => {
    return apiClient<FAQItem[]>('/faqs/admin/all');
  },
  createFAQ: async (data: Partial<FAQItem>) => {
    return apiClient<FAQItem>('/faqs', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  updateFAQ: async (id: string, data: Partial<FAQItem>) => {
    return apiClient<FAQItem>(`/faqs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  deleteFAQ: async (id: string) => {
    return apiClient(`/faqs/${id}`, {
      method: 'DELETE',
    });
  },
};
