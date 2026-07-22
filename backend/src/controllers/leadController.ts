import { Request, Response, NextFunction } from 'express';
import { CandidateLead } from '../models/CandidateLead.js';
import { EmployerLead } from '../models/EmployerLead.js';
import { candidateLeadSchema, employerLeadSchema } from '../schemas/leadSchemas.js';
import { notificationService } from '../services/notificationService.js';
import { isDBConnected } from '../config/db.js';

export const submitCandidateLead = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const validatedData = candidateLeadSchema.parse(req.body);

    let leadId = 'mock_cand_lead_' + Date.now();
    let createdAt = new Date();

    try {
      const lead = await CandidateLead.create({
        ...validatedData,
        status: 'NEW',
        isSolved: false,
      });
      leadId = lead._id.toString();
      createdAt = lead.createdAt;

      notificationService.sendCandidateLeadNotification(lead).catch((err) => {
        console.error('Async notification error:', err);
      });
    } catch (dbErr) {
      console.log('ℹ️ [OFFLINE FALLBACK MODE] Candidate lead validated:', validatedData);
      notificationService
        .sendCandidateLeadNotification({
          ...validatedData,
          _id: leadId,
          status: 'NEW',
          isSolved: false,
          createdAt,
          updatedAt: createdAt,
        } as any)
        .catch(() => {});
    }

    res.status(201).json({
      success: true,
      message: 'Application received successfully! Our recruitment team will contact you shortly.',
      data: {
        id: leadId,
        fullName: validatedData.fullName,
        industry: validatedData.industry,
        createdAt,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const submitEmployerLead = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const validatedData = employerLeadSchema.parse(req.body);

    let leadId = 'mock_emp_lead_' + Date.now();
    let createdAt = new Date();

    try {
      const lead = await EmployerLead.create({
        ...validatedData,
        status: 'NEW',
      });
      leadId = lead._id.toString();
      createdAt = lead.createdAt;

      notificationService.sendEmployerLeadNotification(lead).catch((err) => {
        console.error('Async notification error:', err);
      });
    } catch (dbErr) {
      console.log('ℹ️ [OFFLINE FALLBACK MODE] Employer lead validated:', validatedData);
      notificationService
        .sendEmployerLeadNotification({
          ...validatedData,
          _id: leadId,
          status: 'NEW',
          createdAt,
          updatedAt: createdAt,
        } as any)
        .catch(() => {});
    }

    res.status(201).json({
      success: true,
      message: 'Hiring inquiry received successfully! Our team will contact you shortly.',
      data: {
        id: leadId,
        companyName: validatedData.companyName,
        hiringRole: validatedData.hiringRole,
        createdAt,
      },
    });
  } catch (err) {
    next(err);
  }
};
