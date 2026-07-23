import mongoose from 'mongoose';
import dns from 'dns';
import { env } from './env.js';

// Fix Windows Node.js DNS SRV resolution for MongoDB Atlas
try {
  if (dns.setDefaultResultOrder) dns.setDefaultResultOrder('ipv4first');
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch {
  // Ignore if setServers fails
}

export const connectDB = async (): Promise<void> => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  try {
    const conn = await mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`⚠️ MongoDB Connection Error: ${(error as Error).message}`);
    console.log('ℹ️ Running in Dev/Offline mode without active DB connection.');
  }
};

export const isDBConnected = (): boolean => {
  return mongoose.connection.readyState === 1;
};
