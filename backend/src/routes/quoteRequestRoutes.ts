import { Router } from 'express';
import {
  submitQuoteRequest,
  getQuoteRequests,
  updateQuoteRequestStatus,
  deleteQuoteRequest,
} from '../controllers/quoteRequestController';
import { requireAuth } from '../middleware/auth';

const router = Router();

// Public submission
router.post('/', submitQuoteRequest);

// Admin management
router.get('/', requireAuth as any, getQuoteRequests);
router.put('/:id', requireAuth as any, updateQuoteRequestStatus);
router.delete('/:id', requireAuth as any, deleteQuoteRequest);

export default router;
