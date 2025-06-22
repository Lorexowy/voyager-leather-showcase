'use client';

import { useState, useMemo, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import ProductFilters from '@/components/ProductFilters';
import { ArrowLeft, Search, Crown, Sparkles, RefreshCw } from 'lucide-react';
import { FilterOptions, ProductCategory, CATEGORIES, Product } from '@/types';
import { getProductsByCategory } from '@/lib/products';

export default function CategoryPage() {
  const params = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({});
  
  const categorySlug = params.category as string;
  
  // Znajdź kategorię na podstawie slug
  const category = CATEGORIES.find(cat => cat.slug === categorySlug);
  
  // Załaduj produkty dla kategorii
  useEffect(() => {
    const fetchProducts = async () => {
      if (!category) return;
      
      setIsLoading(true);
      try {
        const categoryProducts = await getProductsByCategory(category.id);
        setProducts(categoryProducts);
      } catch (error) {
        console.error('Error fetching category products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  if (!category) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center py-20">
            <h1 className="text-4xl font-light text-gray-900 mb-6 tracking-tight">
              Kategoria nie znaleziona
            </h1>
            <p className="text-gray-600 mb-12 font-light">
              Przepraszamy, taka kategoria nie istnieje.
            </p>
            <Link 
              href="/produkty"
              className="inline-flex items-center px-8 py-4 bg-gray-900 text-white font-light hover:bg-gray-800 transition-colors uppercase tracking-wider"
            >
              <ArrowLeft className="w-4 h-4 mr-3" />
              Powrót do produktów
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Filtruj produkty
  const filteredProducts = useMemo(() => {
    let filtered = products;
    
    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.colors && filters.colors.length > 0) {
      filtered = filtered.filter(product => 
        filters.colors!.some(color => product.availableColors.includes(color))
      );
    }

    return filtered;
  }, [products, searchTerm, filters]);

  const refreshProducts = async () => {
    if (!category) return;
    
    setIsLoading(true);
    try {
      const categoryProducts = await getProductsByCategory(category.id);
      setProducts(categoryProducts);
    } catch (error) {
      console.error('Error refreshing products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const isSpecialCategory = category.id === 'as-aleksandra-sopel';

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Breadcrumb - minimal */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-12 font-light">
          <Link href="/" className="hover:text-gray-900 transition-colors">Strona główna</Link>
          <span>/</span>
          <Link href="/produkty" className="hover:text-gray-900 transition-colors">Produkty</Link>
          <span>/</span>
          <span className="text-gray-900">{category.name}</span>
        </nav>

        {/* Back button - minimal */}
        <Link 
          href="/produkty"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-16 font-light"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Powrót do wszystkich produktów</span>
        </Link>

        {/* Category Header - minimal */}
        <div className="mb-20">
          <div className="flex items-center mb-8">
            {isSpecialCategory ? (
              <Crown className="w-8 h-8 text-gray-600 mr-4" />
            ) : category.id === 'personalizacja' ? (
              <Sparkles className="w-8 h-8 text-gray-600 mr-4" />
            ) : (
              <div className="w-8 h-8 border border-gray-300 flex items-center justify-center mr-4">
                <span className="text-gray-600 font-light text-lg">
                  {category.name.charAt(0)}
                </span>
              </div>
            )}
            <h1 className="text-5xl font-light text-gray-900 tracking-tight">
              {category.name}
            </h1>
            {isSpecialCategory && (
              <span className="ml-6 px-4 py-2 bg-gray-900 text-white text-sm font-light uppercase tracking-wider">
                Premium
              </span>
            )}
          </div>
          
          <p className="text-xl text-gray-600 max-w-3xl font-light leading-relaxed">
            {category.description}
          </p>

          {isSpecialCategory && (
            <div className="mt-6 text-gray-600 text-sm font-light">
              <p>
                Kolekcja premium wykonana z najwyższej jakości skóry naturalnej
              </p>
            </div>
          )}
        </div>

        {/* Search Bar - minimal */}
        <div className="relative max-w-md mx-auto mb-20">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={`Szukaj w kategorii ${category.name.toLowerCase()}...`}
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
              hideCategories={true}
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
                  Pobieramy produkty z kategorii {category.name.toLowerCase()}.
                </p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-20 h-20 border border-gray-200 flex items-center justify-center mx-auto mb-8">
                  <Search className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="text-xl font-light text-gray-900 mb-4">
                  {products.length === 0 ? 'Brak produktów w tej kategorii' : 'Nie znaleziono produktów'}
                </h3>
                <p className="text-gray-600 mb-8 font-light">
                  {products.length === 0 
                    ? `Obecnie nie mamy produktów w kategorii ${category.name.toLowerCase()}. Wkrótce pojawią się nowe pozycje.`
                    : 'Nie mamy produktów pasujących do wybranych kryteriów.'
                  }
                </p>
                {products.length > 0 && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setFilters({});
                    }}
                    className="px-8 py-4 bg-gray-900 text-white font-light hover:bg-gray-800 transition-colors uppercase tracking-wider"
                  >
                    Wyczyść filtry
                  </button>
                )}
                {products.length === 0 && (
                  <button
                    onClick={refreshProducts}
                    className="inline-flex items-center px-8 py-4 bg-gray-900 text-white font-light hover:bg-gray-800 transition-colors uppercase tracking-wider"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Odśwież
                  </button>
                )}
              </div>
            ) : (
              <>
                {/* Results count - minimal */}
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

                {/* Bottom note */}
                {filteredProducts.length > 0 && (
                  <div className="text-center mt-16">
                    <p className="text-gray-500 text-sm font-light">
                      Pokazano wszystkie dostępne produkty
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Category CTA - minimal */}
        <div className="mt-32 bg-gray-900 text-white p-16 text-center">
          <h2 className="text-3xl font-light mb-6 tracking-tight">
            {isSpecialCategory 
              ? 'Zainteresowany kolekcją AS?' 
              : `Nie znalazłeś idealnego produktu?`
            }
          </h2>
          <p className="text-gray-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            {isSpecialCategory 
              ? 'Skontaktuj się z nami, aby dowiedzieć się więcej o naszej ekskluzywnej linii produktów premium.'
              : 'Skontaktuj się z nami - możemy stworzyć produkt specjalnie dla Ciebie lub pomóc w doborze idealnego rozwiązania.'
            }
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/kontakt"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-light hover:bg-gray-100 transition-all duration-300 uppercase tracking-wider"
            >
              Skontaktuj się z nami
            </Link>
            
            <Link
              href="/produkty"
              className="inline-flex items-center justify-center px-8 py-4 border border-white text-white font-light hover:bg-white hover:text-gray-900 transition-all duration-300 uppercase tracking-wider"
            >
              Zobacz wszystkie produkty
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}