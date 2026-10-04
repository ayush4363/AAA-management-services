import { Router } from 'express';
import {
  submitEnquiry,
  getEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
} from '../controllers/enquiryController';
import { requireAuth } from '../middleware/auth';

const router = Router();

// Public submission
router.post('/', submitEnquiry);

// Admin management
router.get('/', requireAuth as any, getEnquiries);
router.put('/:id', requireAuth as any, updateEnquiryStatus);
router.delete('/:id', requireAuth as any, deleteEnquiry);

export default router;
