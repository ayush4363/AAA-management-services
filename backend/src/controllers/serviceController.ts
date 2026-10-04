import { Request, Response } from 'express';
import { sendSuccess, sendError } from '../utils/response';
import { Service } from '../models/Service';

export const getServices = async (_req: Request, res: Response) => {
  try {
    const services = await Service.find({ isActive: true }).sort({ order: 1 });
    return sendSuccess(res, 'Services retrieved successfully', services);
  } catch (error: any) {
    return sendError(res, error.message, 'DatabaseError', 500);
  }
};

export const getAllServicesAdmin = async (_req: Request, res: Response) => {
  try {
    const services = await Service.find().sort({ order: 1 });
    return sendSuccess(res, 'All services retrieved for admin', services);
  } catch (error: any) {
    return sendError(res, error.message, 'DatabaseError', 500);
  }
};

export const getServiceBySlug = async (req: Request, res: Response) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug, isActive: true });
    if (!service) {
      return sendError(res, 'Security service not found', 'NotFound', 404);
    }
    return sendSuccess(res, 'Service details retrieved', service);
  } catch (error: any) {
    return sendError(res, error.message, 'DatabaseError', 500);
  }
};

export const createService = async (req: Request, res: Response) => {
  try {
    const { title, slug, shortDescription, fullDescription, keyFeatures, deploymentTypes, order, isFeatured } = req.body;
    
    if (!title || !shortDescription || !fullDescription) {
      return sendError(res, 'Title and descriptions are required', 'ValidationError', 400);
    }

    const serviceSlug = (slug || title).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const existing = await Service.findOne({ slug: serviceSlug });
    if (existing) {
      return sendError(res, 'Service with this slug already exists', 'ConflictError', 409);
    }

    const service = await Service.create({
      ...req.body,
      slug: serviceSlug,
      keyFeatures: Array.isArray(keyFeatures) ? keyFeatures : [],
      deploymentTypes: Array.isArray(deploymentTypes) ? deploymentTypes : [],
      order: order || 0,
      isFeatured: Boolean(isFeatured),
      isActive: true,
    });

    return sendSuccess(res, 'Security service created', service, 201);
  } catch (error: any) {
    return sendError(res, error.message, 'CreateError', 500);
  }
};

export const updateService = async (req: Request, res: Response) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!service) {
      return sendError(res, 'Service not found', 'NotFound', 404);
    }
    return sendSuccess(res, 'Service updated successfully', service);
  } catch (error: any) {
    return sendError(res, error.message, 'UpdateError', 500);
  }
};

export const deleteService = async (req: Request, res: Response) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return sendError(res, 'Service not found', 'NotFound', 404);
    }
    return sendSuccess(res, 'Service deleted successfully', null);
  } catch (error: any) {
    return sendError(res, error.message, 'DeleteError', 500);
  }
};
