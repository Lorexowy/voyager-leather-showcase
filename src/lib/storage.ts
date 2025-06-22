import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject,
  uploadBytesResumable,
  UploadTaskSnapshot 
} from 'firebase/storage';
import { storage } from './firebase';

// Typy dla upload'u
export interface UploadProgress {
  progress: number;
  isComplete: boolean;
  url?: string;
  error?: string;
}

export interface ImageUploadOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  format?: 'jpeg' | 'webp';
}

// Funkcja do kompresji/resize obrazu
export const compressImage = async (
  file: File, 
  options: ImageUploadOptions = {}
): Promise<File> => {
  const {
    maxWidth = 1200,
    maxHeight = 1200,
    quality = 0.8,
    format = 'jpeg'
  } = options;

  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const img = new Image();

    img.onload = () => {
      // Oblicz nowe wymiary zachowując proporcje
      let { width, height } = img;
      
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width *= ratio;
        height *= ratio;
      }

      canvas.width = width;
      canvas.height = height;

      // Rysuj obraz na canvas
      ctx.drawImage(img, 0, 0, width, height);

      // Konwertuj do blob
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: `image/${format}`,
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          } else {
            resolve(file); // Fallback do oryginalnego pliku
          }
        },
        `image/${format}`,
        quality
      );
    };

    img.src = URL.createObjectURL(file);
  });
};

// Funkcja do walidacji pliku obrazu
export const validateImageFile = (file: File): { isValid: boolean; error?: string } => {
  // Sprawdź typ pliku
  if (!file.type.startsWith('image/')) {
    return { isValid: false, error: 'Plik musi być obrazem' };
  }

  // Sprawdź dozwolone formaty
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    return { isValid: false, error: 'Dozwolone formaty: JPG, PNG, WEBP' };
  }

  // Sprawdź rozmiar pliku (max 10MB)
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    return { isValid: false, error: 'Plik nie może być większy niż 10MB' };
  }

  return { isValid: true };
};

// Funkcja do generowania unikalnej nazwy pliku
export const generateFileName = (originalName: string, productId?: string): string => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8);
  const extension = originalName.split('.').pop()?.toLowerCase() || 'jpg';
  
  if (productId) {
    return `products/${productId}/${timestamp}_${randomString}.${extension}`;
  }
  
  return `products/temp/${timestamp}_${randomString}.${extension}`;
};

// Główna funkcja upload'u obrazu
export const uploadImage = async (
  file: File,
  onProgress?: (progress: UploadProgress) => void,
  options: ImageUploadOptions = {},
  productId?: string
): Promise<string> => {
  try {
    // Walidacja pliku
    const validation = validateImageFile(file);
    if (!validation.isValid) {
      throw new Error(validation.error);
    }

    // Kompresja obrazu
    onProgress?.({ progress: 5, isComplete: false });
    const compressedFile = await compressImage(file, options);
    
    // Generuj ścieżkę pliku
    const fileName = generateFileName(file.name, productId);
    const storageRef = ref(storage, fileName);

    onProgress?.({ progress: 10, isComplete: false });

    // Upload z progress tracking
    return new Promise((resolve, reject) => {
      const uploadTask = uploadBytesResumable(storageRef, compressedFile);

      uploadTask.on(
        'state_changed',
        (snapshot: UploadTaskSnapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 90 + 10;
          onProgress?.({ progress, isComplete: false });
        },
        (error) => {
          console.error('Upload error:', error);
          onProgress?.({ progress: 0, isComplete: false, error: error.message });
          reject(new Error(`Błąd podczas upload'u: ${error.message}`));
        },
        async () => {
          try {
            // Upload zakończony - pobierz URL
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            onProgress?.({ progress: 100, isComplete: true, url: downloadURL });
            resolve(downloadURL);
          } catch (error: any) {
            reject(new Error(`Błąd podczas pobierania URL: ${error.message}`));
          }
        }
      );
    });

  } catch (error: any) {
    onProgress?.({ progress: 0, isComplete: false, error: error.message });
    throw error;
  }
};

// Funkcja do upload'u wielu obrazów
export const uploadMultipleImages = async (
  files: File[],
  onProgress?: (fileIndex: number, progress: UploadProgress) => void,
  onComplete?: (results: { url?: string; error?: string; fileName: string }[]) => void,
  options: ImageUploadOptions = {},
  productId?: string
): Promise<string[]> => {
  const results: { url?: string; error?: string; fileName: string }[] = [];
  const uploadedUrls: string[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    
    try {
      const url = await uploadImage(
        file,
        (progress) => onProgress?.(i, progress),
        options,
        productId
      );
      
      results.push({ url, fileName: file.name });
      uploadedUrls.push(url);
    } catch (error: any) {
      console.error(`Error uploading ${file.name}:`, error);
      results.push({ error: error.message, fileName: file.name });
    }
  }

  onComplete?.(results);
  return uploadedUrls;
};

// Funkcja do usuwania obrazu
export const deleteImage = async (imageUrl: string): Promise<void> => {
  try {
    // Wyciągnij ścieżkę z URL
    const url = new URL(imageUrl);
    const pathMatch = url.pathname.match(/\/o\/(.+)\?/);
    
    if (!pathMatch) {
      throw new Error('Nieprawidłowy URL obrazu');
    }

    const imagePath = decodeURIComponent(pathMatch[1]);
    const imageRef = ref(storage, imagePath);
    
    await deleteObject(imageRef);
    console.log('Image deleted successfully:', imagePath);
  } catch (error: any) {
    console.error('Error deleting image:', error);
    throw new Error(`Nie udało się usunąć obrazu: ${error.message}`);
  }
};

// Funkcja do usuwania wielu obrazów
export const deleteMultipleImages = async (imageUrls: string[]): Promise<void> => {
  const deletePromises = imageUrls.map(url => 
    deleteImage(url).catch(error => 
      console.error(`Failed to delete image ${url}:`, error)
    )
  );
  
  await Promise.all(deletePromises);
};

// Funkcja pomocnicza do utworzenia URL podglądu pliku
export const createPreviewUrl = (file: File): string => {
  return URL.createObjectURL(file);
};

// Funkcja do zwolnienia URL podglądu
export const revokePreviewUrl = (url: string): void => {
  URL.revokeObjectURL(url);
};

// Funkcja do przeniesienia obrazów z temp do produktu
export const moveImagesToProduct = async (
  tempUrls: string[],
  productId: string
): Promise<string[]> => {
  const newUrls: string[] = [];

  for (const tempUrl of tempUrls) {
    try {
      // Pobierz blob z temp URL
      const response = await fetch(tempUrl);
      const blob = await response.blob();
      
      // Stwórz nowy plik
      const file = new File([blob], 'image.jpg', { type: blob.type });
      
      // Upload do nowej lokalizacji
      const newUrl = await uploadImage(file, undefined, {}, productId);
      newUrls.push(newUrl);
      
      // Usuń stary plik (opcjonalne - temp pliki mogą być czyszczone automatycznie)
      try {
        await deleteImage(tempUrl);
      } catch (error) {
        console.warn('Could not delete temp image:', error);
      }
    } catch (error) {
      console.error('Error moving image:', error);
      // W przypadku błędu, zachowaj oryginalny URL
      newUrls.push(tempUrl);
    }
  }

  return newUrls;
};