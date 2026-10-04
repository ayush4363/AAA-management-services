import { Router } from 'express';
import { getHero, updateHero } from '../controllers/heroController';

import { requireAuth } from '../middleware/auth';

const router = Router();

router.get('/', getHero);
router.put('/', requireAuth as any, updateHero);

export default router;
