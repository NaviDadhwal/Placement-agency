import { Router, Request, Response, NextFunction } from 'express';
import multer from 'multer';
import path from 'path';
import { getUploadToken, uploadFileLocal } from '../controllers/uploadController.js';
import { uploadService } from '../services/uploadService.js';

const router = Router();

// Configure multer for local storage
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadService.getUploadsDirectory());
  },
  filename: (_req, file, cb) => {
    const timestamp = Date.now();
    const sanitizedFileName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
    cb(null, `${timestamp}_${sanitizedFileName}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB ceiling
  fileFilter: (_req, file, cb) => {
    const allowedMimeTypes = [
      'application/pdf',
      'application/x-pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'application/octet-stream',
    ];
    const ext = path.extname(file.originalname).toLowerCase();
    const allowedExts = ['.pdf', '.doc', '.docx'];

    if (allowedMimeTypes.includes(file.mimetype) || allowedExts.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF and DOC/DOCX documents are allowed.'));
    }
  },
});

// Middleware supporting any field name ('resume', 'file', 'cv', 'document', etc.)
const flexibleUploadMiddleware = (req: Request, res: Response, next: NextFunction) => {
  upload.any()(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        res.status(400).json({
          success: false,
          error: { code: 'UPLOAD_LIMIT_ERROR', message: err.message },
        });
        return;
      }
      res.status(400).json({
        success: false,
        error: { code: 'INVALID_FILE_TYPE', message: err.message || 'Invalid file uploaded' },
      });
      return;
    }
    next();
  });
};

router.post('/token', getUploadToken);
router.post('/file', flexibleUploadMiddleware, uploadFileLocal);

export default router;
