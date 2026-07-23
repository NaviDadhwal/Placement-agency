import mongoose from 'mongoose';
import dns from 'dns';

if (process.platform === 'win32') {
  try {
    if (dns.setDefaultResultOrder) dns.setDefaultResultOrder('ipv4first');
    dns.setServers(['8.8.8.8', '1.1.1.1']);
  } catch {
    // Ignore
  }
}

const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb+srv://Navi:cuA3BhRZqqthxkwA@makemyaim.hgaexfh.mongodb.net/makemyaim?retryWrites=true&w=majority&tlsAllowInvalidCertificates=true';

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      console.log('Connected to MongoDB Atlas via Next.js API Route Handler');
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
