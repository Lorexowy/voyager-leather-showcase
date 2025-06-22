'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Eye } from 'lucide-react';
import { Product, formatDimensions } from '@/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

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

  const isSpecial = product.category === 'as-aleksandra-sopel';

  return (
    <div
      className="group relative bg-white border border-gray-100 hover:border-gray-200 transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Special badge - minimalistyczny */}
      {isSpecial && (
        <div className="absolute top-4 left-4 z-10 bg-gray-900 text-white px-3 py-1 text-xs font-light uppercase tracking-wider">
          Premium
        </div>
      )}

      {/* Image - ZAKTUALIZOWANE do prawdziwych obrazów */}
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
          isHovered ? 'opacity-100' : 'opacity-0'
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
                className="w-1.5 h-1.5 bg-gray-400 rounded-full"
              />
            ))}
            {product.images.length > 3 && (
              <div className="text-gray-400 text-xs ml-2 font-light">+{product.images.length - 3}</div>
            )}
          </div>
        )}
      </div>

      {/* Content - clean typography */}
      <div className="p-6">
        {/* Category badge - minimal */}
        <div className="mb-4">
          <span className="text-xs text-gray-500 font-light uppercase tracking-wider">
            {getCategoryDisplayName(product.category)}
          </span>
        </div>

        {/* Product name */}
        <h3 className="text-lg font-light text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
          {product.name}
        </h3>
        
        {/* Description */}
        <p className="text-sm text-gray-600 mb-6 leading-relaxed font-light line-clamp-2">
          {product.description}
        </p>

        {/* Product details - minimal */}
        <div className="space-y-2 text-xs text-gray-500 mb-8 font-light">
          <div>
            <span className="uppercase tracking-wider">Wymiary:</span> {formatDimensions(product.dimensions)}
          </div>
          <div>
            <span className="uppercase tracking-wider">Kolory:</span>
            <div className="inline-flex gap-1 ml-2">
              {product.availableColors.slice(0, 3).map((color, index) => (
                <span 
                  key={index}
                  className="text-gray-600"
                >
                  {color}{index < Math.min(product.availableColors.length, 3) - 1 ? ', ' : ''}
                </span>
              ))}
              {product.availableColors.length > 3 && (
                <span className="text-gray-400">+{product.availableColors.length - 3}</span>
              )}
            </div>
          </div>
        </div>

        {/* Action buttons - minimal */}
        <div className="flex gap-3">
          <Link
            href={`/produkty/szczegoly/${product.id}`}
            className="flex-1 text-center py-3 border border-gray-200 text-gray-700 text-sm font-light hover:border-gray-900 hover:text-gray-900 transition-all duration-300 uppercase tracking-wider"
          >
            Zobacz szczegóły
          </Link>
          
          <Link
            href={`/kontakt?product=${product.id}`}
            className="flex-1 text-center py-3 bg-gray-900 text-white text-sm font-light hover:bg-gray-800 transition-all duration-300 group/btn uppercase tracking-wider"
          >
            <span>Zapytaj</span>
            <ArrowRight className="w-3 h-3 ml-2 inline group-hover/btn:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </div>
  );
}