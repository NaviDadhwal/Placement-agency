import { Router } from 'express';
import { submitCandidateLead, submitEmployerLead } from '../controllers/leadController.js';

const router = Router();

router.post('/candidate', submitCandidateLead);
router.post('/employer', submitEmployerLead);

export default router;
