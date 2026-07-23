import { Router } from 'express';
import { submitCandidateLead, submitEmployerLead, checkCandidateStatus } from '../controllers/leadController.js';

const router = Router();

router.post('/candidate', submitCandidateLead);
router.post('/employer', submitEmployerLead);
router.post('/status', checkCandidateStatus);

export default router;

