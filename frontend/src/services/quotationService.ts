import { apiClient } from './api';

export interface CreateQuotationPayload {
  clientName: string;
  organizationName: string;
  email: string;
  phone: string;
  facilityLocation: string;
  quoteRequestId?: string;
  rawItems: Array<{
    personnelConfigId: string;
    count: number;
    workingHours?: number;
  }>;
  validDays?: number;
  customTerms?: string[];
}

export const quotationService = {
  getQuotations: async () => {
    return apiClient('/quotations');
  },
  getQuotationById: async (id: string) => {
    return apiClient(`/quotations/${id}`);
  },
  createQuotation: async (payload: CreateQuotationPayload) => {
    return apiClient('/quotations', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
  updateStatus: async (id: string, status: string) => {
    return apiClient(`/quotations/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },
  deleteQuotation: async (id: string) => {
    return apiClient(`/quotations/${id}`, {
      method: 'DELETE',
    });
  },
};
