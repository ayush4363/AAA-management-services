import { apiClient } from './api';
import { QuoteRequestInput } from '../types';

export const quoteService = {
  submitQuoteRequest: async (data: QuoteRequestInput) => {
    return apiClient('/quote-requests', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  getQuoteRequests: async () => {
    return apiClient('/quote-requests');
  },
  updateStatus: async (id: string, status: string, notes?: string, estimatedBudget?: number) => {
    return apiClient(`/quote-requests/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status, notes, estimatedBudget }),
    });
  },
  deleteQuoteRequest: async (id: string) => {
    return apiClient(`/quote-requests/${id}`, {
      method: 'DELETE',
    });
  },
};
