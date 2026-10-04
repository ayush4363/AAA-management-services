import { env } from './env';

export interface StorageConfig {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
  isConfigured: boolean;
}

export const storageConfig: StorageConfig = {
  cloudName: env.CLOUDINARY_CLOUD_NAME,
  apiKey: env.CLOUDINARY_API_KEY,
  apiSecret: env.CLOUDINARY_API_SECRET,
  isConfigured: Boolean(env.CLOUDINARY_CLOUD_NAME && env.CLOUDINARY_API_KEY && env.CLOUDINARY_API_SECRET),
};
