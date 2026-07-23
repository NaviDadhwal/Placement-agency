import mongoose, { Document, Schema } from 'mongoose';

export interface IEmployerLead extends Document {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  hiringRole: string;
  requirements?: string;
  consentGiven: boolean;
  status: 'NEW' | 'CONTACTED' | 'CLOSED';
  createdAt: Date;
  updatedAt: Date;
}

const EmployerLeadSchema: Schema = new Schema<IEmployerLead>(
  {
    companyName: { type: String, required: true, trim: true },
    contactPerson: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    hiringRole: { type: String, required: true, trim: true },
    requirements: { type: String, trim: true },
    consentGiven: { type: Boolean, required: true, default: true },
    status: {
      type: String,
      enum: ['NEW', 'CONTACTED', 'CLOSED'],
      default: 'NEW',
    },
  },
  {
    timestamps: true,
  }
);

EmployerLeadSchema.index({ email: 1 });
EmployerLeadSchema.index({ status: 1, createdAt: -1 });

export const EmployerLead =
  mongoose.models.EmployerLead ||
  mongoose.model<IEmployerLead>('EmployerLead', EmployerLeadSchema);
