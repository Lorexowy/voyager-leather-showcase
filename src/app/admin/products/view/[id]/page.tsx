'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { isUserAdmin } from '@/lib/auth';
import { getProductById, deleteProduct, toggleProductStatus } from '@/lib/products';
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  ExternalLink,
  Calendar,
  Package,
  Palette,
  Ruler,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Product, ProductCategory, CATEGORIES, formatDimensions } from '@/types';
import ConfirmDialog from '@/components/ConfirmDialog';

export default function AdminViewProductPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const router = useRouter();
  const params = useParams();

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
      setIsLoading(true);
      
      try {
        const productData = await getProductById(productId);
        
        if (productData) {
          setProduct(productData);
        } else {
          toast.error('Produkt nie znaleziony');
          router.push('/admin/dashboard');
        }
      } catch (error) {
        console.error('Error loading product:', error);
        toast.error('Nie udało się załadować danych produktu');
        router.push('/admin/dashboard');
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [params.id, router, isAuthorized]);

  // Aktualizuj currentImageIndex gdy produkt się załaduje
  useEffect(() => {
    if (product && product.mainImage) {
      const mainIndex = product.images.indexOf(product.mainImage);
      setCurrentImageIndex(mainIndex >= 0 ? mainIndex : 0);
    }
  }, [product]);

  // Funkcje nawigacji galerii
  const nextImage = () => {
    if (product) {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    }
  };

  const prevImage = () => {
    if (product) {
      setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    }
  };

  const selectImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleDeleteProduct = async () => {
    if (!product) return;

    setIsDeleting(true);

    try {
      await deleteProduct(product.id);
      toast.success('Produkt został usunięty pomyślnie!');
      router.push('/admin/dashboard');
    } catch (error: any) {
      console.error('Error deleting product:', error);
      toast.error(error.message || 'Wystąpił błąd podczas usuwania produktu');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleToggleProductStatus = async () => {
    if (!product) return;

    try {
      const newStatus = await toggleProductStatus(product.id);
      setProduct(prev => prev ? { ...prev, isActive: newStatus } : null);
      toast.success(`Produkt ${newStatus ? 'aktywowany' : 'deaktywowany'}`);
    } catch (error: any) {
      console.error('Error toggling product status:', error);
      toast.error(error.message || 'Wystąpił błąd podczas zmiany statusu produktu');
    }
  };

  const getCategoryName = (categoryId: ProductCategory) => {
    return CATEGORIES.find(cat => cat.id === categoryId)?.name || categoryId;
  };

  // Loading state during auth check
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
    return null; // Redirect in progress
  }

  if (isLoading) {
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
              <h1 className="text-lg font-light text-gray-900">Podgląd produktu</h1>
            </div>

            <div className="flex items-center space-x-3">
              <Link
                href={`/produkty/szczegoly/${product.id}`}
                target="_blank"
                className="inline-flex items-center px-3 py-2 text-sm border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors font-light"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Zobacz na stronie
              </Link>
              
              <Link
                href={`/admin/products/edit/${product.id}`}
                className="inline-flex items-center px-3 py-2 text-sm bg-gray-900 text-white hover:bg-gray-800 transition-colors font-light"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edytuj
              </Link>
              
              <button
                onClick={() => setShowDeleteDialog(true)}
                className="inline-flex items-center px-3 py-2 text-sm bg-red-600 text-white hover:bg-red-700 transition-colors font-light"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Usuń
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Product Images */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-light text-gray-900 mb-6 tracking-tight">Zdjęcia produktu</h2>
              
              {/* Main Image */}
              <div className="aspect-square bg-gray-100 mb-4 relative overflow-hidden rounded-lg">
                {product.images[currentImageIndex] ? (
                  <img
                    src={product.images[currentImageIndex]}
                    alt={`${product.name} - zdjęcie ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback jeśli zdjęcie się nie załaduje
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                ) : null}
                
                {/* Fallback placeholder */}
                <div 
                  className={`absolute inset-0 flex items-center justify-center ${
                    product.images[currentImageIndex] ? 'hidden' : 'flex'
                  }`}
                >
                  <div className="text-center text-gray-500">
                    <Package className="w-16 h-16 mx-auto mb-2" />
                    <p className="font-medium">Główne zdjęcie</p>
                    <p className="text-sm">Zdjęcie {currentImageIndex + 1} z {product.images.length}</p>
                  </div>
                </div>

                {/* Navigation arrows */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-700" />
                    </button>
                    
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
                    >
                      <ChevronRight className="w-5 h-5 text-gray-700" />
                    </button>
                  </>
                )}

                {/* Image counter */}
                {product.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-black/50 text-white text-sm rounded-full">
                    {currentImageIndex + 1} / {product.images.length}
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {product.images.map((imageUrl, index) => (
                    <button
                      key={index}
                      onClick={() => selectImage(index)}
                      className={`aspect-square bg-gray-100 border-2 rounded-lg overflow-hidden transition-all ${
                        currentImageIndex === index 
                          ? 'border-gray-900 ring-2 ring-gray-900 ring-offset-2' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={imageUrl}
                        alt={`${product.name} - miniatura ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback dla miniaturek
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `
                              <div class="w-full h-full flex items-center justify-center bg-gray-200">
                                <span class="text-gray-500 text-sm font-medium">${index + 1}</span>
                              </div>
                            `;
                          }
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Images info */}
              <div className="mt-4 text-xs text-gray-500 font-light space-y-1">
                <p>Łącznie zdjęć: {product.images.length}</p>
                <p>Główne zdjęcie: {product.images.indexOf(product.mainImage) + 1}</p>
                <p>Obecnie wyświetlane: {currentImageIndex + 1}</p>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-light text-gray-900 tracking-tight">Informacje podstawowe</h2>
                <button
                  onClick={handleToggleProductStatus}
                  className={`inline-flex items-center px-3 py-1 text-xs font-medium transition-colors cursor-pointer rounded-full ${
                    product.isActive 
                      ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                      : 'bg-red-100 text-red-800 hover:bg-red-200'
                  }`}
                >
                  {product.isActive ? (
                    <>
                      <Eye className="w-3 h-3 mr-1" />
                      Aktywny
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-3 h-3 mr-1" />
                      Nieaktywny
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-light text-gray-900 mb-2">{product.name}</h3>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    product.category === 'as-aleksandra-sopel' 
                      ? 'bg-gray-900 text-white' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {getCategoryName(product.category)}
                  </span>
                </div>

                <div>
                  <p className="text-sm text-gray-600 leading-relaxed font-light">
                    {product.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Product Specifications */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-light text-gray-900 mb-4 tracking-tight">Specyfikacja</h2>
              
              <div className="space-y-4">
                {/* Dimensions */}
                <div className="flex items-start space-x-3">
                  <Ruler className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Wymiary</h4>
                    <p className="text-sm text-gray-600 font-light">{formatDimensions(product.dimensions)}</p>
                  </div>
                </div>

                {/* Available Colors */}
                <div className="flex items-start space-x-3">
                  <Palette className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Dostępne kolory</h4>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {product.availableColors.map((color, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-light rounded"
                        >
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Images count */}
                <div className="flex items-start space-x-3">
                  <Package className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Zdjęcia</h4>
                    <p className="text-sm text-gray-600 font-light">{product.images.length} zdjęć</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dates */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-light text-gray-900 mb-4 tracking-tight">Historia</h2>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 font-light">Utworzono</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {product.createdAt.toLocaleDateString('pl-PL')}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 font-light">Ostatnia aktualizacja</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {product.updatedAt.toLocaleDateString('pl-PL')}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-light text-gray-900 mb-4 tracking-tight">Szybkie akcje</h2>
              
              <div className="space-y-3">
                <Link
                  href={`/admin/products/edit/${product.id}`}
                  className="w-full inline-flex items-center justify-center px-4 py-2 bg-gray-900 text-white hover:bg-gray-800 transition-colors font-light"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edytuj produkt
                </Link>
                
                <Link
                  href={`/produkty/szczegoly/${product.id}`}
                  target="_blank"
                  className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors font-light"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Zobacz na stronie
                </Link>
                
                <button
                  onClick={handleToggleProductStatus}
                  className={`w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 transition-colors font-light ${
                    product.isActive
                      ? 'text-red-700 hover:bg-red-50 hover:border-red-300'
                      : 'text-green-700 hover:bg-green-50 hover:border-green-300'
                  }`}
                >
                  {product.isActive ? (
                    <>
                      <EyeOff className="w-4 h-4 mr-2" />
                      Deaktywuj produkt
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4 mr-2" />
                      Aktywuj produkt
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDeleteProduct}
        title="Usuń produkt"
        message={`Czy na pewno chcesz usunąć produkt "${product.name}"? Tej operacji nie można cofnąć. Wszystkie zdjęcia produktu zostaną również usunięte.`}
        confirmText="Usuń produkt"
        cancelText="Anuluj"
        type="danger"
        isLoading={isDeleting}
      />
    </div>
  );
}