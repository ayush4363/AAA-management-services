import { Response } from 'express';
import { ApiResponse } from '../types/api';

export const sendSuccess = <T>(
  res: Response,
  message: string,
  data?: T,
  statusCode: number = 200
): Response => {
  const payload: ApiResponse<T> = {
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
  };
  return res.status(statusCode).json(payload);
};

export const sendError = (
  res: Response,
  message: string,
  error?: string,
  statusCode: number = 500
): Response => {
  const payload: ApiResponse = {
    success: false,
    message,
    error: error || message,
    timestamp: new Date().toISOString(),
  };
  return res.status(statusCode).json(payload);
};
