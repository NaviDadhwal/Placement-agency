import { z } from 'zod';

export const candidateLeadSchema = z.object({
  fullName: z.string().min(2, 'Full Name must be at least 2 characters').trim(),
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .regex(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, 'Invalid phone number format'),
  preferredLocation: z.string().min(2, 'Preferred Location must be at least 2 characters').trim(),
  industry: z.string().min(2, 'Please select or specify an industry'),
  resumeUrl: z.string().url('Invalid resume URL'),
  consentGiven: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the DPDP consent notice to proceed.' }),
  }),
});

export const employerLeadSchema = z.object({
  companyName: z.string().min(2, 'Company Name is required').trim(),
  contactPerson: z.string().min(2, 'Contact Person is required').trim(),
  email: z.string().email('Invalid email address'),
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .regex(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, 'Invalid phone number format'),
  hiringRole: z.string().min(2, 'Hiring Role is required'),
  requirements: z.string().optional(),
  consentGiven: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the DPDP consent notice to proceed.' }),
  }),
});

export const candidateStatusUpdateSchema = z.object({
  status: z.enum(['NEW', 'REVIEWED', 'SHORTLISTED', 'JOB_PROVIDED', 'REJECTED']),
  isSolved: z.boolean().optional(),
  placementNotes: z.string().optional(),
});

export const employerStatusUpdateSchema = z.object({
  status: z.enum(['NEW', 'CONTACTED', 'CLOSED']),
});

export type CandidateLeadInput = z.infer<typeof candidateLeadSchema>;
export type EmployerLeadInput = z.infer<typeof employerLeadSchema>;
