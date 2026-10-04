import { Router } from 'express';
import {
  getFAQs,
  getAllFAQsAdmin,
  createFAQ,
  updateFAQ,
  deleteFAQ,
} from '../controllers/faqController';
import { requireAuth } from '../middleware/auth';

const router = Router();

// Public route
router.get('/', getFAQs);

// Admin routes
router.get('/admin/all', requireAuth as any, getAllFAQsAdmin);
router.post('/', requireAuth as any, createFAQ);
router.put('/:id', requireAuth as any, updateFAQ);
router.delete('/:id', requireAuth as any, deleteFAQ);

export default router;
