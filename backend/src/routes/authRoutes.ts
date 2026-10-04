import { Router } from 'express';
import { login, getMe, logout, updatePassword } from '../controllers/authController';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.post('/login', login);
router.get('/me', requireAuth as any, getMe as any);
router.post('/logout', logout);
router.post('/password', requireAuth as any, updatePassword as any);

export default router;
