'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm, useFieldArray } from 'react-hook-form';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { isUserAdmin } from '@/lib/auth';
import { addProduct } from '@/lib/products';
import { 
  uploadMultipleImages, 
  deleteMultipleImages, 
  createPreviewUrl, 
  revokePreviewUrl,
  UploadProgress 
} from '@/lib/storage';
import { 
  ArrowLeft, 
  Upload, 
  X, 
  Plus, 
  Save, 
  Eye,
  AlertCircle,
  Loader2,
  Image as ImageIcon,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import toast from 'react-hot-toast';
import { ProductCategory, CATEGORIES, ProductDimensions } from '@/types';

interface ProductForm {
  name: string;
  description: string;
  category: ProductCategory;
  dimensionsEnabled: boolean;
  width: string;
  height: string;
  depth: string;
  length: string;
  dimensionUnit: 'cm' | 'mm';
  availableColors: { value: string }[];
  isActive: boolean;
}

interface UploadedImage {
  file: File;
  previewUrl: string;
  uploadedUrl?: string;
  isUploading: boolean;
  progress: number;
  error?: string;
}

export default function AddProductPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [isUploadingImages, setIsUploadingImages] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isValid }
  } = useForm<ProductForm>({
    defaultValues: {
      name: '',
      description: '',
      category: 'torebki',
      dimensionsEnabled: false,
      width: '',
      height: '',
      depth: '',
      length: '',
      dimensionUnit: 'cm',
      availableColors: [{ value: '' }],
      isActive: true
    },
    mode: 'onChange'
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'availableColors'
  });

  const watchedCategory = watch('category');
  const watchedDimensionsEnabled = watch('dimensionsEnabled');

  // Sprawdź autoryzację
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const adminStatus = await isUserAdmin(currentUser);
        if (adminStatus) {
          setIsAuthorized(true);
        } else {
          toast.error('Brak uprawnień administratora');
          router.push('/admin/login');
        }
      } else {
        router.push('/admin/login');
      }
      setIsCheckingAuth(false);
    });

    return () => unsubscribe();
  }, [router]);

  // Cleanup preview URLs when component unmounts
  useEffect(() => {
    return () => {
      uploadedImages.forEach(img => {
        if (img.previewUrl) {
          revokePreviewUrl(img.previewUrl);
        }
      });
    };
  }, []);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const newImages: UploadedImage[] = Array.from(files).map(file => ({
      file,
      previewUrl: createPreviewUrl(file),
      isUploading: true,
      progress: 0
    }));

    setUploadedImages(prev => [...prev, ...newImages]);
    setIsUploadingImages(true);

    try {
      // Upload wszystkich obrazów
      const filesToUpload = Array.from(files);
      
      await uploadMultipleImages(
        filesToUpload,
        (fileIndex, progress) => {
          // Update progress dla konkretnego pliku
          setUploadedImages(prev => {
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
          // Wszystkie pliki zakończone
          console.log('Upload results:', results);
          setIsUploadingImages(false);
          
          const successCount = results.filter(r => r.url).length;
          const errorCount = results.filter(r => r.error).length;
          
          if (successCount > 0) {
            toast.success(`Dodano ${successCount} zdjęć pomyślnie!`);
          }
          if (errorCount > 0) {
            toast.error(`${errorCount} zdjęć nie udało się dodać`);
          }
        }
      );
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error('Wystąpił błąd podczas upload\'u zdjęć');
      setIsUploadingImages(false);
    }

    // Reset input
    event.target.value = '';
  };

  const removeImage = async (index: number) => {
    const imageToRemove = uploadedImages[index];
    
    // Usuń z Firebase Storage jeśli został upload'owany
    if (imageToRemove.uploadedUrl) {
      try {
        await deleteMultipleImages([imageToRemove.uploadedUrl]);
      } catch (error) {
        console.error('Error deleting image:', error);
      }
    }

    // Zwolnij preview URL
    if (imageToRemove.previewUrl) {
      revokePreviewUrl(imageToRemove.previewUrl);
    }

    // Usuń z listy
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
    
    // Adjust main image index
    if (mainImageIndex >= index && mainImageIndex > 0) {
      setMainImageIndex(mainImageIndex - 1);
    } else if (mainImageIndex === index && uploadedImages.length > 1) {
      setMainImageIndex(0);
    }
  };

  const onSubmit = async (data: ProductForm) => {
    console.log('🔍 Debug - Form data submitted:', data);
    console.log('🔍 Debug - Uploaded images:', uploadedImages);

    // Sprawdź czy wszystkie obrazy zostały upload'owane
    const uploadedUrls = uploadedImages
      .filter(img => img.uploadedUrl && !img.error)
      .map(img => img.uploadedUrl!);

    if (uploadedUrls.length === 0) {
      toast.error('Dodaj co najmniej jedno zdjęcie produktu');
      return;
    }

    // Sprawdź czy są obrazy w trakcie upload'u
    const stillUploading = uploadedImages.some(img => img.isUploading);
    if (stillUploading) {
      toast.error('Poczekaj aż wszystkie zdjęcia zostaną dodane');
      return;
    }

    // Sprawdź czy jest przynajmniej jeden kolor
    const validColors = data.availableColors.map(color => color.value).filter(Boolean);
    if (validColors.length === 0) {
      toast.error('Dodaj przynajmniej jeden kolor produktu');
      return;
    }

    setIsLoading(true);

    try {
      // Przygotuj wymiary
      let dimensions: ProductDimensions | undefined = undefined;
      
      if (data.dimensionsEnabled) {
        const width = data.width ? parseFloat(data.width) : undefined;
        const height = data.height ? parseFloat(data.height) : undefined;
        const depth = data.depth ? parseFloat(data.depth) : undefined;
        const length = data.length ? parseFloat(data.length) : undefined;

        if (width || height || depth || length) {
          dimensions = { unit: data.dimensionUnit };
          if (width !== undefined) dimensions.width = width;
          if (height !== undefined) dimensions.height = height;
          if (depth !== undefined) dimensions.depth = depth;
          if (length !== undefined) dimensions.length = length;
        }
      }

      // Przygotuj dane produktu
      const productData: any = {
        name: data.name,
        description: data.description,
        category: data.category,
        availableColors: validColors,
        images: uploadedUrls,
        mainImage: uploadedUrls[mainImageIndex] || uploadedUrls[0],
        isActive: data.isActive
      };

      if (dimensions) {
        productData.dimensions = dimensions;
      }

      console.log('🔍 Sending product data:', productData);

      const productId = await addProduct(productData);
      
      toast.success('Produkt został dodany pomyślnie!');
      router.push('/admin/dashboard');
    } catch (error: any) {
      console.error('Error adding product:', error);
      toast.error(error.message || 'Wystąpił błąd podczas zapisywania produktu');
    } finally {
      setIsLoading(false);
    }
  };

  const getImageStatus = (image: UploadedImage) => {
    if (image.error) {
      return { icon: AlertTriangle, color: 'text-red-500', text: 'Błąd' };
    }
    if (image.isUploading) {
      return { icon: Loader2, color: 'text-blue-500', text: `${Math.round(image.progress)}%` };
    }
    if (image.uploadedUrl) {
      return { icon: CheckCircle, color: 'text-green-500', text: 'Gotowe' };
    }
    return { icon: Upload, color: 'text-gray-400', text: 'Oczekuje' };
  };

  // Loading state podczas sprawdzania autoryzacji
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-gray-900 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 font-light">Sprawdzanie uprawnień...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  const validUploadedImages = uploadedImages.filter(img => img.uploadedUrl && !img.error);
  const canSubmit = isValid && !isLoading && !isUploadingImages && validUploadedImages.length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link 
                href="/admin/dashboard"
                className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors font-light"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Powrót do dashboardu
              </Link>
              <div className="h-6 border-l border-gray-300"></div>
              <h1 className="text-lg font-light text-gray-900">Dodaj nowy produkt</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-light text-gray-900 mb-6 tracking-tight">Podstawowe informacje</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Product Name */}
              <div className="md:col-span-2">
                <label htmlFor="name" className="block text-sm font-light text-gray-900 mb-3 uppercase tracking-wider">
                  Nazwa produktu <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  {...register('name', {
                    required: 'Nazwa produktu jest wymagana',
                    minLength: {
                      value: 3,
                      message: 'Nazwa musi mieć co najmniej 3 znaki'
                    }
                  })}
                  className={`w-full px-4 py-3 border focus:outline-none bg-white font-light transition-colors ${
                    errors.name ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-gray-900'
                  }`}
                  placeholder="Np. Elegancka Torebka Damska"
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600 flex items-center font-light">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-light text-gray-900 mb-3 uppercase tracking-wider">
                  Kategoria <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  {...register('category', { required: 'Kategoria jest wymagana' })}
                  className="w-full px-4 py-3 border border-gray-200 focus:border-gray-900 focus:outline-none bg-white font-light transition-colors"
                >
                  {CATEGORIES.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-light text-gray-900 mb-3 uppercase tracking-wider">
                  Opis produktu <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  rows={4}
                  {...register('description', {
                    required: 'Opis produktu jest wymagany',
                    minLength: {
                      value: 20,
                      message: 'Opis musi mieć co najmniej 20 znaków'
                    }
                  })}
                  className={`w-full px-4 py-3 border focus:outline-none bg-white resize-none font-light transition-colors ${
                    errors.description ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-gray-900'
                  }`}
                  placeholder="Opisz produkt szczegółowo..."
                />
                {errors.description && (
                  <p className="mt-2 text-sm text-red-600 flex items-center font-light">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Dimensions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-light text-gray-900 mb-6 tracking-tight">Wymiary produktu</h2>
            
            <div className="mb-6">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  {...register('dimensionsEnabled')}
                  className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
                />
                <span className="text-sm text-gray-700 font-light">
                  Dodaj informacje o wymiarach
                </span>
              </label>
            </div>

            {watchedDimensionsEnabled && (
              <div className="space-y-4">
                <div className="mb-4">
                  <label className="block text-sm font-light text-gray-900 mb-2 uppercase tracking-wider">
                    Jednostka
                  </label>
                  <select
                    {...register('dimensionUnit')}
                    className="px-3 py-2 border border-gray-200 focus:border-gray-900 focus:outline-none bg-white font-light"
                  >
                    <option value="cm">Centymetry (cm)</option>
                    <option value="mm">Milimetry (mm)</option>
                  </select>
                </div>

                {watchedCategory === 'paski' ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-light text-gray-700 mb-2">Długość</label>
                      <input
                        type="number"
                        step="0.1"
                        {...register('length')}
                        className="w-full px-3 py-2 border border-gray-200 focus:border-gray-900 focus:outline-none bg-white font-light"
                        placeholder="np. 110"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-light text-gray-700 mb-2">Szerokość</label>
                      <input
                        type="number"
                        step="0.1"
                        {...register('width')}
                        className="w-full px-3 py-2 border border-gray-200 focus:border-gray-900 focus:outline-none bg-white font-light"
                        placeholder="np. 3.5"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-light text-gray-700 mb-2">Szerokość</label>
                      <input
                        type="number"
                        step="0.1"
                        {...register('width')}
                        className="w-full px-3 py-2 border border-gray-200 focus:border-gray-900 focus:outline-none bg-white font-light"
                        placeholder="np. 30"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-light text-gray-700 mb-2">Wysokość</label>
                      <input
                        type="number"
                        step="0.1"
                        {...register('height')}
                        className="w-full px-3 py-2 border border-gray-200 focus:border-gray-900 focus:outline-none bg-white font-light"
                        placeholder="np. 25"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-light text-gray-700 mb-2">Głębokość</label>
                      <input
                        type="number"
                        step="0.1"
                        {...register('depth')}
                        className="w-full px-3 py-2 border border-gray-200 focus:border-gray-900 focus:outline-none bg-white font-light"
                        placeholder="np. 12"
                      />
                    </div>
                  </div>
                )}

                <p className="text-xs text-gray-500 font-light">
                  Podaj wymiary produktu. Możesz wypełnić tylko te pola, które są istotne dla danego produktu.
                </p>
              </div>
            )}
          </div>

          {/* Available Colors */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-light text-gray-900 mb-6 tracking-tight">
              Dostępne kolory <span className="text-red-500">*</span>
            </h2>
            
            <div className="space-y-3">
              {fields.map((field, index) => (
                <div key={field.id} className="flex items-center space-x-3">
                  <input
                    type="text"
                    {...register(`availableColors.${index}.value` as const, {
                      required: index === 0 ? 'Co najmniej jeden kolor jest wymagany' : false
                    })}
                    className={`flex-1 px-4 py-3 border focus:outline-none bg-white font-light transition-colors ${
                      errors.availableColors?.[index]?.value 
                        ? 'border-red-300 focus:border-red-500' 
                        : 'border-gray-200 focus:border-gray-900'
                    }`}
                    placeholder="Np. Czarny, Brązowy, Beżowy..."
                  />
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="p-2 text-red-600 hover:text-red-800 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              
              {errors.availableColors?.[0]?.value && (
                <p className="text-sm text-red-600 flex items-center font-light">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  {errors.availableColors[0].value.message}
                </p>
              )}
              
              <button
                type="button"
                onClick={() => append({ value: '' })}
                className="inline-flex items-center px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors font-light border border-gray-200 hover:border-gray-900"
              >
                <Plus className="w-4 h-4 mr-2" />
                Dodaj kolor
              </button>
            </div>
          </div>

          {/* Images */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-light text-gray-900 mb-6 tracking-tight">
              Zdjęcia produktu <span className="text-red-500">*</span>
            </h2>
            
            {/* Upload Area */}
            <div className="mb-6">
              <label className="block w-full">
                <div className={`border-2 border-dashed p-12 text-center transition-colors cursor-pointer ${
                  isUploadingImages 
                    ? 'border-blue-300 bg-blue-50' 
                    : 'border-gray-200 bg-gray-50 hover:border-gray-900'
                }`}>
                  {isUploadingImages ? (
                    <Loader2 className="w-12 h-12 text-blue-500 mx-auto mb-4 animate-spin" />
                  ) : (
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  )}
                  <div className="text-sm text-gray-600 font-light">
                    {isUploadingImages ? (
                      <span className="text-blue-600">Dodawanie zdjęć...</span>
                    ) : (
                      <>
                        <span className="font-medium text-gray-900">Kliknij aby dodać zdjęcia</span> lub przeciągnij je tutaj
                      </>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 mt-2 font-light">
                    PNG, JPG, JPEG do 10MB każde (automatycznie kompresowane)
                  </div>
                </div>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={isUploadingImages}
                />
              </label>
            </div>

            {/* Upload Progress & Status */}
            {isUploadingImages && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">Dodawanie zdjęć...</p>
                    <p className="text-xs text-blue-700">Zdjęcia są kompresowane i upload'owane do Firebase Storage</p>
                  </div>
                </div>
              </div>
            )}

            {/* Uploaded Images */}
            {uploadedImages.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-light text-gray-900 uppercase tracking-wider">
                    Zdjęcia ({uploadedImages.length})
                  </h3>
                  <p className="text-xs text-gray-500 font-light">
                    Kliknij na zdjęcie, aby ustawić jako główne
                  </p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {uploadedImages.map((image, index) => {
                    const status = getImageStatus(image);
                    const StatusIcon = status.icon;
                    
                    return (
                      <div 
                        key={index}
                        className={`relative aspect-square border-2 cursor-pointer transition-all ${
                          mainImageIndex === index && image.uploadedUrl 
                            ? 'border-gray-900' 
                            : 'border-gray-200 hover:border-gray-400'
                        } ${!image.uploadedUrl ? 'cursor-default' : ''}`}
                        onClick={() => {
                          if (image.uploadedUrl && !image.error) {
                            setMainImageIndex(index);
                          }
                        }}
                      >
                        {/* Image Preview */}
                        <div className="absolute inset-0">
                          <img
                            src={image.previewUrl}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Upload Overlay */}
                        {(image.isUploading || image.error) && (
                          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <div className="text-center text-white">
                              <StatusIcon className={`w-6 h-6 mx-auto mb-1 ${
                                image.isUploading ? 'animate-spin' : ''
                              } ${status.color}`} />
                              <p className="text-xs font-light">{status.text}</p>
                            </div>
                          </div>
                        )}

                        {/* Main image badge */}
                        {mainImageIndex === index && image.uploadedUrl && !image.error && (
                          <div className="absolute top-2 left-2 bg-gray-900 text-white text-xs px-2 py-1 font-light uppercase tracking-wider">
                            Główne
                          </div>
                        )}

                        {/* Success badge */}
                        {image.uploadedUrl && !image.error && (
                          <div className="absolute top-2 right-8 bg-green-500 text-white p-1 rounded-full">
                            <CheckCircle className="w-3 h-3" />
                          </div>
                        )}

                        {/* Error badge */}
                        {image.error && (
                          <div className="absolute top-2 right-8 bg-red-500 text-white p-1 rounded-full">
                            <AlertTriangle className="w-3 h-3" />
                          </div>
                        )}
                        
                        {/* Remove button */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeImage(index);
                          }}
                          className="absolute top-2 right-2 p-1 bg-red-600 text-white hover:bg-red-700 transition-colors rounded-full"
                        >
                          <X className="w-3 h-3" />
                        </button>

                        {/* Progress bar */}
                        {image.isUploading && (
                          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2">
                            <div className="w-full bg-gray-700 rounded-full h-1">
                              <div 
                                className="bg-blue-500 h-1 rounded-full transition-all duration-300"
                                style={{ width: `${image.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Upload Summary */}
                {uploadedImages.length > 0 && (
                  <div className="mt-4 text-xs text-gray-500 font-light">
                    <div className="flex items-center space-x-4">
                      <span>✅ Dodane: {validUploadedImages.length}</span>
                      {uploadedImages.some(img => img.isUploading) && (
                        <span>⏳ Upload'owanie: {uploadedImages.filter(img => img.isUploading).length}</span>
                      )}
                      {uploadedImages.some(img => img.error) && (
                        <span className="text-red-500">❌ Błędy: {uploadedImages.filter(img => img.error).length}</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Settings */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-light text-gray-900 mb-6 tracking-tight">Ustawienia</h2>
            
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="isActive"
                {...register('isActive')}
                className="w-4 h-4 text-gray-900 border-gray-300 focus:ring-gray-900"
              />
              <label htmlFor="isActive" className="text-sm text-gray-700 font-light">
                Produkt aktywny (widoczny dla klientów)
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <Link
              href="/admin/dashboard"
              className="inline-flex items-center px-6 py-3 border border-gray-200 text-gray-700 hover:border-gray-900 hover:text-gray-900 transition-all duration-300 font-light uppercase tracking-wider"
            >
              Anuluj
            </Link>
            
            <div className="flex items-center space-x-3">
              <button
                type="button"
                disabled={validUploadedImages.length === 0}
                className={`inline-flex items-center px-6 py-3 border transition-all duration-300 font-light uppercase tracking-wider ${
                  validUploadedImages.length > 0
                    ? 'border-gray-200 text-gray-700 hover:border-gray-900 hover:text-gray-900'
                    : 'border-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Eye className="w-4 h-4 mr-2" />
                Podgląd
              </button>
              
              <button
                type="submit"
                disabled={!canSubmit}
                className={`inline-flex items-center px-8 py-3 font-light transition-all duration-300 uppercase tracking-wider ${
                  canSubmit
                    ? 'bg-gray-900 text-white hover:bg-gray-800'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Zapisywanie...
                  </>
                ) : isUploadingImages ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Upload zdjęć...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Zapisz produkt
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Help text */}
          {!canSubmit && uploadedImages.length > 0 && (
            <div className="text-center">
              <p className="text-sm text-gray-500 font-light">
                {isUploadingImages && 'Poczekaj aż wszystkie zdjęcia zostaną dodane...'}
                {!isUploadingImages && validUploadedImages.length === 0 && 'Dodaj co najmniej jedno zdjęcie, aby zapisać produkt.'}
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}