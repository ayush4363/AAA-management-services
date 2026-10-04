import mongoose from 'mongoose';
import { env } from './env';

export const connectDatabase = async (): Promise<boolean> => {
  try {
    const connection = await mongoose.connect(env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`[Database] MongoDB connected successfully: ${connection.connection.host}`);
    return true;
  } catch (error: any) {
    console.warn(`[Database] MongoDB connection warning: ${error.message}`);
    console.warn('[Database] Application running in decoupled mode. Ensure MongoDB is running to persist data.');
    return false;
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('[Database] MongoDB connection disconnected.');
});

mongoose.connection.on('error', (err) => {
  console.error('[Database] MongoDB connection error:', err);
});
