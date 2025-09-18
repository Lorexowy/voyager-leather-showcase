'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductGallery from '@/components/ProductGallery';
import { ArrowLeft, ArrowRight, Heart, Share2, Ruler, Palette, RefreshCw, AlertCircle } from 'lucide-react';
import { Product, formatDimensions } from '@/types';
import { getProductById, getSimilarProducts } from '@/lib/products';

// Component for related product cards with proper image handling
function RelatedProductCard({ 
  product, 
  getCategoryDisplayName 
}: { 
  product: Product; 
  getCategoryDisplayName: (category: string) => string;
}) {
  const [imageError, setImageError] = useState(false);

  return (
    <Link
      href={`/produkty/szczegoly/${product.id}`}
      className="group bg-white border border-gray-100 overflow-hidden hover:border-gray-900 transition-all duration-300"
    >
      <div className="aspect-square bg-gray-50 relative overflow-hidden">
        {product.mainImage && !imageError ? (
          <img
            src={product.mainImage}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageError(true)}
            onLoad={() => setImageError(false)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-gray-300">
              <div className="w-12 h-12 mx-auto mb-3 border border-gray-200 flex items-center justify-center">
                <span className="text-lg font-light text-gray-400">
                  {product.name.charAt(0)}
                </span>
              </div>
              <p className="text-xs font-light text-gray-400 uppercase tracking-wider">Zdjęcie produktu</p>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="font-light text-gray-900 group-hover:text-gray-700 transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 mt-1 font-light">
          {getCategoryDisplayName(product.category)}
        </p>
      </div>
    </Link>
  );
}

export default function ProductDetailsPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const productId = params.id as string;
      
      setIsLoading(true);
      try {
        const productData = await getProductById(productId);
        
        if (productData) {
          setProduct(productData);
          
          // Pobierz podobne produkty
          const similar = await getSimilarProducts(productId, productData.category, 3);
          setRelatedProducts(similar);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.name || 'Produkt Voyager',
          text: product?.description || '',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Sharing failed:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        // Możesz dodać toast notification tutaj
      } catch (err) {
        console.log('Copy to clipboard failed:', err);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center py-20">
            <RefreshCw className="w-8 h-8 text-gray-400 animate-spin mx-auto mb-4" />
            <h1 className="text-xl font-light text-gray-900 mb-2">Ładowanie produktu...</h1>
            <p className="text-gray-600 font-light">Pobieramy szczegóły produktu.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center py-20">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h1 className="text-xl font-light text-gray-900 mb-2">Produkt nie znaleziony</h1>
            <p className="text-gray-600 mb-6 font-light">Nie udało się znaleźć produktu o podanym ID.</p>
            <Link
              href="/produkty"
              className="inline-flex items-center px-6 py-3 bg-gray-900 text-white font-light hover:bg-gray-800 transition-colors uppercase tracking-wider"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Powrót do produktów
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const getCategoryDisplayName = (category: string) => {
    switch (category) {
      case 'torebki': return 'Torebka';
      case 'plecaki': return 'Plecak';
      case 'paski': return 'Pasek';
      case 'personalizacja': return 'Personalizacja';
      case 'as-aleksandra-sopel': return 'AS Premium';
      default: return category;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb - minimal */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-12 font-light">
          <Link href="/" className="hover:text-gray-900 transition-colors">Strona główna</Link>
          <span>/</span>
          <Link href="/produkty" className="hover:text-gray-900 transition-colors">Produkty</Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        {/* Back button - minimal */}
        <Link 
          href="/produkty"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-12 font-light"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Powrót do produktów</span>
        </Link>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Product Gallery */}
          <div>
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            {/* Category badge - minimal */}
            <div>
              <span className="text-xs text-gray-500 font-light uppercase tracking-wider">
                {getCategoryDisplayName(product.category)}
              </span>
            </div>

            {/* Product name and actions */}
            <div>
              <div className="flex items-start justify-between mb-6">
                <h1 className="text-4xl font-light text-gray-900 leading-tight tracking-tight">
                  {product.name}
                </h1>
                
                <div className="flex items-center space-x-3 ml-6">
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`p-3 border transition-all duration-300 ${
                      isWishlisted 
                        ? 'border-gray-900 bg-gray-900 text-white' 
                        : 'border-gray-200 hover:border-gray-900 text-gray-600'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                  
                  <button
                    onClick={handleShare}
                    className="p-3 border border-gray-200 hover:border-gray-900 text-gray-600 transition-all duration-300"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <p className="text-gray-600 leading-relaxed font-light">
                {product.description}
              </p>
            </div>

            {/* Product specifications - minimal */}
            <div className="space-y-8">
              {/* Dimensions */}
              <div className="flex items-start space-x-4">
                <Ruler className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <h3 className="font-light text-gray-900 mb-2 uppercase tracking-wider">Wymiary</h3>
                  <p className="text-gray-600 font-light">{formatDimensions(product.dimensions)}</p>
                </div>
              </div>

              {/* Available colors */}
              <div className="flex items-start space-x-4">
                <Palette className="w-5 h-5 text-gray-400 mt-1" />
                <div className="flex-1">
                  <h3 className="font-light text-gray-900 mb-4 uppercase tracking-wider">Dostępne kolory</h3>
                  <div className="flex flex-wrap gap-4">
                    {product.availableColors.map((color, index) => {
                      // Mapowanie nazw kolorów na wartości CSS
                      const getColorValue = (colorName: string) => {
                        const colorMap: { [key: string]: string } = {
                          'Brązowy': '#8B4513',
                          'Czarny': '#000000',
                          'Beżowy': '#F5F5DC',
                          'Granatowy': '#191970',
                          'Czerwony': '#DC143C',
                          'Bordowy': '#800020',
                          'Zielony': '#228B22',
                          'Niebieski': '#4169E1',
                          'Szary': '#808080',
                          'Biały': '#FFFFFF',
                          'Kremowy': '#FFFDD0',
                          'Camel': '#C19A6B',
                          'Koniakowy': '#B87333',
                          'Khaki': '#C3B091',
                          'Oliwkowy': '#808000',
                          'Jasnobrązowy': '#D2691E',
                          'Ciemnobrązowy': '#654321',
                          'Mahoniowy': '#C04000',
                          'Tan': '#D2B48C',
                          'Orzechowy': '#8B4513'
                        };
                        return colorMap[colorName] || '#6B7280'; // fallback to gray
                      };

                      return (
                        <div key={index} className="flex items-center space-x-2">
                          <div 
                            className="w-3 h-3 rounded-full border border-gray-200 flex-shrink-0"
                            style={{ backgroundColor: getColorValue(color) }}
                          />
                          <span className="text-gray-600 font-light">{color}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons - minimal */}
            <div className="space-y-4 pt-8 border-t border-gray-100">
              <Link
                href={`/kontakt?product=${product.id}`}
                className="w-full inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white font-light hover:bg-gray-800 transition-all duration-300 group uppercase tracking-wider"
              >
                <span>Zapytaj o ten produkt</span>
                <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href="/kontakt"
                className="w-full inline-flex items-center justify-center px-8 py-4 border border-gray-900 text-gray-900 font-light hover:bg-gray-900 hover:text-white transition-all duration-300 uppercase tracking-wider"
              >
                Skontaktuj się z nami
              </Link>
            </div>

            {/* Additional info - minimal */}
            <div className="bg-gray-50 p-6 text-sm text-gray-600 font-light">
              <h4 className="font-medium text-gray-900 mb-4 uppercase tracking-wider">Informacje dodatkowe</h4>
              <ul className="space-y-2">
                <li>• Wykonane ze skóry naturalnej najwyższej jakości</li>
                <li>• Ręczne wykonanie przez doświadczonych rzemieślników</li>
                <li>• Możliwość personalizacji na specjalne zamówienie</li>
                <li>• Odpowiedź na zapytania w ciągu 24 godzin</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products - minimal */}
        {relatedProducts.length > 0 && (
          <div className="mt-24">
            <h2 className="text-3xl font-light text-gray-900 mb-12 text-center tracking-tight">
              Podobne Produkty
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <RelatedProductCard 
                  key={relatedProduct.id} 
                  product={relatedProduct} 
                  getCategoryDisplayName={getCategoryDisplayName}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}