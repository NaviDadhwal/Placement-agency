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
