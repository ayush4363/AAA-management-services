import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/response';
import { logger } from '../utils/logger';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  logger.error(`Unhandled error at ${req.method} ${req.url}:`, err.stack || err.message);

  const statusCode = err.statusCode || (res.statusCode === 200 ? 500 : res.statusCode);
  const message = err.message || 'Internal Server Error';
  const errorDetails = process.env.NODE_ENV === 'production' ? undefined : err.stack;

  return sendError(res, message, errorDetails, statusCode);
};
