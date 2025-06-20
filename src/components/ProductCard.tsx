'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Eye, Heart } from 'lucide-react';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

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
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Special badge for AS products */}
      {isSpecial && (
        <div className="absolute top-4 left-4 z-10 bg-accent-600 text-white px-3 py-1 rounded-full text-xs font-medium">
          AS Premium
        </div>
      )}

      {/* Wishlist button */}
      <button className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white">
        <Heart className="w-4 h-4 text-brown-700" />
      </button>

      {/* Image */}
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
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <Link
              href={`/produkty/szczegoly/${product.id}`}
              className="p-3 bg-white rounded-full hover:bg-primary-50 transition-colors"
            >
              <Eye className="w-5 h-5 text-brown-700" />
            </Link>
          </div>
        </div>

        {/* Multiple images indicator */}
        {product.images.length > 1 && (
          <div className="absolute bottom-3 left-3 flex space-x-1">
            {product.images.slice(0, 4).map((_, index) => (
              <div 
                key={index}
                className="w-2 h-2 bg-white/60 rounded-full"
              />
            ))}
            {product.images.length > 4 && (
              <div className="text-white/80 text-xs ml-1">+{product.images.length - 4}</div>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category badge */}
        <div className="mb-3">
          <span className={`text-xs px-2 py-1 rounded-full ${
            isSpecial 
              ? 'bg-accent-100 text-accent-700' 
              : 'bg-brown-100 text-brown-700'
          }`}>
            {getCategoryDisplayName(product.category)}
          </span>
        </div>

        {/* Product name */}
        <h3 className="text-lg font-bold text-brown-900 mb-2 group-hover:text-brown-700 transition-colors line-clamp-1">
          {product.name}
        </h3>
        
        {/* Description */}
        <p className="text-sm text-brown-600 mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Product details */}
        <div className="space-y-2 text-xs text-brown-500 mb-6">
          <div>
            <span className="font-medium">Wymiary:</span> {product.dimensions}
          </div>
          <div>
            <span className="font-medium">Dostępne kolory:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {product.availableColors.slice(0, 3).map((color, index) => (
                <span 
                  key={index}
                  className="px-2 py-0.5 bg-brown-50 text-brown-600 rounded text-xs"
                >
                  {color}
                </span>
              ))}
              {product.availableColors.length > 3 && (
                <span className="px-2 py-0.5 bg-brown-50 text-brown-600 rounded text-xs">
                  +{product.availableColors.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <Link
            href={`/produkty/szczegoly/${product.id}`}
            className="flex-1 inline-flex items-center justify-center px-4 py-3 border-2 border-brown-200 text-brown-700 text-sm font-medium rounded-lg hover:border-brown-300 hover:bg-brown-50 transition-all duration-300"
          >
            Zobacz szczegóły
          </Link>
          
          <Link
            href={`/kontakt?product=${product.id}`}
            className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-brown-700 text-white text-sm font-medium rounded-lg hover:bg-brown-800 transition-all duration-300 group/btn"
          >
            <span>Zapytaj</span>
            <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}