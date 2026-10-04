import { Router } from 'express';
import {
  getQuotations,
  getQuotationById,
  createQuotation,
  updateQuotationStatus,
  deleteQuotation,
} from '../controllers/quotationController';
import { requireAuth } from '../middleware/auth';

const router = Router();

// Admin protected endpoints
router.get('/', requireAuth as any, getQuotations);
router.get('/:id', requireAuth as any, getQuotationById);
router.post('/', requireAuth as any, createQuotation);
router.put('/:id/status', requireAuth as any, updateQuotationStatus);
router.delete('/:id', requireAuth as any, deleteQuotation);

export default router;
