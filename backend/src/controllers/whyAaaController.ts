import { Request, Response } from 'express';
import { sendSuccess } from '../utils/response';
import { WhyChooseUs } from '../models/WhyChooseUs';

export const getWhyAaa = async (_req: Request, res: Response) => {
  try {
    const items = await WhyChooseUs.find({ isActive: true }).sort({ order: 1 });
    return sendSuccess(res, 'Why AAA items retrieved', items);
  } catch (_e) {
    return sendSuccess(res, 'Why AAA architectural endpoint ready', []);
  }
};

export const updateWhyAaa = async (req: Request, res: Response) => {
  try {
    const { items } = req.body;
    if (Array.isArray(items)) {
      await WhyChooseUs.deleteMany({});
      const created = await WhyChooseUs.insertMany(items);
      return sendSuccess(res, 'Why AAA items updated successfully', created);
    }
    return sendSuccess(res, 'Items array required', []);
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
