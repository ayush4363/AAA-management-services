import { Router } from 'express';
import { getProcessSteps, updateProcessSteps } from '../controllers/processController';

import { requireAuth } from '../middleware/auth';

const router = Router();

router.get('/', getProcessSteps);
router.put('/', requireAuth as any, updateProcessSteps);

export default router;
