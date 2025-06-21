'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductGallery from '@/components/ProductGallery';
import { ArrowLeft, ArrowRight, Heart, Share2, Ruler, Palette } from 'lucide-react';
import { Product, ProductCategory } from '@/types';

// Mock data - później zastąpimy danymi z Firebase
const mockProduct: Product = {
  id: '1',
  name: 'Elegancka Torebka Damska Premium',
  description: 'Wyjątkowa torebka wykonana ze skóry naturalnej najwyższej jakości. Charakteryzuje się eleganckim designem i funkcjonalnością, idealna na każdą okazję. Wykonana ręcznie przez doświadczonych rzemieślników z dbałością o każdy detal. Skóra pochodząca z etycznych źródeł, poddana specjalnej obróbce zapewniającej trwałość i miękkość.',
  category: 'torebki' as ProductCategory,
  mainImage: '/placeholder-bag.jpg',
  images: [
    '/placeholder-bag.jpg',
    '/placeholder-bag-2.jpg',
    '/placeholder-bag-3.jpg',
    '/placeholder-bag-4.jpg'
  ],
  availableColors: ['Czarny', 'Brązowy', 'Beżowy', 'Bordowy'],
  dimensions: '30x25x12 cm',
  createdAt: new Date(),
  updatedAt: new Date(),
  isActive: true
};

const relatedProducts = [
  {
    id: '2',
    name: 'Portfel Damski',
    mainImage: '/placeholder-wallet.jpg',
    category: 'torebki'
  },
  {
    id: '3',
    name: 'Elegancka Kopertówka',
    mainImage: '/placeholder-clutch.jpg',
    category: 'torebki'
  },
  {
    id: '4',
    name: 'Biznesowy Plecak',
    mainImage: '/placeholder-backpack.jpg',
    category: 'plecaki'
  }
];

export default function ProductDetailsPage() {
  const params = useParams();
  const [selectedColor, setSelectedColor] = useState(mockProduct.availableColors[0]);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: mockProduct.name,
          text: mockProduct.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Sharing failed:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb - minimal */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-12 font-light">
          <Link href="/" className="hover:text-gray-900 transition-colors">Strona główna</Link>
          <span>/</span>
          <Link href="/produkty" className="hover:text-gray-900 transition-colors">Produkty</Link>
          <span>/</span>
          <span className="text-gray-900">{mockProduct.name}</span>
        </nav>

        {/* Back button - minimal */}
        <Link 
          href="/produkty"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-12 font-light"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Powrót do produktów</span>
        </Link>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Product Gallery */}
          <div>
            <ProductGallery images={mockProduct.images} productName={mockProduct.name} />
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            {/* Category badge - minimal */}
            <div>
              <span className="text-xs text-gray-500 font-light uppercase tracking-wider">
                Torebka
              </span>
            </div>

            {/* Product name and actions */}
            <div>
              <div className="flex items-start justify-between mb-6">
                <h1 className="text-4xl font-light text-gray-900 leading-tight tracking-tight">
                  {mockProduct.name}
                </h1>
                
                <div className="flex items-center space-x-3 ml-6">
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`p-3 border transition-all duration-300 ${
                      isWishlisted 
                        ? 'border-gray-900 bg-gray-900 text-white' 
                        : 'border-gray-200 hover:border-gray-900 text-gray-600'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                  
                  <button
                    onClick={handleShare}
                    className="p-3 border border-gray-200 hover:border-gray-900 text-gray-600 transition-all duration-300"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <p className="text-gray-600 leading-relaxed font-light">
                {mockProduct.description}
              </p>
            </div>

            {/* Product specifications - minimal */}
            <div className="space-y-8">
              {/* Dimensions */}
              <div className="flex items-start space-x-4">
                <Ruler className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <h3 className="font-light text-gray-900 mb-2 uppercase tracking-wider">Wymiary</h3>
                  <p className="text-gray-600 font-light">{mockProduct.dimensions}</p>
                </div>
              </div>

              {/* Available colors */}
              <div className="flex items-start space-x-4">
                <Palette className="w-5 h-5 text-gray-400 mt-1" />
                <div className="flex-1">
                  <h3 className="font-light text-gray-900 mb-4 uppercase tracking-wider">Dostępne kolory</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {mockProduct.availableColors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-3 border text-sm font-light transition-all duration-300 ${
                          selectedColor === color
                            ? 'border-gray-900 bg-gray-900 text-white'
                            : 'border-gray-200 text-gray-700 hover:border-gray-900'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-4 font-light">
                    Wybrany kolor: <span className="text-gray-900">{selectedColor}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Buttons - minimal */}
            <div className="space-y-4 pt-8 border-t border-gray-100">
              <Link
                href={`/kontakt?product=${mockProduct.id}&color=${selectedColor}`}
                className="w-full inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white font-light hover:bg-gray-800 transition-all duration-300 group uppercase tracking-wider"
              >
                <span>Zapytaj o ten produkt</span>
                <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href="/kontakt"
                className="w-full inline-flex items-center justify-center px-8 py-4 border border-gray-900 text-gray-900 font-light hover:bg-gray-900 hover:text-white transition-all duration-300 uppercase tracking-wider"
              >
                Skontaktuj się z nami
              </Link>
            </div>

            {/* Additional info - minimal */}
            <div className="bg-gray-50 p-6 text-sm text-gray-600 font-light">
              <h4 className="font-medium text-gray-900 mb-4 uppercase tracking-wider">Informacje dodatkowe</h4>
              <ul className="space-y-2">
                <li>• Wykonane ze skóry naturalnej najwyższej jakości</li>
                <li>• Ręczne wykonanie przez doświadczonych rzemieślników</li>
                <li>• Możliwość personalizacji na specjalne zamówienie</li>
                <li>• Odpowiedź na zapytania w ciągu 24 godzin</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products - minimal */}
        <div className="mt-24">
          <h2 className="text-3xl font-light text-gray-900 mb-12 text-center tracking-tight">
            Podobne Produkty
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {relatedProducts.map((product) => (
              <Link
                key={product.id}
                href={`/produkty/szczegoly/${product.id}`}
                className="group bg-white border border-gray-100 overflow-hidden hover:border-gray-900 transition-all duration-300"
              >
                <div className="aspect-square bg-gray-50 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-gray-300">
                      <div className="w-12 h-12 mx-auto mb-3 border border-gray-200 flex items-center justify-center">
                        <span className="text-lg font-light">
                          {product.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-light text-gray-900 group-hover:text-gray-700 transition-colors">
                    {product.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}