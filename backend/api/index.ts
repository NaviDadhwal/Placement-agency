import app from '../src/app.js';
import { connectDB } from '../src/config/db.js';

export default async function handler(req: any, res: any) {
  try {
    await connectDB();
    return app(req, res);
  } catch (err: any) {
    console.error('Serverless Error:', err);
    res.status(500).json({
      success: false,
      error: { code: 'SERVERLESS_ERROR', message: err?.message || 'Serverless Execution Failed' },
    });
  }
}
