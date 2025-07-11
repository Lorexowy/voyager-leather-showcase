'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Eye, RefreshCw } from 'lucide-react';
import { Product, formatDimensions } from '@/types';
import { getFeaturedProducts } from '@/lib/products';

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      setIsLoading(true);
      try {
        const featuredProducts = await getFeaturedProducts(4);
        setProducts(featuredProducts);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

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

  const getColorHex = (colorName: string) => {
    const colorMap: { [key: string]: string } = {
      'Czarny': '#000000',
      'Biały': '#ffffff',
      'Czerwony': '#dc2626',
      'Niebieski': '#2563eb',
      'Zielony': '#16a34a',
      'Żółty': '#eab308',
      'Różowy': '#ec4899',
      'Fioletowy': '#9333ea',
      'Pomarańczowy': '#ea580c',
      'Szary': '#6b7280',
      'Brązowy': '#92400e',
      'Granatowy': '#1e3a8a',
      'Bordowy': '#991b1b',
      'Beżowy': '#d4af9a',
      'Kremowy': '#fef3e2'
    };
    return colorMap[colorName] || '#9ca3af';
  };

  const formatDimensionsNice = (dimensions: string) => {
    // Konwertuje "40 x 30 cm" na ładniejszy format
    return dimensions.replace(/(\d+)\s*x\s*(\d+)\s*cm/i, '$1×$2 cm');
  };

  const handleImageError = (productId: string) => {
    setImageErrors(prev => ({ ...prev, [productId]: true }));
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - minimalistyczny */}
        <div className="text-center mb-20">
          <h2 className="text-4xl font-light text-gray-900 mb-6 tracking-tight">
            Wyróżnione Produkty
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            Poznaj nasze najpopularniejsze produkty, które cieszą się 
            największym uznaniem wśród klientów.
          </p>
        </div>

        {/* Loading state */}
        {isLoading ? (
          <div className="text-center py-16">
            <RefreshCw className="w-8 h-8 text-gray-400 animate-spin mx-auto mb-4" />
            <p className="text-gray-600 font-light">Ładowanie wyróżnionych produktów...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 border border-gray-200 flex items-center justify-center mx-auto mb-6">
              <Eye className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-xl font-light text-gray-900 mb-4">
              Brak wyróżnionych produktów
            </h3>
            <p className="text-gray-600 font-light mb-8">
              Obecnie nie mamy produktów do wyświetlenia. Wkrótce pojawią się nowe pozycje.
            </p>
            <Link 
              href="/produkty"
              className="inline-flex items-center px-8 py-4 bg-gray-900 text-white font-light hover:bg-gray-800 transition-colors uppercase tracking-wider"
            >
              Zobacz wszystkie produkty
            </Link>
          </div>
        ) : (
          <>
            {/* Products Grid - ZAKTUALIZOWANE */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="group relative bg-white border border-gray-100 hover:border-gray-200 transition-all duration-500 h-full flex flex-col"
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  {/* Special badge for AS products - minimal */}
                  {product.category === 'as-aleksandra-sopel' && (
                    <div className="absolute top-4 left-4 z-10 bg-gray-900 text-white px-3 py-1 text-xs font-light uppercase tracking-wider">
                      AS Premium
                    </div>
                  )}

                  {/* Image - ZAKTUALIZOWANE DO PRAWDZIWYCH OBRAZÓW */}
                  <div className="aspect-square bg-gray-50 relative overflow-hidden">
                    {product.mainImage && !imageErrors[product.id] ? (
                      <img
                        src={product.mainImage}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={() => handleImageError(product.id)}
                      />
                    ) : (
                      // Fallback placeholder
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-gray-300">
                          <div className="w-16 h-16 mx-auto mb-3 border border-gray-200 flex items-center justify-center">
                            <span className="text-xl font-light text-gray-400">
                              {product.name.charAt(0)}
                            </span>
                          </div>
                          <p className="text-xs font-light text-gray-400 uppercase tracking-wider">Zdjęcie produktu</p>
                        </div>
                      </div>
                    )}

                    {/* Hover overlay - subtle */}
                    <div className={`absolute inset-0 bg-black/5 transition-opacity duration-500 ${
                      hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Link
                          href={`/produkty/szczegoly/${product.id}`}
                          className="p-3 bg-white border border-gray-200 hover:border-gray-900 transition-all duration-300"
                        >
                          <Eye className="w-4 h-4 text-gray-700" />
                        </Link>
                      </div>
                    </div>

                    {/* Multiple images indicator - minimalistyczny */}
                    {product.images.length > 1 && (
                      <div className="absolute bottom-4 left-4 flex space-x-1">
                        {product.images.slice(0, 3).map((_, index) => (
                          <div 
                            key={index}
                            className="w-1.5 h-1.5 bg-white/70 rounded-full"
                          />
                        ))}
                        {product.images.length > 3 && (
                          <div className="text-white/70 text-xs ml-2 font-light">+{product.images.length - 3}</div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Content - clean typography */}
                  <div className="p-4 sm:p-6 flex-1 flex flex-col">
                    <div className="mb-3 sm:mb-4">
                      <span className="text-xs text-gray-500 font-light uppercase tracking-wider">
                        {getCategoryDisplayName(product.category)}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-light text-gray-900 mb-4 sm:mb-6 group-hover:text-gray-700 transition-colors flex-1">
                      {product.name}
                    </h3>

                    {/* Product details - minimal */}
                    <div className="space-y-3 text-xs text-gray-500 mb-6 sm:mb-8 font-light">
                      <div className="flex items-center gap-2">
                        <span className="uppercase tracking-wider text-gray-400">Wymiary:</span> 
                        <span className="text-gray-600 font-medium">{formatDimensionsNice(formatDimensions(product.dimensions))}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="uppercase tracking-wider text-gray-400">Kolory:</span>
                        <div className="flex gap-1.5">
                          {product.availableColors.slice(0, 4).map((color, index) => (
                            <div 
                              key={index}
                              className="w-4 h-4 rounded-full border border-gray-200 shadow-sm"
                              style={{ backgroundColor: getColorHex(color) }}
                              title={color}
                            />
                          ))}
                          {product.availableColors.length > 4 && (
                            <div className="w-4 h-4 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center">
                              <span className="text-[8px] text-gray-500 font-medium">+{product.availableColors.length - 4}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action buttons - minimal */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-auto">
                      <Link
                        href={`/produkty/szczegoly/${product.id}`}
                        className="flex-1 text-center py-2.5 sm:py-3 border border-gray-200 text-gray-700 text-xs sm:text-sm font-light hover:border-gray-900 hover:text-gray-900 transition-all duration-300 uppercase tracking-wider"
                      >
                        Zobacz szczegóły
                      </Link>
                      
                      <Link
                        href={`/kontakt?product=${product.id}`}
                        className="flex-1 text-center py-2.5 sm:py-3 bg-gray-900 text-white text-xs sm:text-sm font-light hover:bg-gray-800 transition-all duration-300 group/btn uppercase tracking-wider flex items-center justify-center"
                      >
                        <span>Zapytaj</span>
                        <ArrowRight className="w-3 h-3 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom CTA - minimal */}
            <div className="text-center mt-20">
              <Link 
                href="/produkty"
                className="inline-flex items-center px-8 py-4 border border-gray-900 text-gray-900 font-light hover:bg-gray-900 hover:text-white transition-all duration-300 group uppercase tracking-wider"
              >
                <span>Zobacz wszystkie produkty</span>
                <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}