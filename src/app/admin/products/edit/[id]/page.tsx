'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useForm, useFieldArray } from 'react-hook-form';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { isUserAdmin } from '@/lib/auth';
import { getProductById, updateProduct } from '@/lib/products';
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
  Trash2,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import toast from 'react-hot-toast';
import { ProductCategory, CATEGORIES, Product, ProductDimensions } from '@/types';

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
  url: string;
  isExisting: boolean; // Czy to istniejące zdjęcie z bazy
  file?: File;
  previewUrl?: string;
  isUploading?: boolean;
  progress?: number;
  error?: string;
}

export default function EditProductPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);
  const [productImages, setProductImages] = useState<UploadedImage[]>([]);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [isUploadingImages, setIsUploadingImages] = useState(false);
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
  const router = useRouter();
  const params = useParams();

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
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

  const { fields, append, remove, replace } = useFieldArray({
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

  // Load product data
  useEffect(() => {
    const loadProduct = async () => {
      if (!isAuthorized) return;
      
      const productId = params.id as string;
      setIsLoadingProduct(true);
      
      try {
        console.log('🔍 Loading product with ID:', productId);
        const productData = await getProductById(productId);
        
        if (productData) {
          console.log('✅ Product loaded successfully:', productData);
          setProduct(productData);
          
          // Załaduj istniejące obrazy
          const existingImages: UploadedImage[] = productData.images.map(url => ({
            url,
            isExisting: true
          }));
          setProductImages(existingImages);
          setMainImageIndex(productData.images.indexOf(productData.mainImage));
          
          // Wypełnij formularz
          setValue('name', productData.name);
          setValue('description', productData.description);
          setValue('category', productData.category);
          setValue('isActive', productData.isActive);
          
          // Obsługa wymiarów
          if (productData.dimensions) {
            setValue('dimensionsEnabled', true);
            setValue('dimensionUnit', productData.dimensions.unit || 'cm');
            setValue('width', productData.dimensions.width?.toString() || '');
            setValue('height', productData.dimensions.height?.toString() || '');
            setValue('depth', productData.dimensions.depth?.toString() || '');
            setValue('length', productData.dimensions.length?.toString() || '');
          } else {
            setValue('dimensionsEnabled', false);
          }
          
          // Wypełnij kolory
          replace(productData.availableColors.map(color => ({ value: color })));
        } else {
          toast.error('Produkt nie znaleziony');
          router.push('/admin/dashboard');
        }
      } catch (error: any) {
        console.error('❌ Error loading product:', error);
        toast.error('Nie udało się załadować danych produktu');
        router.push('/admin/dashboard');
      } finally {
        setIsLoadingProduct(false);
      }
    };

    loadProduct();
  }, [params.id, setValue, replace, router, isAuthorized]);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    console.log('🔍 Starting image upload for', files.length, 'files');

    const startingIndex = productImages.length;
    const newImages: UploadedImage[] = Array.from(files).map(file => ({
      url: '',
      isExisting: false,
      file,
      previewUrl: createPreviewUrl(file),
      isUploading: true,
      progress: 0
    }));

    setProductImages(prev => [...prev, ...newImages]);
    setIsUploadingImages(true);

    try {
      const filesToUpload = Array.from(files);
      
      await uploadMultipleImages(
        filesToUpload,
        (fileIndex, progress) => {
          setProductImages(prev => {
            const updated = [...prev];
            const targetIndex = startingIndex + fileIndex;
            
            if (updated[targetIndex]) {
              updated[targetIndex] = {
                ...updated[targetIndex],
                progress: progress.progress,
                isUploading: !progress.isComplete,
                url: progress.url || updated[targetIndex].url,
                error: progress.error
              };
            }
            
            return updated;
          });
        },
        (results) => {
          console.log('✅ Upload completed:', results);
          // Force wszystkie nowe obrazy na nie-uploading
          setProductImages(prev => {
            const updated = [...prev];
            for (let i = startingIndex; i < startingIndex + files.length; i++) {
              if (updated[i]) {
                updated[i] = {
                  ...updated[i],
                  isUploading: false
                };
              }
            }
            return updated;
          });
          
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
      console.error('❌ Upload error:', error);
      toast.error('Wystąpił błąd podczas upload\'u zdjęć');
      setIsUploadingImages(false);
    }

    event.target.value = '';
  };

  const removeImage = async (index: number) => {
    if (productImages.length <= 1) {
      toast.error('Produkt musi mieć co najmniej jedno zdjęcie');
      return;
    }
    
    const imageToRemove = productImages[index];
    
    if (imageToRemove.isExisting) {
      // Dodaj do listy do usunięcia (usuniemy przy zapisie)
      setImagesToDelete(prev => [...prev, imageToRemove.url]);
    } else if (imageToRemove.url && !imageToRemove.isExisting) {
      // Nowo dodane zdjęcie - usuń od razu
      try {
        await deleteMultipleImages([imageToRemove.url]);
      } catch (error) {
        console.error('Error deleting new image:', error);
      }
    }
    
    // Zwolnij preview URL
    if (imageToRemove.previewUrl) {
      revokePreviewUrl(imageToRemove.previewUrl);
    }
    
    // Usuń z listy
    setProductImages(prev => prev.filter((_, i) => i !== index));
    
    // Adjust main image index
    if (mainImageIndex >= index && mainImageIndex > 0) {
      setMainImageIndex(mainImageIndex - 1);
    } else if (mainImageIndex === index && index === productImages.length - 1) {
      setMainImageIndex(0);
    }
  };

  // ZAKTUALIZOWANA funkcja onSubmit z debugowaniem
  const onSubmit = async (data: ProductForm) => {
    console.log('🔍 Debug - Form submission started');
    console.log('🔍 Debug - Form data:', data);
    console.log('🔍 Debug - Product images:', productImages);
    console.log('🔍 Debug - Product ID:', params.id);
    console.log('🔍 Debug - Images to delete:', imagesToDelete);

    if (productImages.length === 0) {
      toast.error('Produkt musi mieć co najmniej jedno zdjęcie');
      return;
    }

    const validColors = data.availableColors.map(color => color.value).filter(Boolean);
    if (validColors.length === 0) {
      toast.error('Dodaj przynajmniej jeden kolor produktu');
      return;
    }

    // Sprawdź czy są obrazy w trakcie upload'u
    const stillUploading = productImages.some(img => img.isUploading);
    if (stillUploading) {
      toast.error('Poczekaj aż wszystkie zdjęcia zostaną dodane');
      return;
    }

    setIsLoading(true);

    try {
      // 1. Usuń oznaczone do usunięcia zdjęcia
      if (imagesToDelete.length > 0) {
        console.log('🔍 Deleting images:', imagesToDelete);
        try {
          await deleteMultipleImages(imagesToDelete);
          console.log('✅ Old images deleted successfully');
        } catch (error) {
          console.error('❌ Error deleting old images:', error);
          // Kontynuuj mimo błędu z usuwaniem zdjęć
        }
      }

      // 2. Przygotuj wymiary - DOKŁADNIE jak w add
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

      // 3. Przygotuj URLs zdjęć
      const imageUrls = productImages
        .filter(img => img.url && !img.error)
        .map(img => img.url);
      
      if (imageUrls.length === 0) {
        throw new Error('Brak prawidłowych zdjęć do zapisania');
      }

      const mainImageUrl = productImages[mainImageIndex]?.url || imageUrls[0];

      // 4. Przygotuj dane produktu - TYLKO te które się zmieniły
      const updatedProductData: any = {};
      
      // Zawsze aktualizuj te podstawowe pola
      updatedProductData.name = data.name;
      updatedProductData.description = data.description;
      updatedProductData.category = data.category;
      updatedProductData.availableColors = validColors;
      updatedProductData.images = imageUrls;
      updatedProductData.mainImage = mainImageUrl;
      updatedProductData.isActive = data.isActive;
      
      // Wymiary - ustaw lub usuń
      if (dimensions) {
        updatedProductData.dimensions = dimensions;
      } else {
        // Jeśli wymiary są wyłączone, usuń je z dokumentu
        updatedProductData.dimensions = null; // To spowoduje usunięcie pola
      }

      console.log('🔍 Final product data to save:', updatedProductData);

      // 5. Zapisz do Firebase
      await updateProduct(params.id as string, updatedProductData);
      
      console.log('✅ Product updated successfully!');
      toast.success('Produkt został zaktualizowany pomyślnie!');
      router.push('/admin/dashboard');
      
    } catch (error: any) {
      console.error('❌ Error updating product:', error);
      console.error('❌ Error details:', {
        code: error?.code,
        message: error?.message,
        stack: error?.stack
      });
      
      toast.error(error.message || 'Wystąpił błąd podczas aktualizacji produktu');
    } finally {
      setIsLoading(false);
    }
  };

  const getImageStatus = (image: UploadedImage) => {
    if (image.error) {
      return { icon: AlertTriangle, color: 'text-red-500', text: 'Błąd' };
    }
    if (image.isUploading) {
      return { icon: Loader2, color: 'text-blue-500', text: `${Math.round(image.progress || 0)}%` };
    }
    if (image.url) {
      return { icon: CheckCircle, color: 'text-green-500', text: image.isExisting ? 'Istniejące' : 'Nowe' };
    }
    return { icon: Upload, color: 'text-gray-400', text: 'Oczekuje' };
  };

  // Loading states
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

  if (isLoadingProduct) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-gray-600 mx-auto mb-4" />
          <p className="text-gray-600 font-light">Ładowanie danych produktu...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-xl font-light text-gray-900 mb-2">Produkt nie znaleziony</h1>
          <p className="text-gray-600 mb-6 font-light">Nie udało się znaleźć produktu o podanym ID.</p>
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center px-4 py-2 bg-gray-900 text-white font-light hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Powrót do dashboardu
          </Link>
        </div>
      </div>
    );
  }

  const stillUploading = productImages.some(img => img.isUploading);
  const canSubmit = isValid && !isLoading && !isUploadingImages && !stillUploading && productImages.length > 0;

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
              <h1 className="text-lg font-light text-gray-900">Edytuj produkt</h1>
            </div>

            <div className="flex items-center space-x-3">
              <Link
                href={`/produkty/szczegoly/${product.id}`}
                target="_blank"
                className="inline-flex items-center px-3 py-2 text-sm border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors font-light"
              >
                <Eye className="w-4 h-4 mr-2" />
                Zobacz produkt
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Product Info Header */}
        <div className="bg-gray-50 border border-gray-200 p-4 mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-700 font-light text-lg">
                {product.name.charAt(0)}
              </span>
            </div>
            <div>
              <h2 className="text-lg font-light text-gray-900">{product.name}</h2>
              <p className="text-sm text-gray-600 font-light">
                Utworzono: {product.createdAt.toLocaleDateString('pl-PL')} | 
                Ostatnia aktualizacja: {product.updatedAt.toLocaleDateString('pl-PL')}
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          
          {/* Images Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-light text-gray-900 mb-6 tracking-tight">Zdjęcia produktu</h3>
            
            {/* Current Images */}
            {productImages.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-light text-gray-900 uppercase tracking-wider">
                    Zdjęcia ({productImages.length})
                  </h4>
                  <p className="text-xs text-gray-500 font-light">
                    Kliknij na zdjęcie, aby ustawić jako główne
                  </p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {productImages.map((image, index) => {
                    const status = getImageStatus(image);
                    const StatusIcon = status.icon;
                    
                    return (
                      <div 
                        key={index}
                        className={`relative aspect-square border-2 cursor-pointer transition-all ${
                          mainImageIndex === index ? 'border-gray-900' : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => !image.isUploading && setMainImageIndex(index)}
                      >
                        <div className="absolute inset-0">
                          <img
                            src={image.previewUrl || image.url}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
                          />
                        </div>

                        {/* Upload Overlay */}
                        {image.isUploading && (
                          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <div className="text-center text-white">
                              <StatusIcon className="w-6 h-6 mx-auto mb-1 animate-spin" />
                              <p className="text-xs font-light">{status.text}</p>
                            </div>
                          </div>
                        )}
                        
                        {/* Main image badge */}
                        {mainImageIndex === index && !image.isUploading && (
                          <div className="absolute top-2 left-2 bg-gray-900 text-white text-xs px-2 py-1 font-light uppercase tracking-wider">
                            Główne
                          </div>
                        )}
                        
                        {/* Status badge */}
                        {!image.isUploading && (
                          <div className={`absolute top-2 right-8 p-1 rounded-full ${
                            image.isExisting ? 'bg-blue-500' : 'bg-green-500'
                          } text-white`}>
                            <StatusIcon className="w-3 h-3" />
                          </div>
                        )}
                        
                        {/* Remove button */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeImage(index);
                          }}
                          className="absolute top-2 right-2 p-1 bg-red-600 text-white hover:bg-red-700 transition-colors"
                          disabled={productImages.length <= 1}
                        >
                          <X className="w-3 h-3" />
                        </button>

                        {/* Progress bar */}
                        {image.isUploading && (
                          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2">
                            <div className="w-full bg-gray-700 rounded-full h-1">
                              <div 
                                className="bg-blue-500 h-1 rounded-full transition-all duration-300"
                                style={{ width: `${image.progress || 0}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Upload Area */}
            <div>
              <label className="block w-full">
                <div className="border-2 border-dashed border-gray-300 p-8 text-center hover:border-gray-400 transition-colors cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <div className="text-sm text-gray-600 font-light">
                    <span className="font-medium text-gray-900">Kliknij aby dodać więcej zdjęć</span> lub przeciągnij je tutaj
                  </div>
                  <div className="text-xs text-gray-500 mt-2 font-light">
                    PNG, JPG, JPEG do 5MB każde
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
          </div>

          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-light text-gray-900 mb-6 tracking-tight">Podstawowe informacje</h3>
            
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
            <h3 className="text-lg font-light text-gray-900 mb-6 tracking-tight">Wymiary produktu</h3>
            
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
            <h3 className="text-lg font-light text-gray-900 mb-6 tracking-tight">
              Dostępne kolory <span className="text-red-500">*</span>
            </h3>
            
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

          {/* Settings */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-light text-gray-900 mb-6 tracking-tight">Ustawienia</h3>
            
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
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors font-light"
            >
              Anuluj zmiany
            </Link>
            
            <div className="flex items-center space-x-3">
              <Link
                href={`/produkty/szczegoly/${product.id}`}
                target="_blank"
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors font-light"
              >
                <Eye className="w-4 h-4 mr-2" />
                Podgląd
              </Link>
              
              <button
                type="submit"
                disabled={!canSubmit}
                className={`inline-flex items-center px-6 py-2 font-light transition-all ${
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
                ) : (isUploadingImages || stillUploading) ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Upload zdjęć...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Zapisz zmiany
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Debug info - tylko w development */}
          {process.env.NODE_ENV === 'development' && (
            <div className="bg-yellow-50 border border-yellow-200 p-4 text-xs">
              <h4 className="font-medium text-yellow-800 mb-2">Debug Info:</h4>
              <div className="space-y-1 text-yellow-700">
                <div>Images: {productImages.length}</div>
                <div>Still uploading: {productImages.some(img => img.isUploading) ? 'Yes' : 'No'}</div>
                <div>Valid images: {productImages.filter(img => img.url && !img.error).length}</div>
                <div>Form valid: {isValid ? 'Yes' : 'No'}</div>
                <div>Can submit: {canSubmit ? 'Yes' : 'No'}</div>
                <div>Images to delete: {imagesToDelete.length}</div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}