import { useState, useCallback } from 'react';
import { 
  uploadImage, 
  uploadMultipleImages, 
  deleteImage,
  createPreviewUrl,
  revokePreviewUrl,
  UploadProgress 
} from '@/lib/storage';

export interface UploadedImageState {
  file: File;
  previewUrl: string;
  uploadedUrl?: string;
  isUploading: boolean;
  progress: number;
  error?: string;
}

export interface UseImageUploadReturn {
  images: UploadedImageState[];
  isUploading: boolean;
  uploadImages: (files: File[]) => Promise<void>;
  removeImage: (index: number) => Promise<void>;
  clearAllImages: () => void;
  getValidImageUrls: () => string[];
  getTotalProgress: () => number;
}

export const useImageUpload = (productId?: string): UseImageUploadReturn => {
  const [images, setImages] = useState<UploadedImageState[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const uploadImages = useCallback(async (files: File[]) => {
    if (files.length === 0) return;

    // Przygotuj nowe obrazy z preview
    const newImages: UploadedImageState[] = files.map(file => ({
      file,
      previewUrl: createPreviewUrl(file),
      isUploading: true,
      progress: 0
    }));

    setImages(prev => [...prev, ...newImages]);
    setIsUploading(true);

    try {
      await uploadMultipleImages(
        files,
        (fileIndex, progress) => {
          // Update progress dla konkretnego pliku
          setImages(prev => {
            const updated = [...prev];
            const targetIndex = prev.length - files.length + fileIndex;
            if (updated[targetIndex]) {
              updated[targetIndex] = {
                ...updated[targetIndex],
                progress: progress.progress,
                isUploading: !progress.isComplete,
                uploadedUrl: progress.url,
                error: progress.error
              };
            }
            return updated;
          });
        },
        (results) => {
          console.log('Upload completed:', results);
          setIsUploading(false);
        },
        { maxWidth: 1200, maxHeight: 1200, quality: 0.8 },
        productId
      );
    } catch (error) {
      console.error('Upload error:', error);
      setIsUploading(false);
    }
  }, [productId]);

  const removeImage = useCallback(async (index: number) => {
    const imageToRemove = images[index];
    if (!imageToRemove) return;

    // Usuń z Firebase Storage jeśli został upload'owany
    if (imageToRemove.uploadedUrl) {
      try {
        await deleteImage(imageToRemove.uploadedUrl);
      } catch (error) {
        console.error('Error deleting image from storage:', error);
      }
    }

    // Zwolnij preview URL
    if (imageToRemove.previewUrl) {
      revokePreviewUrl(imageToRemove.previewUrl);
    }

    // Usuń z listy
    setImages(prev => prev.filter((_, i) => i !== index));
  }, [images]);

  const clearAllImages = useCallback(() => {
    // Zwolnij wszystkie preview URLs
    images.forEach(img => {
      if (img.previewUrl) {
        revokePreviewUrl(img.previewUrl);
      }
    });

    setImages([]);
    setIsUploading(false);
  }, [images]);

  const getValidImageUrls = useCallback(() => {
    return images
      .filter(img => img.uploadedUrl && !img.error)
      .map(img => img.uploadedUrl!);
  }, [images]);

  const getTotalProgress = useCallback(() => {
    if (images.length === 0) return 0;
    
    const totalProgress = images.reduce((sum, img) => sum + img.progress, 0);
    return Math.round(totalProgress / images.length);
  }, [images]);

  return {
    images,
    isUploading,
    uploadImages,
    removeImage,
    clearAllImages,
    getValidImageUrls,
    getTotalProgress
  };
};