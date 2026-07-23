import app from '../dist/app.js';
import { connectDB } from '../dist/config/db.js';

export default async function handler(req, res) {
  try {
    await connectDB();
    
    // Normalize Vercel serverless rewrite URL so Express routes match correctly
    if (req.url.startsWith('/api/index.js')) {
      req.url = req.url.replace('/api/index.js', '') || '/';
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
