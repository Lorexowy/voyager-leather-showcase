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
      <div className="min-h-screen bg-gradient-to-b from-primary-25 to-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold text-brown-900 mb-4">Kategoria nie znaleziona</h1>
            <p className="text-brown-600 mb-8">Przepraszamy, taka kategoria nie istnieje.</p>
            <Link 
              href="/produkty"
              className="inline-flex items-center px-6 py-3 bg-brown-700 text-white rounded-lg hover:bg-brown-800 transition-colors"
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

  // Filtruj produkty - najpierw według kategorii, potem według filtrów
  const filteredProducts = useMemo(() => {
    // Zaczynamy od wszystkich produktów
    let products = mockProducts;
    
    // Jeśli nie ma filtra kategorii lub jest ustawiony na obecną kategorię, filtruj tylko po kategorii z URL
    if (!filters.category || filters.category === category.id) {
      products = products.filter(product => product.category === category.id);
    } else {
      // Jeśli użytkownik wybrał inną kategorię w filtrach, pokaż produkty z tej kategorii
      products = products.filter(product => product.category === filters.category);
    }
    
    // Zastosuj filtry wyszukiwania
    if (searchTerm) {
      products = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Zastosuj filtry kolorów
    if (filters.colors && filters.colors.length > 0) {
      products = products.filter(product => 
        filters.colors!.some(color => product.availableColors.includes(color))
      );
    }

    return products;
  }, [mockProducts, searchTerm, filters, category.id]);

  const isSpecialCategory = category.id === 'as-aleksandra-sopel';

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-25 to-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-brown-600 mb-8">
          <Link href="/" className="hover:text-brown-800 transition-colors">Strona główna</Link>
          <span>/</span>
          <Link href="/produkty" className="hover:text-brown-800 transition-colors">Produkty</Link>
          <span>/</span>
          <span className="text-brown-800 font-medium">{category.name}</span>
        </nav>

        {/* Back button */}
        <Link 
          href="/produkty"
          className="inline-flex items-center space-x-2 text-brown-600 hover:text-brown-800 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Powrót do wszystkich produktów</span>
        </Link>

        {/* Category Header */}
        <div className={`relative overflow-hidden rounded-2xl p-8 mb-12 ${
          isSpecialCategory 
            ? 'bg-gradient-to-r from-accent-100 to-accent-200 border-2 border-accent-300' 
            : 'bg-gradient-to-r from-primary-100 to-primary-200'
        }`}>
          {/* Special badge for AS line */}
          {isSpecialCategory && (
            <div className="absolute top-6 right-6 bg-accent-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
              <Crown className="w-4 h-4 mr-2" />
              Premium Line
            </div>
          )}
          
          <div className="flex items-center mb-4">
            {isSpecialCategory ? (
              <Crown className="w-8 h-8 text-accent-700 mr-3" />
            ) : category.id === 'personalizacja' ? (
              <Sparkles className="w-8 h-8 text-brown-700 mr-3" />
            ) : (
              <div className="w-8 h-8 bg-brown-700 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">
                  {category.name.charAt(0)}
                </span>
              </div>
            )}
            <h1 className={`text-3xl font-serif font-bold ${
              isSpecialCategory ? 'text-accent-900' : 'text-brown-900'
            }`}>
              {category.name}
            </h1>
          </div>
          
          <p className={`text-lg leading-relaxed max-w-3xl ${
            isSpecialCategory ? 'text-accent-800' : 'text-brown-700'
          }`}>
            {category.description}
          </p>

          {isSpecialCategory && (
            <div className="mt-4 text-accent-700 text-sm">
              <p className="font-medium">
                ✨ Kolekcja premium wykonana z najwyższej jakości skóry naturalnej
              </p>
            </div>
          )}
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-brown-400" />
          <input
            type="text"
            placeholder={`Szukaj w kategorii ${category.name.toLowerCase()}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-brown-200 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-transparent bg-white"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
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
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-brown-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-12 h-12 text-brown-400" />
                </div>
                <h3 className="text-xl font-bold text-brown-900 mb-2">
                  Nie znaleziono produktów
                </h3>
                <p className="text-brown-600 mb-6">
                  Nie mamy produktów pasujących do wybranych kryteriów.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilters({});
                  }}
                  className="inline-flex items-center px-6 py-3 bg-brown-700 text-white rounded-lg hover:bg-brown-800 transition-colors"
                >
                  Wyczyść filtry
                </button>
              </div>
            ) : (
              <>
                {/* Results count */}
                <div className="flex justify-between items-center mb-6">
                  <div className="text-brown-600">
                    <span className="font-medium">{filteredProducts.length}</span> produktów
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

                {/* Load more or pagination could go here */}
                {filteredProducts.length > 0 && (
                  <div className="text-center mt-12">
                    <p className="text-brown-600 text-sm">
                      Pokazano wszystkie dostępne produkty
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Category-specific CTA */}
        <div className={`mt-16 rounded-2xl p-8 text-center ${
          isSpecialCategory 
            ? 'bg-accent-900 text-white' 
            : 'bg-brown-900 text-white'
        }`}>
          <h2 className="text-2xl font-serif font-bold mb-4">
            {isSpecialCategory 
              ? 'Zainteresowany kolekcją AS | Aleksandra Sopel?' 
              : `Nie znalazłeś idealnego produktu w kategorii ${category.name.toLowerCase()}?`
            }
          </h2>
          <p className={`mb-8 max-w-2xl mx-auto ${
            isSpecialCategory ? 'text-accent-100' : 'text-brown-200'
          }`}>
            {isSpecialCategory 
              ? 'Skontaktuj się z nami, aby dowiedzieć się więcej o naszej ekskluzywnej linii produktów premium.'
              : 'Skontaktuj się z nami - możemy stworzyć produkt specjalnie dla Ciebie lub pomóc w doborze idealnego rozwiązania.'
            }
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/kontakt"
              className={`inline-flex items-center justify-center px-8 py-4 font-medium rounded-lg transition-all duration-300 ${
                isSpecialCategory 
                  ? 'bg-accent-100 text-accent-900 hover:bg-accent-200' 
                  : 'bg-primary-600 text-brown-900 hover:bg-primary-500'
              }`}
            >
              Skontaktuj się z nami
            </Link>
            
            <Link
              href="/produkty"
              className={`inline-flex items-center justify-center px-8 py-4 border-2 font-medium rounded-lg transition-all duration-300 ${
                isSpecialCategory 
                  ? 'border-accent-400 text-accent-400 hover:bg-accent-400 hover:text-accent-900' 
                  : 'border-primary-400 text-primary-400 hover:bg-primary-400 hover:text-brown-900'
              }`}
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