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

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const selectImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-gradient-to-br from-brown-100 to-brown-200 rounded-2xl overflow-hidden shadow-lg">
        {/* Placeholder for main image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-brown-600">
            <div className="w-32 h-32 mx-auto mb-4 bg-brown-300/50 rounded-full flex items-center justify-center">
              <span className="text-4xl font-serif font-bold">
                {productName.charAt(0)}
              </span>
            </div>
            <p className="text-lg font-medium">Główne zdjęcie produktu</p>
            <p className="text-sm opacity-70">Zdjęcie {currentImageIndex + 1} z {images.length}</p>
          </div>
        </div>

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-brown-700" />
            </button>
            
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-brown-700" />
            </button>
          </>
        )}

        {/* Fullscreen button */}
        <button
          onClick={() => setIsFullscreen(true)}
          className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
        >
          <Expand className="w-5 h-5 text-brown-700" />
        </button>

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
              className={`aspect-square bg-gradient-to-br from-brown-100 to-brown-200 rounded-lg overflow-hidden transition-all duration-300 ${
                currentImageIndex === index
                  ? 'ring-2 ring-brown-600 ring-offset-2 shadow-lg'
                  : 'hover:opacity-75'
              }`}
            >
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center text-brown-600">
                  <div className="w-8 h-8 mx-auto bg-brown-300/50 rounded-full flex items-center justify-center">
                    <span className="text-sm font-serif font-bold">
                      {index + 1}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Modal */}
      {isFullscreen && (
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
            <div className="aspect-square bg-gradient-to-br from-brown-100 to-brown-200 rounded-lg overflow-hidden max-h-[80vh]">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center text-brown-600">
                  <div className="w-40 h-40 mx-auto mb-6 bg-brown-300/50 rounded-full flex items-center justify-center">
                    <span className="text-6xl font-serif font-bold">
                      {productName.charAt(0)}
                    </span>
                  </div>
                  <p className="text-2xl font-medium">Pełny rozmiar zdjęcia</p>
                  <p className="text-lg opacity-70">Zdjęcie {currentImageIndex + 1} z {images.length}</p>
                </div>
              </div>
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