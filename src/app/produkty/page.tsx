'use client';

import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import ProductFilters from '@/components/ProductFilters';
import { Search } from 'lucide-react';
import { FilterOptions, ProductCategory } from '@/types';

// Mock data - później zastąpimy danymi z Firebase
const mockProducts = [
  {
    id: '1',
    name: 'Elegancka Torebka Damska',
    description: 'Klasyczna torebka wykonana ze skóry naturalnej najwyższej jakości. Idealna na każdą okazję.',
    category: 'torebki' as ProductCategory,
    mainImage: '/placeholder-bag.jpg',
    images: ['/placeholder-bag.jpg', '/placeholder-bag-2.jpg'],
    availableColors: ['Czarny', 'Brązowy', 'Beżowy'],
    dimensions: '30x25x12 cm',
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true
  },
  {
    id: '2',
    name: 'Biznesowy Plecak Skórzany',
    description: 'Funkcjonalny plecak idealny do pracy, wykonany z miękkiej skóry naturalnej.',
    category: 'plecaki' as ProductCategory,
    mainImage: '/placeholder-backpack.jpg',
    images: ['/placeholder-backpack.jpg'],
    availableColors: ['Czarny', 'Brązowy'],
    dimensions: '40x30x15 cm',
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true
  },
  {
    id: '3',
    name: 'Klasyczny Pasek Męski',
    description: 'Elegancki pasek z naturalnej skóry z metalową klamrą najwyższej jakości.',
    category: 'paski' as ProductCategory,
    mainImage: '/placeholder-belt.jpg',
    images: ['/placeholder-belt.jpg'],
    availableColors: ['Czarny', 'Brązowy', 'Koniakowy'],
    dimensions: 'Szerokość: 3.5 cm',
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true
  },
  {
    id: '4',
    name: 'AS | Premium Portfel',
    description: 'Ekskluzywny portfel z linii Aleksandra Sopel - najwyższa jakość wykonania i materiałów.',
    category: 'as-aleksandra-sopel' as ProductCategory,
    mainImage: '/placeholder-wallet.jpg',
    images: ['/placeholder-wallet.jpg'],
    availableColors: ['Czarny', 'Bordowy'],
    dimensions: '11x9x2 cm',
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true
  },
  {
    id: '5',
    name: 'Personalizowany Organizer',
    description: 'Elegancki organizer biurowy z możliwością grawerowania logo firmy.',
    category: 'personalizacja' as ProductCategory,
    mainImage: '/placeholder-organizer.jpg',
    images: ['/placeholder-organizer.jpg'],
    availableColors: ['Czarny', 'Brązowy', 'Koniakowy'],
    dimensions: '25x20x5 cm',
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true
  },
  {
    id: '6',
    name: 'Damska Torebka Crossbody',
    description: 'Mała, praktyczna torebka na ramię, idealna na co dzień.',
    category: 'torebki' as ProductCategory,
    mainImage: '/placeholder-crossbody.jpg',
    images: ['/placeholder-crossbody.jpg'],
    availableColors: ['Czarny', 'Beżowy', 'Czerwony'],
    dimensions: '25x18x8 cm',
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true
  }
];

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({});

  const filteredProducts = useMemo(() => {
    return mockProducts.filter(product => {
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
  }, [searchTerm, filters]);

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
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-20 h-20 border border-gray-200 flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="text-xl font-light text-gray-900 mb-3">
                  Nie znaleziono produktów
                </h3>
                <p className="text-gray-600 font-light mb-8">
                  Spróbuj zmienić kryteria wyszukiwania lub usuń niektóre filtry.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilters({});
                  }}
                  className="px-6 py-3 bg-gray-900 text-white font-light hover:bg-gray-800 transition-colors uppercase tracking-wider"
                >
                  Wyczyść filtry
                </button>
              </div>
            ) : (
              <>
                {/* Results count */}
                <div className="flex justify-between items-center mb-8">
                  <div className="text-gray-600 font-light">
                    Znaleziono <span className="font-medium text-gray-900">{filteredProducts.length}</span> produktów
                  </div>
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