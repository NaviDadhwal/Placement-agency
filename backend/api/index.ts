import app from '../src/app.js';
import { connectDB } from '../src/config/db.js';

// Connect DB on serverless cold start
connectDB().catch((err) => console.error('DB Cold Start Error:', err));

export default function handler(req: any, res: any) {
  return app(req, res);
}
