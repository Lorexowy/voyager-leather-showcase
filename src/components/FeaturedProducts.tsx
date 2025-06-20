'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Heart, Eye } from 'lucide-react';

// Mock data - później zastąpimy danymi z Firebase
const mockProducts = [
  {
    id: '1',
    name: 'Elegancka Torebka Damska',
    description: 'Klasyczna torebka wykonana ze skóry naturalnej najwyższej jakości.',
    category: 'torebki',
    mainImage: '/placeholder-bag.jpg',
    availableColors: ['Czarny', 'Brązowy', 'Beżowy'],
    dimensions: '30x25x12 cm'
  },
  {
    id: '2',
    name: 'Biznesowy Plecak Skórzany',
    description: 'Funkcjonalny plecak idealny do pracy, wykonany z miękkiej skóry.',
    category: 'plecaki',
    mainImage: '/placeholder-backpack.jpg',
    availableColors: ['Czarny', 'Brązowy'],
    dimensions: '40x30x15 cm'
  },
  {
    id: '3',
    name: 'Klasyczny Pasek Męski',
    description: 'Elegancki pasek z naturalnej skóry z metalową klamrą.',
    category: 'paski',
    mainImage: '/placeholder-belt.jpg',
    availableColors: ['Czarny', 'Brązowy', 'Koniakowy'],
    dimensions: 'Szerokość: 3.5 cm'
  },
  {
    id: '4',
    name: 'AS | Premium Portfel',
    description: 'Ekskluzywny portfel z linii Aleksandra Sopel - najwyższa jakość wykonania.',
    category: 'as-aleksandra-sopel',
    mainImage: '/placeholder-wallet.jpg',
    availableColors: ['Czarny', 'Bordowy'],
    dimensions: '11x9x2 cm'
  }
];

export default function FeaturedProducts() {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  return (
    <section className="py-20 bg-gradient-to-b from-primary-25 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-brown-900 mb-4">
            Wyróżnione Produkty
          </h2>
          <p className="text-lg text-brown-600 max-w-2xl mx-auto">
            Poznaj nasze najpopularniejsze produkty, które cieszą się największym uznaniem 
            wśród naszych klientów.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {mockProducts.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Special badge for AS products */}
              {product.category === 'as-aleksandra-sopel' && (
                <div className="absolute top-4 left-4 z-10 bg-accent-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                  AS Premium
                </div>
              )}

              {/* Image placeholder */}
              <div className="aspect-square bg-gradient-to-br from-brown-100 to-brown-200 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-brown-600">
                    <div className="w-20 h-20 mx-auto mb-2 bg-brown-300/50 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-serif font-bold">
                        {product.name.charAt(0)}
                      </span>
                    </div>
                    <p className="text-xs opacity-70">Zdjęcie produktu</p>
                  </div>
                </div>

                {/* Hover overlay */}
                <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
                  hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div className="absolute inset-0 flex items-center justify-center space-x-4">
                    <button className="p-3 bg-white rounded-full hover:bg-primary-50 transition-colors">
                      <Eye className="w-5 h-5 text-brown-700" />
                    </button>
                    <button className="p-3 bg-white rounded-full hover:bg-primary-50 transition-colors">
                      <Heart className="w-5 h-5 text-brown-700" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    product.category === 'as-aleksandra-sopel' 
                      ? 'bg-accent-100 text-accent-700' 
                      : 'bg-brown-100 text-brown-700'
                  }`}>
                    {product.category === 'torebki' && 'Torebka'}
                    {product.category === 'plecaki' && 'Plecak'}
                    {product.category === 'paski' && 'Pasek'}
                    {product.category === 'as-aleksandra-sopel' && 'AS Premium'}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-brown-900 mb-2 group-hover:text-brown-700 transition-colors">
                  {product.name}
                </h3>
                
                <p className="text-sm text-brown-600 mb-4 line-clamp-2">
                  {product.description}
                </p>

                {/* Product details */}
                <div className="space-y-2 text-xs text-brown-500 mb-4">
                  <div>
                    <span className="font-medium">Wymiary:</span> {product.dimensions}
                  </div>
                  <div>
                    <span className="font-medium">Kolory:</span> {product.availableColors.join(', ')}
                  </div>
                </div>

                {/* CTA Button */}
                <Link
                  href={`/kontakt?product=${product.id}`}
                  className="w-full inline-flex items-center justify-center px-4 py-3 bg-brown-700 text-white text-sm font-medium rounded-lg hover:bg-brown-800 transition-all duration-300 group/btn"
                >
                  <span>Zapytaj o ten produkt</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Link 
            href="/produkty"
            className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-brown-700 text-brown-700 rounded-lg hover:bg-brown-700 hover:text-white transition-all duration-300 group"
          >
            <span className="font-medium">Zobacz wszystkie produkty</span>
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}