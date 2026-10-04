import { Request, Response } from 'express';
import { sendSuccess, sendError } from '../utils/response';
import { GalleryImage } from '../models/GalleryImage';

export const getGalleryImages = async (req: Request, res: Response) => {
  try {
    const filter: any = { isActive: true };
    if (req.query.category && req.query.category !== 'all') {
      filter.category = req.query.category;
    }
    const images = await GalleryImage.find(filter).sort({ order: 1, createdAt: -1 });
    return sendSuccess(res, 'Gallery images retrieved', images);
  } catch (error: any) {
    return sendError(res, error.message, 'DatabaseError', 500);
  }
};

export const getAllGalleryAdmin = async (_req: Request, res: Response) => {
  try {
    const images = await GalleryImage.find().sort({ order: 1, createdAt: -1 });
    return sendSuccess(res, 'All gallery images retrieved', images);
  } catch (error: any) {
    return sendError(res, error.message, 'DatabaseError', 500);
  }
};

export const addGalleryImage = async (req: Request, res: Response) => {
  try {
    const { title, category, imageUrl, altText, order } = req.body;
    if (!title || !imageUrl) {
      return sendError(res, 'Title and image URL are required', 'ValidationError', 400);
    }

    const image = await GalleryImage.create({
      title: title.trim(),
      category: category || 'guarding',
      imageUrl: imageUrl.trim(),
      altText: altText ? altText.trim() : title.trim(),
      order: Number(order) || 0,
      isActive: true,
    });

    return sendSuccess(res, 'Gallery image added successfully', image, 201);
  } catch (error: any) {
    return sendError(res, error.message, 'CreateError', 500);
  }
};

export const updateGalleryImage = async (req: Request, res: Response) => {
  try {
    const image = await GalleryImage.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!image) {
      return sendError(res, 'Gallery image not found', 'NotFound', 404);
    }
    return sendSuccess(res, 'Gallery image updated', image);
  } catch (error: any) {
    return sendError(res, error.message, 'UpdateError', 500);
  }
};

export const deleteGalleryImage = async (req: Request, res: Response) => {
  try {
    const image = await GalleryImage.findByIdAndDelete(req.params.id);
    if (!image) {
      return sendError(res, 'Gallery image not found', 'NotFound', 404);
    }
    return sendSuccess(res, 'Gallery image deleted', null);
  } catch (error: any) {
    return sendError(res, error.message, 'DeleteError', 500);
  }
};
