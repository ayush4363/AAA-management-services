import { Router } from 'express';
import { getAbout, updateAbout } from '../controllers/aboutController';

import { requireAuth } from '../middleware/auth';

const router = Router();

router.get('/', getAbout);
router.put('/', requireAuth as any, updateAbout);

export default router;
