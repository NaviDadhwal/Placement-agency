import mongoose, { Document, Schema } from 'mongoose';

export interface ICandidateLead extends Document {
  fullName: string;
  phone: string;
  preferredLocation: string;
  industry: string;
  resumeUrl: string;
  consentGiven: boolean;
  status: 'NEW' | 'REVIEWED' | 'SHORTLISTED' | 'JOB_PROVIDED' | 'REJECTED';
  isSolved: boolean;
  solvedAt?: Date;
  placementNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CandidateLeadSchema: Schema = new Schema<ICandidateLead>(
  {
    fullName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    preferredLocation: { type: String, required: true, trim: true },
    industry: { type: String, required: true, trim: true },
    resumeUrl: { type: String, required: true, trim: true, default: '' },
    consentGiven: { type: Boolean, required: true, default: true },
    status: {
      type: String,
      enum: ['NEW', 'REVIEWED', 'SHORTLISTED', 'JOB_PROVIDED', 'REJECTED'],
      default: 'NEW',
    },
    isSolved: { type: Boolean, default: false },
    solvedAt: { type: Date },
    placementNotes: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

CandidateLeadSchema.index({ phone: 1 });
CandidateLeadSchema.index({ status: 1, createdAt: -1 });

export const CandidateLead =
  mongoose.models.CandidateLead ||
  mongoose.model<ICandidateLead>('CandidateLead', CandidateLeadSchema);
