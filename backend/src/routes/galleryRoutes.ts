import { Router } from 'express';
import {
  getGalleryImages,
  getAllGalleryAdmin,
  addGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
} from '../controllers/galleryController';
import { requireAuth } from '../middleware/auth';

const router = Router();

// Public route
router.get('/', getGalleryImages);

// Admin routes
router.get('/admin/all', requireAuth as any, getAllGalleryAdmin);
router.post('/', requireAuth as any, addGalleryImage);
router.put('/:id', requireAuth as any, updateGalleryImage);
router.delete('/:id', requireAuth as any, deleteGalleryImage);

export default router;
