export type CandidateStatus =
  | 'NEW'
  | 'REVIEWED'
  | 'UNDER_REVIEW'
  | 'SHORTLISTED'
  | 'JOB_PROVIDED'
  | 'REJECTED';

export type EmployerStatus = 'NEW' | 'CONTACTED' | 'CLOSED';

export interface CandidateLead {
  _id: string;
  fullName: string;
  phone: string;
  preferredLocation: string;
  industry: string;
  resumeUrl: string;
  consentGiven: boolean;
  status: CandidateStatus;
  isSolved: boolean;
  solvedAt?: string;
  placementNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EmployerLead {
  _id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  hiringRole: string;
  requirements?: string;
  consentGiven: boolean;
  status: EmployerStatus;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  id: string;
  email: string;
  role: 'ADMIN' | 'STAFF';
}

export interface StatusCheckResult {
  fullName: string;
  preferredLocation: string;
  industry: string;
  status: CandidateStatus;
  isSolved: boolean;
  updatedAt: string;
}
