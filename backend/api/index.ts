import app from '../src/app.js';
import { connectDB } from '../src/config/db.js';

export default async function handler(req: any, res: any) {
  try {
    await connectDB();
    return new Promise((resolve, reject) => {
      app(req, res, (err: any) => {
        if (err) return reject(err);
        resolve(true);
      });
    });
  } catch (err: any) {
    console.error('Vercel Serverless Function Error:', err);
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        error: { code: 'SERVERLESS_ERROR', message: err?.message || 'Serverless Error' },
      });
    }
  }
}
