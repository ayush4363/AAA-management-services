import { Request, Response } from 'express';
import { sendError } from '../utils/response';

export const notFoundHandler = (req: Request, res: Response) => {
  return sendError(
    res,
    `Cannot ${req.method} ${req.originalUrl} - Endpoint not found`,
    'RouteNotFound',
    404
  );
};
