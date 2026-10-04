import { Request, Response } from 'express';
import { sendSuccess } from '../utils/response';
import mongoose from 'mongoose';

export const getHealth = (_req: Request, res: Response) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  return sendSuccess(res, 'AAA Management Services API is operational', {
    status: 'healthy',
    version: '1.0.0',
    database: dbStatus,
    timestamp: new Date().toISOString(),
  });
};
