'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
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
  AlertCircle
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Product, ProductCategory, CATEGORIES } from '@/types';
import ConfirmDialog from '@/components/ConfirmDialog';

// Mock data - później zastąpimy danymi z Firebase
const mockProduct: Product = {
  id: '1',
  name: 'Elegancka Torebka Damska Premium',
  description: 'Wyjątkowa torebka wykonana ze skóry naturalnej najwyższej jakości. Charakteryzuje się eleganckim designem i funkcjonalnością, idealna na każdą okazję. Wykonana ręcznie przez doświadczonych rzemieślników z dbałością o każdy detal. Skóra pochodząca z etycznych źródeł, poddana specjalnej obróbce zapewniającej trwałość i miękkość.',
  category: 'torebki' as ProductCategory,
  mainImage: '/placeholder-bag.jpg',
  images: ['/placeholder-bag.jpg', '/placeholder-bag-2.jpg', '/placeholder-bag-3.jpg', '/placeholder-bag-4.jpg'],
  availableColors: ['Czarny', 'Brązowy', 'Beżowy', 'Bordowy'],
  dimensions: '30x25x12 cm',
  createdAt: new Date('2024-01-15'),
  updatedAt: new Date('2024-01-20'),
  isActive: true
};

export default function AdminViewProductPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const router = useRouter();
  const params = useParams();

  // Load product data
  useEffect(() => {
    const loadProduct = async () => {
      try {
        // Tutaj będzie pobieranie z Firebase
        await new Promise(resolve => setTimeout(resolve, 1000)); // Symulacja ładowania
        setProduct(mockProduct);
      } catch (error) {
        toast.error('Nie udało się załadować danych produktu');
        router.push('/admin/dashboard');
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [params.id, router]);

  const handleDeleteProduct = async () => {
    setIsDeleting(true);

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
      setIsDeleting(false);
    }
  };

  const toggleProductStatus = async () => {
    if (!product) return;

    try {
      // Tutaj będzie logika zmiany statusu w Firebase
      const newStatus = !product.isActive;
      console.log('Toggle product status:', product.id, newStatus);
      
      // Symulacja aktualizacji
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setProduct(prev => prev ? { ...prev, isActive: newStatus } : null);
      toast.success(`Produkt ${newStatus ? 'aktywowany' : 'deaktywowany'}`);
    } catch (error) {
      toast.error('Wystąpił błąd podczas zmiany statusu produktu');
    }
  };

  const getCategoryName = (categoryId: ProductCategory) => {
    return CATEGORIES.find(cat => cat.id === categoryId)?.name || categoryId;
  };

  if (isLoading) {
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
              <h1 className="text-lg font-medium text-gray-900">Podgląd produktu</h1>
            </div>

            <div className="flex items-center space-x-3">
              <Link
                href={`/produkty/szczegoly/${product.id}`}
                target="_blank"
                className="inline-flex items-center px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Zobacz na stronie
              </Link>
              
              <Link
                href={`/admin/products/edit/${product.id}`}
                className="inline-flex items-center px-3 py-2 text-sm bg-brown-700 text-white rounded-lg hover:bg-brown-800 transition-colors"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edytuj
              </Link>
              
              <button
                onClick={() => setShowDeleteDialog(true)}
                className="inline-flex items-center px-3 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
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
              <h2 className="text-lg font-medium text-gray-900 mb-6">Zdjęcia produktu</h2>
              
              {/* Main Image */}
              <div className="aspect-square bg-gray-100 rounded-lg mb-4 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <Package className="w-16 h-16 mx-auto mb-2" />
                    <p className="font-medium">Główne zdjęcie</p>
                    <p className="text-sm">Zdjęcie {currentImageIndex + 1} z {product.images.length}</p>
                  </div>
                </div>
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`aspect-square bg-gray-100 rounded-lg border-2 transition-all ${
                        currentImageIndex === index 
                          ? 'border-brown-500' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-gray-500 text-sm font-medium">
                          {index + 1}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">Informacje podstawowe</h2>
                <button
                  onClick={toggleProductStatus}
                  className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${
                    product.isActive 
                      ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                      : 'bg-red-100 text-red-800 hover:bg-red-200'
                  } transition-colors cursor-pointer`}
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
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    product.category === 'as-aleksandra-sopel' 
                      ? 'bg-accent-100 text-accent-800' 
                      : 'bg-brown-100 text-brown-800'
                  }`}>
                    {getCategoryName(product.category)}
                  </span>
                </div>

                <div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Product Specifications */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Specyfikacja</h2>
              
              <div className="space-y-4">
                {/* Dimensions */}
                <div className="flex items-start space-x-3">
                  <Ruler className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Wymiary</h4>
                    <p className="text-sm text-gray-600">{product.dimensions}</p>
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
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
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
                    <p className="text-sm text-gray-600">{product.images.length} zdjęć</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dates */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Historia</h2>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Utworzono</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {product.createdAt.toLocaleDateString('pl-PL')}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Ostatnia aktualizacja</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {product.updatedAt.toLocaleDateString('pl-PL')}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Szybkie akcje</h2>
              
              <div className="space-y-3">
                <Link
                  href={`/admin/products/edit/${product.id}`}
                  className="w-full inline-flex items-center justify-center px-4 py-2 bg-brown-700 text-white rounded-lg hover:bg-brown-800 transition-colors"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edytuj produkt
                </Link>
                
                <Link
                  href={`/produkty/szczegoly/${product.id}`}
                  target="_blank"
                  className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Zobacz na stronie
                </Link>
                
                <button
                  onClick={toggleProductStatus}
                  className={`w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg transition-colors ${
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
        message={`Czy na pewno chcesz usunąć produkt "${product.name}"? Tej operacji nie można cofnąć.`}
        confirmText="Usuń produkt"
        cancelText="Anuluj"
        type="danger"
        isLoading={isDeleting}
      />
    </div>
  );
}