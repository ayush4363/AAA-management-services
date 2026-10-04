import { Request, Response } from 'express';
import { sendSuccess } from '../utils/response';
import { ProcessStep } from '../models/ProcessStep';

export const getProcessSteps = async (_req: Request, res: Response) => {
  try {
    const steps = await ProcessStep.find({ isActive: true }).sort({ stepNumber: 1 });
    return sendSuccess(res, 'Process steps retrieved', steps);
  } catch (_e) {
    return sendSuccess(res, 'Process steps architectural endpoint ready', []);
  }
};

export const updateProcessSteps = async (req: Request, res: Response) => {
  try {
    const { steps } = req.body;
    if (Array.isArray(steps)) {
      await ProcessStep.deleteMany({});
      const created = await ProcessStep.insertMany(steps);
      return sendSuccess(res, 'Process steps updated successfully', created);
    }
    return sendSuccess(res, 'Steps array required', []);
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
