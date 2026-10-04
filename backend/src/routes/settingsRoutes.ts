import { Router } from 'express';
import { getSettings, updateSettings } from '../controllers/settingsController';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.get('/', getSettings);
router.put('/', requireAuth as any, updateSettings);

export default router;
