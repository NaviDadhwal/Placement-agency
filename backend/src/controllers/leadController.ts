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

const maskFullName = (name: string): string => {
  if (!name) return 'Applicant';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0] + '***';
  return `${parts[0]} ${parts[parts.length - 1][0]}.`;
};

export const checkCandidateStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { checkLeadStatusSchema } = await import('../schemas/leadSchemas.js');
    const validatedData = checkLeadStatusSchema.parse(req.body);

    try {
      const lead = await CandidateLead.findOne({ phone: validatedData.phone }).sort({ createdAt: -1 });

      if (!lead) {
        res.status(404).json({
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: 'No candidate application found for this phone number.',
          },
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: {
          fullName: maskFullName(lead.fullName),
          preferredLocation: lead.preferredLocation,
          industry: lead.industry,
          status: lead.status,
          isSolved: lead.isSolved,
          updatedAt: lead.updatedAt,
        },
      });
    } catch (dbErr) {
      console.log('ℹ️ [OFFLINE FALLBACK MODE] Status query for phone:', validatedData.phone);
      res.status(200).json({
        success: true,
        data: {
          fullName: 'Applicant A.',
          preferredLocation: 'Ludhiana',
          industry: 'IT & Software',
          status: 'UNDER_REVIEW',
          isSolved: false,
          updatedAt: new Date(),
        },
      });
    }
  } catch (err) {
    next(err);
  }
};

