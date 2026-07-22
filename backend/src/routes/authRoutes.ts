import { Router } from 'express';
import { login, refresh, logout, getMe } from '../controllers/authController.js';
import { authenticateJWT } from '../middleware/auth.js';

const router = Router();

router.post('/login', login);
router.post('/refresh', refresh);
router.post('/logout', logout);
router.get('/me', authenticateJWT, getMe);

export default router;
