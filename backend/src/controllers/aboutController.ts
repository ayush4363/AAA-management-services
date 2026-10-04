import { Request, Response } from 'express';
import { sendSuccess } from '../utils/response';
import { About } from '../models/About';

export const getAbout = async (_req: Request, res: Response) => {
  try {
    const about = await About.findOne({ isActive: true });
    if (about) return sendSuccess(res, 'About data retrieved', about);
  } catch (_e) {}
  return sendSuccess(res, 'About architectural endpoint ready', null);
};

export const updateAbout = async (req: Request, res: Response) => {
  try {
    const updated = await About.findOneAndUpdate(
      {},
      { $set: req.body },
      { upsert: true, new: true }
    );
    return sendSuccess(res, 'About updated successfully', updated);
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
