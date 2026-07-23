import app from '../src/app.js';
import { connectDB } from '../src/config/db.js';

export default async function handler(req: any, res: any) {
  try {
    await connectDB();

    // Vercel serverless functions inside api/ strip the /api prefix from req.url.
    // Prepend /api if missing so Express route handlers (/api/v1/...) match perfectly.
    if (req.url && !req.url.startsWith('/api')) {
      req.url = `/api${req.url}`;
    }

    return app(req, res);
  } catch (err: any) {
    console.error('Vercel Serverless Execution Error:', err);
    res.status(500).json({
      success: false,
      error: { code: 'SERVERLESS_ERROR', message: err?.message || 'Serverless Execution Failed' },
    });
  }
}
