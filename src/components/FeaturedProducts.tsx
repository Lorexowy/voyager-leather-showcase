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
            {/* Products Grid - clean */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="group relative bg-white border border-gray-100 hover:border-gray-900 transition-all duration-500"
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  {/* Special badge for AS products - minimal */}
                  {product.category === 'as-aleksandra-sopel' && (
                    <div className="absolute top-4 left-4 z-10 bg-gray-900 text-white px-3 py-1 text-xs font-light uppercase tracking-wider">
                      AS Premium
                    </div>
                  )}

                  {/* Image placeholder - clean */}
                  <div className="aspect-square bg-gray-50 relative overflow-hidden">
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
                  </div>

                  {/* Content - clean typography */}
                  <div className="p-6">
                    <div className="mb-4">
                      <span className="text-xs text-gray-500 font-light uppercase tracking-wider">
                        {getCategoryDisplayName(product.category)}
                      </span>
                    </div>

                    <h3 className="text-lg font-light text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
                      {product.name}
                    </h3>
                    
                    <p className="text-sm text-gray-600 mb-6 leading-relaxed font-light line-clamp-2">
                      {product.description}
                    </p>

                    {/* Product details - minimal */}
                    <div className="space-y-2 text-xs text-gray-500 mb-8 font-light">
                      <div>
                        <span className="uppercase tracking-wider">Wymiary:</span> {formatDimensions(product.dimensions)}
                      </div>
                      <div>
                        <span className="uppercase tracking-wider">Kolory:</span> {product.availableColors.slice(0, 3).join(', ')}
                        {product.availableColors.length > 3 && ` +${product.availableColors.length - 3}`}
                      </div>
                    </div>

                    {/* CTA Button - minimal */}
                    <Link
                      href={`/kontakt?product=${product.id}`}
                      className="w-full inline-flex items-center justify-center py-3 bg-gray-900 text-white text-sm font-light hover:bg-gray-800 transition-all duration-300 group/btn uppercase tracking-wider"
                    >
                      <span>Zapytaj o produkt</span>
                      <ArrowRight className="w-3 h-3 ml-3 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
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