import { apiClient } from './api';
import { PricingConfigItem } from '../types';

export interface BreakdownResult {
  basicWage: number;
  pf: number;
  esi: number;
  bonus: number;
  el: number;
  uniform: number;
  serviceCharge: number;
  subtotal: number;
  gst: number;
  finalPerPerson: number;
}

export interface PricingCalculationResponse {
  breakdown: BreakdownResult;
  totalMonthly: number;
}

export const pricingService = {
  getPricingConfigs: async () => {
    return apiClient<PricingConfigItem[]>('/pricing');
  },
  getAllPricingConfigsAdmin: async () => {
    return apiClient<PricingConfigItem[]>('/pricing/admin/all');
  },
  calculatePricing: async (payload: { personnelConfigId?: string; customConfig?: Partial<PricingConfigItem>; count?: number }) => {
    return apiClient<PricingCalculationResponse>('/pricing/calculate', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
  updatePricingConfig: async (id: string, data: Partial<PricingConfigItem>) => {
    return apiClient<PricingConfigItem>(`/pricing/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  createPricingConfig: async (data: Partial<PricingConfigItem>) => {
    return apiClient<PricingConfigItem>('/pricing', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};
