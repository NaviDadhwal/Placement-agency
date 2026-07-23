import app from '../src/app.js';
import { connectDB } from '../src/config/db.js';

export default async function handler(req: any, res: any) {
  try {
    await connectDB();

    // Reconstruct exact requested URL path from Vercel dynamic catch-all slug array
    if (req.query?.slug) {
      const slugArray = Array.isArray(req.query.slug) ? req.query.slug : [req.query.slug];
      const queryString = req.url?.includes('?') ? req.url.substring(req.url.indexOf('?')) : '';
      req.url = `/api/${slugArray.join('/')}${queryString}`;
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
