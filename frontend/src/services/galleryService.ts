import { apiClient } from './api';
import { GalleryItem } from '../types';

export const galleryService = {
  getGalleryImages: async (category?: string) => {
    const query = category && category !== 'all' ? `?category=${category}` : '';
    return apiClient<GalleryItem[]>(`/gallery${query}`);
  },
  getAllGalleryAdmin: async () => {
    return apiClient<GalleryItem[]>('/gallery/admin/all');
  },
  addImage: async (data: Partial<GalleryItem>) => {
    return apiClient<GalleryItem>('/gallery', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  deleteImage: async (id: string) => {
    return apiClient(`/gallery/${id}`, {
      method: 'DELETE',
    });
  },
};
