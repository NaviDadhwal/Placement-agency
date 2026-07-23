import app from '../dist/app.js';
import { connectDB } from '../dist/config/db.js';

export default async function handler(req, res) {
  try {
    await connectDB();
    return app(req, res);
  } catch (err) {
    console.error('Vercel Serverless Function Error:', err);
    return res.status(500).json({
      success: false,
      error: { code: 'SERVERLESS_ERROR', message: err?.message || 'Serverless Error' },
    });
  }
}
