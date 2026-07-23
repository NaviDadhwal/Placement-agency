import app from '../src/app.js';
import { connectDB } from '../src/config/db.js';

// Initiate connection to MongoDB Atlas on cold start
connectDB().catch((err) => console.error('MongoDB Atlas Cold Start Connection Error:', err));

export default app;
