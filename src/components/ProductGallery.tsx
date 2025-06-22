'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Expand } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imageError, setImageError] = useState<{ [key: number]: boolean }>({});

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const selectImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleImageError = (index: number) => {
    setImageError(prev => ({ ...prev, [index]: true }));
  };

  const hasValidImages = images.length > 0;
  const currentImageValid = hasValidImages && !imageError[currentImageIndex];

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-gray-50 border border-gray-200 overflow-hidden">
        {currentImageValid ? (
          <img
            src={images[currentImageIndex]}
            alt={`${productName} - zdjęcie ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
            onError={() => handleImageError(currentImageIndex)}
          />
        ) : (
          // Fallback placeholder
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-gray-300">
              <div className="w-32 h-32 mx-auto mb-4 bg-gray-200 flex items-center justify-center">
                <span className="text-4xl font-light">
                  {productName.charAt(0)}
                </span>
              </div>
              <p className="text-lg font-light">Główne zdjęcie produktu</p>
              <p className="text-sm opacity-70">
                {hasValidImages 
                  ? `Zdjęcie ${currentImageIndex + 1} z ${images.length}`
                  : 'Brak dostępnych zdjęć'
                }
              </p>
            </div>
          </div>
        )}

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </>
        )}

        {/* Fullscreen button */}
        {currentImageValid && (
          <button
            onClick={() => setIsFullscreen(true)}
            className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
          >
            <Expand className="w-5 h-5 text-gray-700" />
          </button>
        )}

        {/* Image counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-black/50 text-white text-sm rounded-full">
            {currentImageIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => selectImage(index)}
              className={`aspect-square bg-gray-50 border-2 overflow-hidden transition-all duration-300 ${
                currentImageIndex === index
                  ? 'border-gray-900 ring-2 ring-gray-900 ring-offset-2'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {!imageError[index] ? (
                <img
                  src={image}
                  alt={`${productName} - miniatura ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={() => handleImageError(index)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <span className="text-gray-500 text-sm font-medium">{index + 1}</span>
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Modal */}
      {isFullscreen && currentImageValid && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            {/* Close button */}
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Fullscreen image */}
            <div className="max-h-[80vh] max-w-full">
              <img
                src={images[currentImageIndex]}
                alt={`${productName} - pełny rozmiar`}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            {/* Navigation in fullscreen */}
            {images.length > 1 && (
              <div className="flex justify-center mt-6 space-x-4">
                <button
                  onClick={prevImage}
                  className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
                >
                  Poprzednie
                </button>
                <span className="px-4 py-2 text-white">
                  {currentImageIndex + 1} / {images.length}
                </span>
                <button
                  onClick={nextImage}
                  className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
                >
                  Następne
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}