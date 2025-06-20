'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useForm, useFieldArray } from 'react-hook-form';
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
  Trash2
} from 'lucide-react';
import toast from 'react-hot-toast';
import { ProductCategory, CATEGORIES, Product } from '@/types';

interface ProductForm {
  name: string;
  description: string;
  category: ProductCategory;
  dimensions: string;
  availableColors: { value: string }[];
  isActive: boolean;
}

// Mock data - później zastąpimy danymi z Firebase
const mockProduct: Product = {
  id: '1',
  name: 'Elegancka Torebka Damska',
  description: 'Klasyczna torebka wykonana ze skóry naturalnej najwyższej jakości. Idealna na każdą okazję, łączy w sobie elegancję z funkcjonalnością.',
  category: 'torebki' as ProductCategory,
  mainImage: '/placeholder-bag.jpg',
  images: ['/placeholder-bag.jpg', '/placeholder-bag-2.jpg', '/placeholder-bag-3.jpg'],
  availableColors: ['Czarny', 'Brązowy', 'Beżowy'],
  dimensions: '30x25x12 cm',
  createdAt: new Date('2024-01-15'),
  updatedAt: new Date('2024-01-20'),
  isActive: true
};

export default function EditProductPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [productImages, setProductImages] = useState<string[]>([]);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);
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
      dimensions: '',
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

  // Load product data
  useEffect(() => {
    const loadProduct = async () => {
      try {
        // Tutaj będzie pobieranie z Firebase
        const productData = mockProduct; // Symulacja danych
        
        setProduct(productData);
        setProductImages(productData.images);
        setMainImageIndex(productData.images.indexOf(productData.mainImage));
        
        // Wypełnij formularz danymi produktu
        setValue('name', productData.name);
        setValue('description', productData.description);
        setValue('category', productData.category);
        setValue('dimensions', productData.dimensions);
        setValue('isActive', productData.isActive);
        
        // Wypełnij kolory
        replace(productData.availableColors.map(color => ({ value: color })));
        
      } catch (error) {
        toast.error('Nie udało się załadować danych produktu');
        router.push('/admin/dashboard');
      } finally {
        setIsLoadingProduct(false);
      }
    };

    loadProduct();
  }, [params.id, setValue, replace, router]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      // Tutaj będzie logika uploadowania do Firebase Storage
      const newImages = Array.from(files).map((file, index) => 
        `/placeholder-upload-${productImages.length + index}.jpg`
      );
      setProductImages(prev => [...prev, ...newImages]);
      toast.success(`Dodano ${files.length} zdjęć`);
    }
  };

  const removeImage = (index: number) => {
    if (productImages.length <= 1) {
      toast.error('Produkt musi mieć co najmniej jedno zdjęcie');
      return;
    }
    
    setProductImages(prev => prev.filter((_, i) => i !== index));
    if (mainImageIndex >= index && mainImageIndex > 0) {
      setMainImageIndex(mainImageIndex - 1);
    } else if (mainImageIndex === index && index === productImages.length - 1) {
      setMainImageIndex(0);
    }
  };

  const onSubmit = async (data: ProductForm) => {
    if (productImages.length === 0) {
      toast.error('Produkt musi mieć co najmniej jedno zdjęcie');
      return;
    }

    setIsLoading(true);

    try {
      // Tutaj będzie logika aktualizacji w Firebase
      const updatedProductData = {
        ...data,
        id: params.id,
        availableColors: data.availableColors.map(color => color.value).filter(Boolean),
        images: productImages,
        mainImage: productImages[mainImageIndex],
        updatedAt: new Date(),
        createdAt: product?.createdAt || new Date()
      };

      console.log('Updated product data:', updatedProductData);
      
      // Symulacja zapisywania
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Produkt został zaktualizowany pomyślnie!');
      router.push('/admin/dashboard');
    } catch (error) {
      toast.error('Wystąpił błąd podczas aktualizacji produktu');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProduct = async () => {
    if (!confirm('Czy na pewno chcesz usunąć ten produkt? Tej operacji nie można cofnąć.')) {
      return;
    }

    setIsLoading(true);

    try {
      // Tutaj będzie logika usuwania z Firebase
      console.log('Deleting product:', params.id);
      
      // Symulacja usuwania
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Produkt został usunięty pomyślnie!');
      router.push('/admin/dashboard');
    } catch (error) {
      toast.error('Wystąpił błąd podczas usuwania produktu');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingProduct) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-brown-600 mx-auto mb-4" />
          <p className="text-gray-600">Ładowanie danych produktu...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-gray-900 mb-2">Produkt nie znaleziony</h1>
          <p className="text-gray-600 mb-6">Nie udało się znaleźć produktu o podanym ID.</p>
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center px-4 py-2 bg-brown-700 text-white rounded-lg hover:bg-brown-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Powrót do dashboardu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link 
                href="/admin/dashboard"
                className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Powrót do dashboardu
              </Link>
              <div className="h-6 border-l border-gray-300"></div>
              <h1 className="text-lg font-medium text-gray-900">Edytuj produkt</h1>
            </div>

            <div className="flex items-center space-x-3">
              <Link
                href={`/produkty/szczegoly/${product.id}`}
                target="_blank"
                className="inline-flex items-center px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Eye className="w-4 h-4 mr-2" />
                Zobacz produkt
              </Link>
              
              <button
                onClick={handleDeleteProduct}
                disabled={isLoading}
                className="inline-flex items-center px-3 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Usuń produkt
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Product Info Header */}
        <div className="bg-brown-50 rounded-lg p-4 mb-8 border border-brown-200">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-brown-200 to-brown-300 rounded-lg flex items-center justify-center">
              <span className="text-brown-700 font-bold text-lg">
                {product.name.charAt(0)}
              </span>
            </div>
            <div>
              <h2 className="text-lg font-medium text-brown-900">{product.name}</h2>
              <p className="text-sm text-brown-600">
                Utworzono: {product.createdAt.toLocaleDateString('pl-PL')} | 
                Ostatnia aktualizacja: {product.updatedAt.toLocaleDateString('pl-PL')}
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Podstawowe informacje</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Product Name */}
              <div className="md:col-span-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
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
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-transparent ${
                    errors.name ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Np. Elegancka Torebka Damska"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Kategoria <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  {...register('category', { required: 'Kategoria jest wymagana' })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-transparent"
                >
                  {CATEGORIES.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Dimensions */}
              <div>
                <label htmlFor="dimensions" className="block text-sm font-medium text-gray-700 mb-2">
                  Wymiary <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="dimensions"
                  {...register('dimensions', { required: 'Wymiary są wymagane' })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-transparent ${
                    errors.dimensions ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Np. 30x25x12 cm"
                />
                {errors.dimensions && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.dimensions.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
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
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-transparent resize-none ${
                    errors.description ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Opisz produkt szczegółowo..."
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Available Colors */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Dostępne kolory</h3>
            
            <div className="space-y-3">
              {fields.map((field, index) => (
                <div key={field.id} className="flex items-center space-x-3">
                  <input
                    type="text"
                    {...register(`availableColors.${index}.value` as const, {
                      required: index === 0 ? 'Co najmniej jeden kolor jest wymagany' : false
                    })}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-transparent"
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
              
              <button
                type="button"
                onClick={() => append({ value: '' })}
                className="inline-flex items-center px-3 py-2 text-sm text-brown-600 hover:text-brown-800 transition-colors"
              >
                <Plus className="w-4 h-4 mr-1" />
                Dodaj kolor
              </button>
            </div>
          </div>

          {/* Images */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Zdjęcia produktu</h3>
            
            {/* Current Images */}
            {productImages.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-medium text-gray-900">
                    Obecne zdjęcia ({productImages.length})
                  </h4>
                  <p className="text-xs text-gray-500">
                    Kliknij na zdjęcie, aby ustawić jako główne
                  </p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {productImages.map((image, index) => (
                    <div 
                      key={index}
                      className={`relative aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                        mainImageIndex === index ? 'border-brown-500' : 'border-transparent hover:border-gray-300'
                      }`}
                      onClick={() => setMainImageIndex(index)}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <ImageIcon className="w-8 h-8 text-gray-400" />
                      </div>
                      
                      {/* Main image badge */}
                      {mainImageIndex === index && (
                        <div className="absolute top-2 left-2 bg-brown-600 text-white text-xs px-2 py-1 rounded">
                          Główne
                        </div>
                      )}
                      
                      {/* Remove button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeImage(index);
                        }}
                        className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                        disabled={productImages.length <= 1}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upload Area */}
            <div>
              <label className="block w-full">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-brown-400 transition-colors cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <div className="text-sm text-gray-600">
                    <span className="font-medium text-brown-600">Kliknij aby dodać więcej zdjęć</span> lub przeciągnij je tutaj
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    PNG, JPG, JPEG do 5MB każde
                  </div>
                </div>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Settings */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Ustawienia</h3>
            
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="isActive"
                {...register('isActive')}
                className="w-4 h-4 text-brown-600 border-gray-300 rounded focus:ring-brown-500"
              />
              <label htmlFor="isActive" className="text-sm text-gray-700">
                Produkt aktywny (widoczny dla klientów)
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <Link
              href="/admin/dashboard"
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Anuluj zmiany
            </Link>
            
            <div className="flex items-center space-x-3">
              <Link
                href={`/produkty/szczegoly/${product.id}`}
                target="_blank"
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Eye className="w-4 h-4 mr-2" />
                Podgląd
              </Link>
              
              <button
                type="submit"
                disabled={!isValid || isLoading || productImages.length === 0}
                className={`inline-flex items-center px-6 py-2 font-medium rounded-lg transition-all ${
                  isValid && !isLoading && productImages.length > 0
                    ? 'bg-brown-700 text-white hover:bg-brown-800'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Zapisywanie...
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
        </form>
      </div>
    </div>
  );
}