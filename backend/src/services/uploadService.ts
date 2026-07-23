import fs from 'fs';
import path from 'path';
import { env } from '../config/env.js';

export interface UploadTokenResponse {
  uploadUrl: string;
  fileKey: string;
  publicUrl: string;
  isMock: boolean;
}

class UploadService {
  private uploadsDir: string;

  constructor() {
    this.uploadsDir = path.join(process.cwd(), 'uploads', 'resumes');
    if (!fs.existsSync(this.uploadsDir)) {
      fs.mkdirSync(this.uploadsDir, { recursive: true });
    }
  }

  generateUploadToken(fileName: string, fileType: string): UploadTokenResponse {
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
    ];

    if (!allowedTypes.includes(fileType)) {
      throw new Error('Unsupported file format. Only PDF and DOCX documents are allowed.');
    }

    const timestamp = Date.now();
    const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
    const fileKey = `${timestamp}_${sanitizedFileName}`;

    const isLiveBlob = env.BLOB_READ_WRITE_TOKEN && env.BLOB_READ_WRITE_TOKEN !== 'vercel_blob_rw_mock_token';

    if (isLiveBlob) {
      return {
        uploadUrl: `https://blob.vercel-storage.com/resumes/${fileKey}`,
        fileKey: `resumes/${fileKey}`,
        publicUrl: `https://blob.vercel-storage.com/resumes/${fileKey}`,
        isMock: false,
      };
    }

    // Local Development URL served statically by Express at /uploads/resumes/
    const publicUrl = `http://localhost:${env.PORT}/uploads/resumes/${fileKey}`;
    const uploadUrl = `http://localhost:${env.PORT}/api/v1/uploads/file`;

    // Ensure a physical document exists in uploads/resumes directory
    const filePath = path.join(this.uploadsDir, fileKey);
    if (!fs.existsSync(filePath)) {
      const isDoc = fileKey.endsWith('.doc') || fileKey.endsWith('.docx');
      if (isDoc) {
        const docContent = `Make My Aim - Candidate Resume Document\nFile Name: ${sanitizedFileName}\nStatus: Verified Candidate Upload\nDate: ${new Date().toLocaleString()}`;
        fs.writeFileSync(filePath, docContent);
      } else {
        const pdfHeader = `%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj 2 0 obj<</Type/Pages/Count 1/Kids[3 0 R]>>endobj 3 0 obj<</Type/Page/MediaBox[0 0 612 792]/Parent 2 0 R/Resources<</Font<//F1 4 0 R>>>>/Contents 5 0 R>>endobj 4 0 obj<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>endobj 5 0 obj<</Length 85>>stream\nBT /F1 14 Tf 50 700 Td (Make My Aim - Candidate Resume Document: ${sanitizedFileName}) Tj ET\nendstream\nendobj\nxref\n0 6\n0000000000 65535 f\n0000000009 00000 n\n0000000058 00000 n\n0000000115 00000 n\n0000000223 00000 n\n0000000290 00000 n\ntrailer<</Size 6/Root 1 0 R>>\nstartxref\n425\n%%EOF`;
        fs.writeFileSync(filePath, pdfHeader);
      }
    }

    return {
      uploadUrl,
      fileKey,
      publicUrl,
      isMock: true,
    };
  }

  getUploadsDirectory(): string {
    return this.uploadsDir;
  }
}

export const uploadService = new UploadService();
