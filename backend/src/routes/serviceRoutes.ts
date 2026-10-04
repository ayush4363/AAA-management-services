import { Router } from 'express';
import {
  getServices,
  getAllServicesAdmin,
  getServiceBySlug,
  createService,
  updateService,
  deleteService,
} from '../controllers/serviceController';
import { requireAuth } from '../middleware/auth';

const router = Router();

// Public routes
router.get('/', getServices);
router.get('/slug/:slug', getServiceBySlug);

// Admin routes
router.get('/admin/all', requireAuth as any, getAllServicesAdmin);
router.post('/', requireAuth as any, createService);
router.put('/:id', requireAuth as any, updateService);
router.delete('/:id', requireAuth as any, deleteService);

export default router;
