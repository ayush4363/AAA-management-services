import { Request, Response } from 'express';
import { sendSuccess } from '../utils/response';
import { Hero } from '../models/Hero';

export const getHero = async (_req: Request, res: Response) => {
  try {
    const hero = await Hero.findOne({ isActive: true });
    if (hero) return sendSuccess(res, 'Hero data retrieved', hero);
  } catch (_e) {}
  return sendSuccess(res, 'Hero architectural endpoint ready', null);
};

export const updateHero = async (req: Request, res: Response) => {
  try {
    const updated = await Hero.findOneAndUpdate(
      {},
      { $set: req.body },
      { upsert: true, new: true }
    );
    return sendSuccess(res, 'Hero updated successfully', updated);
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
