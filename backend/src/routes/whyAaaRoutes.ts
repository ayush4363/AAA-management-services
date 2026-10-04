import { Router } from 'express';
import { getWhyAaa, updateWhyAaa } from '../controllers/whyAaaController';

import { requireAuth } from '../middleware/auth';

const router = Router();

router.get('/', getWhyAaa);
router.put('/', requireAuth as any, updateWhyAaa);

export default router;
