import { apiClient } from './api';
import { HeroData, AboutData, WhyChooseUsItem, ProcessStepItem } from '../types';

export const contentService = {
  // Hero Section
  getHero: async () => {
    return apiClient<HeroData>('/hero');
  },
  updateHero: async (data: Partial<HeroData>) => {
    return apiClient<HeroData>('/hero', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // About Section
  getAbout: async () => {
    return apiClient<AboutData>('/about');
  },
  updateAbout: async (data: Partial<AboutData>) => {
    return apiClient<AboutData>('/about', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Why AAA Section
  getWhyAaa: async () => {
    return apiClient<WhyChooseUsItem[]>('/why-aaa');
  },
  updateWhyAaa: async (items: WhyChooseUsItem[]) => {
    return apiClient<WhyChooseUsItem[]>('/why-aaa', {
      method: 'PUT',
      body: JSON.stringify({ items }),
    });
  },

  // Process Steps Section
  getProcessSteps: async () => {
    return apiClient<ProcessStepItem[]>('/process');
  },
  updateProcessSteps: async (steps: ProcessStepItem[]) => {
    return apiClient<ProcessStepItem[]>('/process', {
      method: 'PUT',
      body: JSON.stringify({ steps }),
    });
  },
};
