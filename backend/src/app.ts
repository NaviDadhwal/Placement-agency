import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { env } from './config/env.js';
import routes from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// 1. Helmet Security Guard (Allow cross-origin resource sharing for uploaded resume PDFs)
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

// 2. CORS Configuration
app.use(
  cors({
    origin: (_origin, callback) => {
      // Allow all origins (local dev & Vercel production domains)
      callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// 3. Cookie Parser
app.use(cookieParser());

// 4. Express 5 Safe NoSQL Injection Sanitizer
const sanitizeObject = (obj: any): void => {
  if (!obj || typeof obj !== 'object') return;
  for (const key of Object.keys(obj)) {
    if (key.startsWith('$') || key.includes('.')) {
      delete obj[key];
    } else if (typeof obj[key] === 'object') {
      sanitizeObject(obj[key]);
    }
  }
};

app.use((req: Request, _res: Response, next: NextFunction) => {
  if (req.body) sanitizeObject(req.body);
  if (req.params) sanitizeObject(req.params);
  next();
});

// 5. Serve Uploaded Files Statically
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// 6. Payload Size Guard
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// 7. Global Rate Limiter (100 requests per 15 mins per IP)
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: {
      code: 'TOO_MANY_REQUESTS',
      message: 'Too many requests from this IP, please try again after 15 minutes.',
    },
  },
});
app.use(globalLimiter);

// 8. Strict Rate Limiter for Lead Submissions & Auth
const strictLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: {
      code: 'TOO_MANY_SUBMISSIONS',
      message: 'Submission limit reached. Please try again after 15 minutes or call our hotline.',
    },
  },
});
app.use('/api/v1/leads', strictLimiter);
app.use('/api/v1/auth/login', strictLimiter);

// Health Check
app.get('/api/v1/health', (_req: Request, res: Response) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'Next Step Placements API',
  });
});

// API Routes
app.use('/api/v1', routes);

// 404 Handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: { code: 'NOT_FOUND', message: 'Requested API endpoint does not exist' },
  });
});

// Global Error Handler
app.use(errorHandler);

export default app;
