import { Router } from 'express';
import {
  getPricingConfigs,
  getAllPricingConfigsAdmin,
  calculatePricing,
  updatePricingConfig,
  createPricingConfig,
} from '../controllers/pricingController';
import { requireAuth } from '../middleware/auth';

const router = Router();

// Public routes for quote calculation
router.get('/', getPricingConfigs);
router.post('/calculate', calculatePricing);

// Admin routes
router.get('/admin/all', requireAuth as any, getAllPricingConfigsAdmin);
router.post('/', requireAuth as any, createPricingConfig);
router.put('/:id', requireAuth as any, updatePricingConfig);

export default router;
