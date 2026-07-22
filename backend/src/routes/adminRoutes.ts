import { Router } from 'express';
import {
  getCandidateLeads,
  updateCandidateStatus,
  getEmployerLeads,
  updateEmployerStatus,
  exportCandidatesCSV,
  exportEmployersCSV,
} from '../controllers/adminController.js';
import { authenticateJWT, requireRole } from '../middleware/auth.js';

const router = Router();

// Protect all admin routes with JWT auth
router.use(authenticateJWT);

router.get('/candidates', getCandidateLeads);
router.patch('/candidates/:id/status', updateCandidateStatus);

router.get('/employers', getEmployerLeads);
router.patch('/employers/:id/status', updateEmployerStatus);

router.get('/export/candidates', requireRole('ADMIN'), exportCandidatesCSV);
router.get('/export/employers', requireRole('ADMIN'), exportEmployersCSV);

export default router;
