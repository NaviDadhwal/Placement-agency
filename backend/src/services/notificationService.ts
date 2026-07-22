import nodemailer from 'nodemailer';
import { env } from '../config/env.js';
import { ICandidateLead } from '../models/CandidateLead.js';
import { IEmployerLead } from '../models/EmployerLead.js';

class NotificationService {
  private transporter: nodemailer.Transporter | null = null;

  constructor() {
    const isMockPass = !env.SMTP_PASS || env.SMTP_PASS === 'mock_pass' || env.SMTP_PASS === 'app_password_here';
    if (env.SMTP_HOST && env.SMTP_USER && !isMockPass) {
      this.transporter = nodemailer.createTransport({
        host: env.SMTP_HOST,
        port: Number(env.SMTP_PORT) || 587,
        secure: false,
        auth: {
          user: env.SMTP_USER,
          pass: env.SMTP_PASS,
        },
      });
    }
  }

  async sendCandidateLeadNotification(lead: ICandidateLead): Promise<void> {
    console.log(`\n🔔 [NOTIFICATION ENGINE] New Candidate Lead Registered!`);
    console.log(`👤 Candidate Name: ${lead.fullName}`);
    console.log(`📞 Mobile / WhatsApp: ${lead.phone}`);
    console.log(`🏭 Industry Category: ${lead.industry}`);
    console.log(`📍 Preferred Corridor: ${lead.preferredLocation}`);
    console.log(`📄 Cloud Resume Link: ${lead.resumeUrl}`);
    console.log(`✅ DPDP Consent: Verified\n`);

    if (!this.transporter) {
      console.log('ℹ️ [NOTIFICATION] Console alert logged (Live SMTP disabled).');
      return;
    }

    try {
      await this.transporter.sendMail({
        from: `"Next Step Placements System" <${env.SMTP_USER}>`,
        to: env.NOTIFICATION_EMAIL,
        subject: `🚨 NEW CANDIDATE LEAD: ${lead.fullName} (${lead.industry})`,
        html: `
          <h2>New Candidate Application</h2>
          <p><strong>Name:</strong> ${lead.fullName}</p>
          <p><strong>Phone:</strong> ${lead.phone}</p>
          <p><strong>Industry:</strong> ${lead.industry}</p>
          <p><strong>Preferred Location:</strong> ${lead.preferredLocation}</p>
          <p><strong>Resume URL:</strong> <a href="${lead.resumeUrl}">${lead.resumeUrl}</a></p>
          <p><strong>DPDP Consent:</strong> Verified Yes</p>
        `,
      });
      console.log('📧 Live Email alert dispatched to recruitment desk!');
    } catch (err) {
      console.error('❌ Failed to dispatch candidate email notification:', (err as Error).message);
    }
  }

  async sendEmployerLeadNotification(lead: IEmployerLead): Promise<void> {
    console.log(`\n🔔 [NOTIFICATION ENGINE] New Corporate Employer Inquiry Registered!`);
    console.log(`🏢 Company Name: ${lead.companyName}`);
    console.log(`👤 Contact Person: ${lead.contactPerson}`);
    console.log(`📞 Phone: ${lead.phone} | 📧 Email: ${lead.email}`);
    console.log(`💼 Target Hiring Role: ${lead.hiringRole}`);
    console.log(`📝 Requirements Summary: ${lead.requirements || 'N/A'}`);
    console.log(`✅ DPDP Consent: Verified\n`);

    if (!this.transporter) {
      console.log('ℹ️ [NOTIFICATION] Console alert logged (Live SMTP disabled).');
      return;
    }

    try {
      await this.transporter.sendMail({
        from: `"Next Step Placements System" <${env.SMTP_USER}>`,
        to: env.NOTIFICATION_EMAIL,
        subject: `🔥 NEW EMPLOYER INQUIRY: ${lead.companyName} (${lead.hiringRole})`,
        html: `
          <h2>New Corporate Employer Inquiry</h2>
          <p><strong>Company:</strong> ${lead.companyName}</p>
          <p><strong>Contact Person:</strong> ${lead.contactPerson}</p>
          <p><strong>Phone:</strong> ${lead.phone}</p>
          <p><strong>Email:</strong> ${lead.email}</p>
          <p><strong>Hiring Role:</strong> ${lead.hiringRole}</p>
          <p><strong>Requirements:</strong> ${lead.requirements || 'N/A'}</p>
          <p><strong>DPDP Consent:</strong> Verified Yes</p>
        `,
      });
      console.log('📧 Live Email alert dispatched to recruitment desk!');
    } catch (err) {
      console.error('❌ Failed to dispatch employer email notification:', (err as Error).message);
    }
  }
}

export const notificationService = new NotificationService();
