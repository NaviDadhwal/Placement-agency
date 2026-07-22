import { Request, Response, NextFunction } from 'express';
import { CandidateLead } from '../models/CandidateLead.js';
import { EmployerLead } from '../models/EmployerLead.js';
import { candidateStatusUpdateSchema, employerStatusUpdateSchema } from '../schemas/leadSchemas.js';
import { isDBConnected } from '../config/db.js';

const mockCandidates = [
  {
    _id: '6a610ba99cfc54ae20a0cc09',
    fullName: 'Navi Dadhwal',
    phone: '9876543210',
    preferredLocation: 'Ludhiana',
    industry: 'IT & Software',
    resumeUrl: 'https://example.com/resume.pdf',
    consentGiven: true,
    status: 'NEW',
    isSolved: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const mockEmployers = [
  {
    _id: '6a6113809cfc54ae20a0cc0f',
    companyName: 'MakeMyAim Tech',
    contactPerson: 'Navi Dadhwal',
    email: 'contact@makemyaim.com',
    phone: '9876543210',
    hiringRole: 'Senior Node.js Developer',
    requirements: '3+ years Express.js & MongoDB',
    consentGiven: true,
    status: 'NEW',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const getCandidateLeads = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit as string) || 10));
    const status = req.query.status as string;
    const isSolved = req.query.isSolved as string;
    const search = req.query.search as string;

    if (!isDBConnected()) {
      res.json({
        success: true,
        data: {
          candidates: mockCandidates,
          pagination: {
            page,
            limit,
            total: mockCandidates.length,
            totalPages: 1,
          },
        },
      });
      return;
    }

    const query: any = {};

    if (status) {
      query.status = status;
    }

    if (isSolved !== undefined && isSolved !== '') {
      query.isSolved = isSolved === 'true';
    }

    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { industry: { $regex: search, $options: 'i' } },
      ];
    }

    const total = await CandidateLead.countDocuments(query);
    const candidates = await CandidateLead.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      success: true,
      data: {
        candidates,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

export const updateCandidateStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { status, isSolved, placementNotes } = candidateStatusUpdateSchema.parse(req.body);

    if (!isDBConnected()) {
      const mockLead = mockCandidates.find((c) => c._id === id) || mockCandidates[0];
      mockLead.status = status;
      if (isSolved !== undefined) mockLead.isSolved = isSolved;
      res.json({
        success: true,
        message: 'Candidate status updated successfully (Dev Mode)',
        data: mockLead,
      });
      return;
    }

    const lead = await CandidateLead.findById(id);
    if (!lead) {
      res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Candidate lead record not found' },
      });
      return;
    }

    lead.status = status;

    if (status === 'JOB_PROVIDED' || isSolved === true) {
      lead.isSolved = true;
      lead.solvedAt = lead.solvedAt || new Date();
    } else if (isSolved === false) {
      lead.isSolved = false;
      lead.solvedAt = undefined;
    }

    if (placementNotes !== undefined) {
      lead.placementNotes = placementNotes;
    }

    await lead.save();

    res.json({
      success: true,
      message: 'Candidate status updated successfully',
      data: lead,
    });
  } catch (err) {
    next(err);
  }
};

export const getEmployerLeads = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit as string) || 10));
    const status = req.query.status as string;
    const search = req.query.search as string;

    if (!isDBConnected()) {
      res.json({
        success: true,
        data: {
          employers: mockEmployers,
          pagination: {
            page,
            limit,
            total: mockEmployers.length,
            totalPages: 1,
          },
        },
      });
      return;
    }

    const query: any = {};

    if (status) {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { companyName: { $regex: search, $options: 'i' } },
        { contactPerson: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { hiringRole: { $regex: search, $options: 'i' } },
      ];
    }

    const total = await EmployerLead.countDocuments(query);
    const employers = await EmployerLead.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      success: true,
      data: {
        employers,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

export const updateEmployerStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = employerStatusUpdateSchema.parse(req.body);

    if (!isDBConnected()) {
      const mockLead = mockEmployers.find((e) => e._id === id) || mockEmployers[0];
      mockLead.status = status;
      res.json({
        success: true,
        message: 'Employer lead status updated successfully (Dev Mode)',
        data: mockLead,
      });
      return;
    }

    const lead = await EmployerLead.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!lead) {
      res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Employer lead record not found' },
      });
      return;
    }

    res.json({
      success: true,
      message: 'Employer lead status updated successfully',
      data: lead,
    });
  } catch (err) {
    next(err);
  }
};

export const exportCandidatesCSV = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const candidates = isDBConnected()
      ? await CandidateLead.find().sort({ createdAt: -1 })
      : mockCandidates;

    const headers = 'ID,Full Name,Phone,Industry,Location,Status,Job Solved,Placed Date,Resume URL,Applied At\n';
    const rows = candidates
      .map(
        (c: any) =>
          `"${c._id}","${c.fullName}","${c.phone}","${c.industry}","${c.preferredLocation}","${c.status}","${c.isSolved}","${c.solvedAt ? new Date(c.solvedAt).toISOString() : ''}","${c.resumeUrl}","${new Date(c.createdAt).toISOString()}"`
      )
      .join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="candidates_leads_export.csv"');
    res.status(200).send(headers + rows);
  } catch (err) {
    next(err);
  }
};

export const exportEmployersCSV = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const employers = isDBConnected()
      ? await EmployerLead.find().sort({ createdAt: -1 })
      : mockEmployers;

    const headers = 'ID,Company Name,Contact Person,Email,Phone,Hiring Role,Status,Submitted At\n';
    const rows = employers
      .map(
        (e: any) =>
          `"${e._id}","${e.companyName}","${e.contactPerson}","${e.email}","${e.phone}","${e.hiringRole}","${e.status}","${new Date(e.createdAt).toISOString()}"`
      )
      .join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="employers_leads_export.csv"');
    res.status(200).send(headers + rows);
  } catch (err) {
    next(err);
  }
};
