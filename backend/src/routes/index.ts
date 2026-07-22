import { Router } from 'express';
import authRoutes from './authRoutes.js';
import leadRoutes from './leadRoutes.js';
import uploadRoutes from './uploadRoutes.js';
import adminRoutes from './adminRoutes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/leads', leadRoutes);
router.use('/uploads', uploadRoutes);
router.use('/admin', adminRoutes);

export default router;
