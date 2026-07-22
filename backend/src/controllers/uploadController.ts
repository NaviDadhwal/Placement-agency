import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import fs from 'fs';
import path from 'path';
import { uploadService } from '../services/uploadService.js';
import { env } from '../config/env.js';

const uploadTokenSchema = z
  .object({
    fileName: z.string().optional(),
    filename: z.string().optional(),
    fileType: z.string().optional(),
    contentType: z.string().optional(),
    mimeType: z.string().optional(),
  })
  .transform((data) => ({
    fileName: data.fileName || data.filename || 'resume.pdf',
    fileType: data.fileType || data.contentType || data.mimeType || 'application/pdf',
  }));

export const getUploadToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { fileName, fileType } = uploadTokenSchema.parse(req.body);
    const tokenData = uploadService.generateUploadToken(fileName, fileType);

    res.json({
      success: true,
      data: tokenData,
    });
  } catch (err) {
    next(err);
  }
};

export const uploadFileLocal = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let uploadedFile =
      req.file ||
      (Array.isArray(req.files) && req.files.length > 0
        ? (req.files[0] as Express.Multer.File)
        : null);

    // Development / Test mode fallback when tested in Postman without attaching a physical file
    if (!uploadedFile) {
      if (env.NODE_ENV === 'development') {
        const timestamp = Date.now();
        const dummyFileName = `${timestamp}_sample_resume.pdf`;
        const dummyPath = path.join(uploadService.getUploadsDirectory(), dummyFileName);
        fs.writeFileSync(
          dummyPath,
          '%PDF-1.4 NextStep Placements Sample Resume Document for Testing'
        );

        uploadedFile = {
          filename: dummyFileName,
          originalname: 'sample_resume.pdf',
          size: 64,
          mimetype: 'application/pdf',
        } as Express.Multer.File;
      } else {
        res.status(400).json({
          success: false,
          error: { code: 'FILE_MISSING', message: 'No file uploaded in form request' },
        });
        return;
      }
    }

    const publicUrl = `http://localhost:${env.PORT}/uploads/resumes/${uploadedFile.filename}`;

    res.json({
      success: true,
      message: 'File uploaded successfully',
      data: {
        fileName: uploadedFile.filename,
        originalName: uploadedFile.originalname,
        size: uploadedFile.size,
        mimeType: uploadedFile.mimetype,
        publicUrl,
      },
    });
  } catch (err) {
    next(err);
  }
};
