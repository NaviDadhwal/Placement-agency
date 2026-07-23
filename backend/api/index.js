import app from '../dist/app.js';
import { connectDB } from '../dist/config/db.js';

export default async function handler(req, res) {
  try {
    await connectDB();

    // In Vercel rewrites, the original request path is passed in x-forwarded-uri or x-matched-path
    const originalUrl = req.headers['x-forwarded-uri'] || req.headers['x-matched-path'];
    if (originalUrl && originalUrl !== '/api/index.js' && originalUrl !== '/api/index') {
      req.url = originalUrl;
    }

    return app(req, res);
  } catch (err) {
    console.error('Serverless Execution Error:', err);
    res.status(500).json({
      success: false,
      error: { code: 'SERVERLESS_ERROR', message: err?.message || 'Serverless Execution Failed' },
    });
  }
}
