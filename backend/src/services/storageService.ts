import { storageConfig } from '../config/cloudinary';
import { logger } from '../utils/logger';

export interface UploadResult {
  url: string;
  publicId: string;
}

export class StorageService {
  /**
   * Uploads an image to cloud storage.
   * Architecture prepared for Cloudinary.
   */
  public static async uploadImage(
    _fileBuffer: Buffer,
    _folder: string = 'aaa-management'
  ): Promise<UploadResult> {
    if (!storageConfig.isConfigured) {
      logger.warn('[StorageService] Cloudinary credentials not configured. Returning local placeholder reference.');
      return {
        url: '/placeholder-security-asset.jpg',
        publicId: 'placeholder_local_id',
      };
    }

    // Cloudinary SDK integration hook for future phase
    throw new Error('Cloud storage upload will be implemented in subsequent phase.');
  }

  public static async deleteImage(_publicId: string): Promise<boolean> {
    if (!storageConfig.isConfigured) {
      return true;
    }
    return true;
  }
}
