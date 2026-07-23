import app from '../src/app.js';
import { connectDB } from '../src/config/db.js';

export default async function handler(req, res) {
  try {
    await connectDB();
    return app(req, res);
  } catch (err) {
    console.error('Serverless Execution Error:', err);
    res.status(500).json({
      success: false,
      error: { code: 'SERVERLESS_ERROR', message: err?.message || 'Serverless Execution Failed' },
    });
  }
}
