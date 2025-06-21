'use client';

import { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import ProductFilters from '@/components/ProductFilters';
import { ArrowLeft, Search, Crown, Sparkles } from 'lucide-react';
import { FilterOptions, ProductCategory, CATEGORIES, Product } from '@/types';

// Mock data - później zastąpimy danymi z Firebase
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Elegancka Torebka Damska',
    description: 'Klasyczna torebka wykonana ze skóry naturalnej najwyższej jakości.',
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
  },
  {
    id: '7',
    name: 'Elegancka Kopertówka',
    description: 'Stylowa kopertówka na wieczorne wyjścia.',
    category: 'torebki' as ProductCategory,
    mainImage: '/placeholder-clutch.jpg',
    images: ['/placeholder-clutch.jpg'],
    availableColors: ['Czarny', 'Złoty', 'Srebrny'],
    dimensions: '28x15x3 cm',
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true
  },
  {
    id: '2',
    name: 'Biznesowy Plecak Skórzany',
    description: 'Funkcjonalny plecak idealny do pracy, wykonany z miękkiej skóry.',
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
    id: '8',
    name: 'Sportowy Plecak Skórzany',
    description: 'Stylowy plecak na co dzień z wieloma kieszeniami.',
    category: 'plecaki' as ProductCategory,
    mainImage: '/placeholder-sport-backpack.jpg',
    images: ['/placeholder-sport-backpack.jpg'],
    availableColors: ['Czarny', 'Brązowy', 'Granatowy'],
    dimensions: '35x28x12 cm',
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true
  },
  {
    id: '3',
    name: 'Klasyczny Pasek Męski',
    description: 'Elegancki pasek z naturalnej skóry z metalową klamrą.',
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
    id: '9',
    name: 'Damski Pasek Elegancki',
    description: 'Delikatny pasek damski z ozdobną klamrą.',
    category: 'paski' as ProductCategory,
    mainImage: '/placeholder-women-belt.jpg',
    images: ['/placeholder-women-belt.jpg'],
    availableColors: ['Czarny', 'Brązowy', 'Czerwony'],
    dimensions: 'Szerokość: 2.5 cm',
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
    id: '10',
    name: 'Personalizowane Etui na Karty',
    description: 'Eleganckie etui na wizytówki z możliwością grawerowania.',
    category: 'personalizacja' as ProductCategory,
    mainImage: '/placeholder-card-holder.jpg',
    images: ['/placeholder-card-holder.jpg'],
    availableColors: ['Czarny', 'Brązowy'],
    dimensions: '11x7x1 cm',
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true
  },
  {
    id: '4',
    name: 'AS | Premium Portfel',
    description: 'Ekskluzywny portfel z linii Aleksandra Sopel - najwyższa jakość wykonania.',
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
    id: '11',
    name: 'AS | Ekskluzywna Torebka',
    description: 'Luksusowa torebka z najwyższej jakości skóry - kolekcja AS.',
    category: 'as-aleksandra-sopel' as ProductCategory,
    mainImage: '/placeholder-as-bag.jpg',
    images: ['/placeholder-as-bag.jpg'],
    availableColors: ['Czarny', 'Bordowy', 'Koniakowy'],
    dimensions: '32x28x14 cm',
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true
  }
];

export default function CategoryPage() {
  const params = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({});
  
  const categorySlug = params.category as string;
  
  // Znajdź kategorię na podstawie slug
  const category = CATEGORIES.find(cat => cat.slug === categorySlug);
  
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
    let products = mockProducts;
    
    if (!filters.category || filters.category === category.id) {
      products = products.filter(product => product.category === category.id);
    } else {
      products = products.filter(product => product.category === filters.category);
    }
    
    if (searchTerm) {
      products = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.colors && filters.colors.length > 0) {
      products = products.filter(product => 
        filters.colors!.some(color => product.availableColors.includes(color))
      );
    }

    return products;
  }, [mockProducts, searchTerm, filters, category.id]);

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
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-20 h-20 border border-gray-200 flex items-center justify-center mx-auto mb-8">
                  <Search className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="text-xl font-light text-gray-900 mb-4">
                  Nie znaleziono produktów
                </h3>
                <p className="text-gray-600 mb-8 font-light">
                  Nie mamy produktów pasujących do wybranych kryteriów.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilters({});
                  }}
                  className="px-8 py-4 bg-gray-900 text-white font-light hover:bg-gray-800 transition-colors uppercase tracking-wider"
                >
                  Wyczyść filtry
                </button>
              </div>
            ) : (
              <>
                {/* Results count - minimal */}
                <div className="flex justify-between items-center mb-8">
                  <div className="text-gray-600 font-light">
                    Znaleziono <span className="font-medium text-gray-900">{filteredProducts.length}</span> produktów
                    {filters.category && filters.category !== category.id && (
                      <span className="ml-2 text-sm">
                        w kategorii: {CATEGORIES.find(c => c.id === filters.category)?.name}
                      </span>
                    )}
                  </div>
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