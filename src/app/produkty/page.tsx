'use client';

import { useState, useEffect, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import ProductFilters from '@/components/ProductFilters';
import { Search, RefreshCw } from 'lucide-react';
import { FilterOptions, Product } from '@/types';
import { getActiveProducts } from '@/lib/products';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({});

  // Załaduj produkty przy pierwszym renderze
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const activeProducts = await getActiveProducts();
        setProducts(activeProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Search filter
      if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !product.description.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Category filter
      if (filters.category && product.category !== filters.category) {
        return false;
      }

      // Color filter
      if (filters.colors && filters.colors.length > 0) {
        const hasMatchingColor = filters.colors.some(color => 
          product.availableColors.includes(color)
        );
        if (!hasMatchingColor) return false;
      }

      return true;
    });
  }, [products, searchTerm, filters]);

  const refreshProducts = async () => {
    setIsLoading(true);
    try {
      const activeProducts = await getActiveProducts();
      setProducts(activeProducts);
    } catch (error) {
      console.error('Error refreshing products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Page Header - minimal */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-light text-gray-900 mb-6 tracking-tight">
            Nasze Produkty
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            Odkryj pełną kolekcję naszych produktów ze skóry naturalnej. 
            Każdy element wykonany z najwyższą starannością.
          </p>
        </div>

        {/* Search Bar - minimal */}
        <div className="relative max-w-md mx-auto mb-16">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Szukaj produktów..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border border-gray-200 focus:border-gray-900 focus:outline-none bg-white font-light transition-colors"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Filters Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <ProductFilters 
              filters={filters}
              onFiltersChange={setFilters}
              totalProducts={filteredProducts.length}
            />
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Loading state */}
            {isLoading ? (
              <div className="text-center py-20">
                <RefreshCw className="w-8 h-8 text-gray-400 animate-spin mx-auto mb-4" />
                <h3 className="text-xl font-light text-gray-900 mb-2">
                  Ładowanie produktów...
                </h3>
                <p className="text-gray-600 font-light">
                  Proszę czekać, pobieramy najnowsze produkty.
                </p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-20 h-20 border border-gray-200 flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="text-xl font-light text-gray-900 mb-3">
                  {products.length === 0 ? 'Brak produktów' : 'Nie znaleziono produktów'}
                </h3>
                <p className="text-gray-600 font-light mb-8">
                  {products.length === 0 
                    ? 'Obecnie nie mamy produktów w ofercie. Wkrótce pojawią się nowe pozycje.'
                    : 'Spróbuj zmienić kryteria wyszukiwania lub usuń niektóre filtry.'
                  }
                </p>
                {products.length > 0 && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setFilters({});
                    }}
                    className="px-6 py-3 bg-gray-900 text-white font-light hover:bg-gray-800 transition-colors uppercase tracking-wider"
                  >
                    Wyczyść filtry
                  </button>
                )}
                {products.length === 0 && (
                  <button
                    onClick={refreshProducts}
                    className="inline-flex items-center px-6 py-3 bg-gray-900 text-white font-light hover:bg-gray-800 transition-colors uppercase tracking-wider"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Odśwież
                  </button>
                )}
              </div>
            ) : (
              <>
                {/* Results count */}
                <div className="flex justify-between items-center mb-8">
                  <div className="text-gray-600 font-light">
                    Znaleziono <span className="font-medium text-gray-900">{filteredProducts.length}</span> produktów
                  </div>
                  
                  <button
                    onClick={refreshProducts}
                    disabled={isLoading}
                    className="inline-flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors font-light"
                  >
                    <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                    Odśwież
                  </button>
                </div>

                {/* Products Grid */}
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Bottom spacing */}
                <div className="mt-16 text-center">
                  <p className="text-gray-500 text-sm font-light">
                    Pokazano wszystkie dostępne produkty
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}