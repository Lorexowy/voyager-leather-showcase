import { 
  getStorage, 
  ref, 
  uploadBytesResumable, 
  getDownloadURL, 
  deleteObject,
  UploadTaskSnapshot 
} from 'firebase/storage';
import { storage } from './firebase';

// Typy dla progress tracking
export interface UploadProgress {
  progress: number;
  isComplete: boolean;
  url?: string;
  error?: string;
}

// Kompresja obrazów
export function compressImage(
  file: File, 
  options: { maxWidth?: number; maxHeight?: number; quality?: number } = {}
): Promise<File> {
  const { maxWidth = 1200, maxHeight = 1200, quality = 0.8 } = options;

  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const img = new Image();

    img.onload = () => {
      // Oblicz nowe wymiary zachowując proporcje
      let { width, height } = img;
      
      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
      }

      // Ustaw rozmiar canvas
      canvas.width = width;
      canvas.height = height;

      // Narysuj i skompresuj obraz
      ctx.drawImage(img, 0, 0, width, height);
      
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          } else {
            resolve(file); // Fallback do oryginalnego pliku
          }
        },
        file.type,
        quality
      );
    };

    img.src = URL.createObjectURL(file);
  });
}

// Upload pojedynczego obrazu - naprawiona wersja
export function uploadImage(
  file: File,
  onProgress?: (progress: UploadProgress) => void,
  compressionOptions?: { maxWidth?: number; maxHeight?: number; quality?: number },
  folderPath: string = 'products'
): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      // Kompresuj obraz jeśli podano opcje
      const fileToUpload = compressionOptions 
        ? await compressImage(file, compressionOptions)
        : file;

      // Utwórz unikalną nazwę pliku
      const timestamp = Date.now();
      const randomStr = Math.random().toString(36).substring(2, 15);
      const fileName = `${timestamp}_${randomStr}_${fileToUpload.name}`;
      
      // Utwórz referencję
      const storageRef = ref(storage, `${folderPath}/${fileName}`);
      
      // Rozpocznij upload
      const uploadTask = uploadBytesResumable(storageRef, fileToUpload);

      // Timeout - jeśli upload nie zakończy się w 2 minuty
      const timeoutId = setTimeout(() => {
        uploadTask.cancel();
        const timeoutError = new Error('Upload timeout - przekroczono 2 minuty');
        
        if (onProgress) {
          onProgress({
            progress: 0,
            isComplete: true,
            error: timeoutError.message
          });
        }
        
        reject(timeoutError);
      }, 120000); // 2 minuty

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Progress callback
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          
          console.log(`Upload progress: ${progress}%`, {
            bytesTransferred: snapshot.bytesTransferred,
            totalBytes: snapshot.totalBytes,
            state: snapshot.state,
            fileName
          });

          // Wywołaj callback tylko gdy progress się zmienił i nie jest to finalne ukończenie
          if (onProgress && snapshot.state === 'running') {
            onProgress({
              progress,
              isComplete: false
            });
          }
        },
        (error) => {
          // Error callback
          clearTimeout(timeoutId);
          console.error('Upload error:', error, { fileName });
          
          if (onProgress) {
            onProgress({
              progress: 0,
              isComplete: true,
              error: error.message
            });
          }
          
          reject(error);
        },
        async () => {
          // Success callback
          clearTimeout(timeoutId);
          
          try {
            console.log('Upload completed successfully, getting download URL...', { fileName });
            
            // Bezpośrednio pobierz URL
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            
            console.log('Download URL obtained successfully:', downloadURL);

            // Oznacz jako ukończone z URL
            if (onProgress) {
              onProgress({
                progress: 100,
                isComplete: true,
                url: downloadURL
              });
            }

            resolve(downloadURL);
          } catch (urlError) {
            console.error('Error getting download URL:', urlError, { fileName });
            
            if (onProgress) {
              onProgress({
                progress: 100,
                isComplete: true,
                error: 'Nie udało się pobrać URL zdjęcia'
              });
            }
            
            reject(urlError);
          }
        }
      );
    } catch (error) {
      console.error('Upload preparation error:', error);
      
      if (onProgress) {
        onProgress({
          progress: 0,
          isComplete: true,
          error: error instanceof Error ? error.message : 'Błąd przygotowania uploadu'
        });
      }
      
      reject(error);
    }
  });
}

// Upload wielu obrazów - naprawiona wersja
// Upload wielu obrazów - ostateczna naprawka
export async function uploadMultipleImages(
  files: File[],
  onProgress: (fileIndex: number, progress: UploadProgress) => void,
  onComplete: (results: Array<{ url?: string; error?: string }>) => void,
  compressionOptions?: { maxWidth?: number; maxHeight?: number; quality?: number },
  folderPath: string = 'products'
): Promise<Array<{ url?: string; error?: string }>> {
  console.log(`Starting upload of ${files.length} files...`);
  
  const results: Array<{ url?: string; error?: string }> = new Array(files.length);
  let completedUploads = 0;
  
  const promises = files.map((file, index) => {
    return new Promise<void>((resolve) => {
      uploadImage(
        file,
        (progress) => {
          // Wywołaj callback progress
          onProgress(index, progress);
          
          // Sprawdź czy upload się zakończył
          if (progress.isComplete) {
            completedUploads++;
            
            if (progress.url) {
              results[index] = { url: progress.url };
            } else if (progress.error) {
              results[index] = { error: progress.error };
            }
            
            console.log(`File ${index} completed. Total completed: ${completedUploads}/${files.length}`);
            
            // Sprawdź czy to ostatni plik
            if (completedUploads === files.length) {
              console.log('All uploads completed! Calling onComplete...');
              // Małe opóźnienie żeby interfejs się zaktualizował
              setTimeout(() => {
                onComplete(results);
              }, 100);
            }
            
            resolve();
          }
        },
        compressionOptions,
        folderPath
      ).catch((error) => {
        console.error(`Upload promise rejected for file ${index}:`, error);
        completedUploads++;
        results[index] = { error: error.message };
        
        if (completedUploads === files.length) {
          setTimeout(() => {
            onComplete(results);
          }, 100);
        }
        
        resolve();
      });
    });
  });

  await Promise.all(promises);
  return results;
}

// Usuwanie obrazów
export async function deleteImage(url: string): Promise<void> {
  try {
    const imageRef = ref(storage, url);
    await deleteObject(imageRef);
    console.log('Image deleted successfully:', url);
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
}

export async function deleteMultipleImages(urls: string[]): Promise<void> {
  const deletePromises = urls.map(url => deleteImage(url));
  await Promise.all(deletePromises);
}

// Utility functions
export function createPreviewUrl(file: File): string {
  return URL.createObjectURL(file);
}

export function revokePreviewUrl(url: string): void {
  URL.revokeObjectURL(url);
}

// Walidacja plików
export function validateImageFile(file: File): { isValid: boolean; error?: string } {
  // Sprawdź typ pliku
  if (!file.type.startsWith('image/')) {
    return { isValid: false, error: 'Plik musi być obrazem' };
  }

  // Sprawdź rozmiar (max 10MB)
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    return { isValid: false, error: 'Plik jest za duży (max 10MB)' };
  }

  // Sprawdź obsługiwane formaty
  const supportedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
  if (!supportedTypes.includes(file.type)) {
    return { isValid: false, error: 'Nieobsługiwany format pliku' };
  }

  return { isValid: true };
}