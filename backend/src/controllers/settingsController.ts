import { Request, Response } from 'express';
import { sendSuccess, sendError } from '../utils/response';
import { WebsiteSettings } from '../models/WebsiteSettings';

export const getSettings = async (_req: Request, res: Response) => {
  try {
    let settings = await WebsiteSettings.findOne();
    if (!settings) {
      settings = await WebsiteSettings.create({
        siteTitle: 'AAA Management Services | Professional Security & Manpower Management',
        metaDescription: 'Agra-based premier physical security management, armed gunmen, security supervisors, and industrial facility protection services.',
        enableQuoteRequests: true,
        maintenanceMode: false,
        supportPhone: '9045393714',
        supportEmail: 'contact@aaamanagementservices.com',
      });
    }
    return sendSuccess(res, 'Website settings retrieved', settings);
  } catch (error: any) {
    return sendError(res, error.message, 'DatabaseError', 500);
  }
};

export const updateSettings = async (req: Request, res: Response) => {
  try {
    let settings = await WebsiteSettings.findOne();
    if (settings) {
      Object.assign(settings, req.body);
      await settings.save();
    } else {
      settings = await WebsiteSettings.create(req.body);
    }
    return sendSuccess(res, 'Website settings updated successfully', settings);
  } catch (error: any) {
    return sendError(res, error.message, 'UpdateError', 500);
  }
};
