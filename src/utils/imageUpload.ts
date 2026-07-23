// utils/imageUpload.ts
import { ImageUploadResponse } from '@/types/food';

const IMAGEBB_API_KEY = process.env.NEXT_PUBLIC_IMAGEBB_API_KEY || '';
const IMAGEBB_API_URL = 'https://api.imgbb.com/1/upload';

/**
 * Upload a single image to ImageBB
 */
export const uploadImageToImageBB = async (file: File): Promise<ImageUploadResponse> => {
  try {
    // Validate file
    if (!file) {
      return { success: false, error: 'No file provided' };
    }

    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return { 
        success: false, 
        error: 'File size must be less than 5MB' 
      };
    }

    // Check file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return { 
        success: false, 
        error: 'Only JPEG, PNG, WEBP and GIF images are allowed' 
      };
    }

    // Convert file to base64
    const base64Image = await fileToBase64(file);

    // Prepare form data
    const formData = new FormData();
    formData.append('key', IMAGEBB_API_KEY);
    formData.append('image', base64Image);
    formData.append('name', file.name);

    // Upload to ImageBB
    const response = await fetch(IMAGEBB_API_URL, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      return {
        success: false,
        error: data.error?.message || 'Failed to upload image',
      };
    }

    return {
      success: true,
      data: {
        url: data.data.url,
        thumb: data.data.thumb?.url,
        delete_url: data.data.delete_url,
      },
    };
  } catch (error) {
    console.error('Image upload error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

/**
 * Upload multiple images to ImageBB
 */
export const uploadMultipleImagesToImageBB = async (
  files: File[],
  onProgress?: (completed: number, total: number) => void
): Promise<{ success: boolean; urls: string[]; errors: string[] }> => {
  const urls: string[] = [];
  const errors: string[] = [];

  for (let i = 0; i < files.length; i++) {
    try {
      const result = await uploadImageToImageBB(files[i]);
      
      if (result.success && result.data?.url) {
        urls.push(result.data.url);
      } else {
        errors.push(result.error || `Failed to upload image ${i + 1}`);
      }
    } catch (error) {
      errors.push(`Error uploading image ${i + 1}: ${error}`);
    }

    if (onProgress) {
      onProgress(i + 1, files.length);
    }
  }

  return {
    success: urls.length === files.length,
    urls,
    errors,
  };
};

/**
 * Convert File to base64 string
 */
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = (reader.result as string).split(',')[1];
      resolve(base64String);
    };
    reader.onerror = (error) => reject(error);
  });
};