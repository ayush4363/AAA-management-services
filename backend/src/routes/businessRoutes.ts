import { Router } from 'express';
import { getBusinessInfo, updateBusinessInfo } from '../controllers/businessController';

import { requireAuth } from '../middleware/auth';

const router = Router();

router.get('/', getBusinessInfo);
router.put('/', requireAuth as any, updateBusinessInfo);

export default router;
