'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Eye } from 'lucide-react';

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

        {/* Products Grid - clean */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {mockProducts.map((product) => (
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
                    {product.category === 'torebki' && 'Torebka'}
                    {product.category === 'plecaki' && 'Plecak'}
                    {product.category === 'paski' && 'Pasek'}
                    {product.category === 'as-aleksandra-sopel' && 'AS Premium'}
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
                    <span className="uppercase tracking-wider">Wymiary:</span> {product.dimensions}
                  </div>
                  <div>
                    <span className="uppercase tracking-wider">Kolory:</span> {product.availableColors.join(', ')}
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
      </div>
    </section>
  );
}