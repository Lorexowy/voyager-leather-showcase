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

  const isSpecial = product.category === 'as-aleksandra-sopel';

  return (
    <div
      className="group relative bg-white border border-gray-100 hover:border-gray-200 transition-all duration-500 h-full flex flex-col"
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
      <div className="p-4 sm:p-6 flex-1 flex flex-col">
        {/* Category badge - minimal */}
        <div className="mb-3 sm:mb-4">
          <span className="text-xs text-gray-500 font-light uppercase tracking-wider">
            {getCategoryDisplayName(product.category)}
          </span>
        </div>

        {/* Product name */}
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
  );
}