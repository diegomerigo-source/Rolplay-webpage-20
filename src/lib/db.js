import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

function isPlaceholderUri(uri) {
  if (!uri) return true;
  return uri.includes('<username>') || uri.includes('<password>') || uri.includes('<cluster>');
}

const cached = global.mongoose ?? { conn: null, promise: null };
if (!global.mongoose) global.mongoose = cached;

async function dbConnect() {
  if (isPlaceholderUri(MONGODB_URI)) {
    console.warn('MONGODB_URI is not configured. Database operations will not work.');
    return null;
  }
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false, maxPoolSize: 10 });
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
  return cached.conn;
}

export default dbConnect;
