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

  // W prawdziwej aplikacji tutaj byłoby pobieranie danych z Firebase
  // const product = getProductById(params.id);

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
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-25 to-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-brown-600 mb-8">
          <Link href="/" className="hover:text-brown-800 transition-colors">Strona główna</Link>
          <span>/</span>
          <Link href="/produkty" className="hover:text-brown-800 transition-colors">Produkty</Link>
          <span>/</span>
          <span className="text-brown-800 font-medium">{mockProduct.name}</span>
        </nav>

        {/* Back button */}
        <Link 
          href="/produkty"
          className="inline-flex items-center space-x-2 text-brown-600 hover:text-brown-800 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Powrót do produktów</span>
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Gallery */}
          <div>
            <ProductGallery images={mockProduct.images} productName={mockProduct.name} />
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            {/* Category badge */}
            <div>
              <span className="inline-block px-3 py-1 bg-brown-100 text-brown-700 rounded-full text-sm font-medium">
                Torebki
              </span>
            </div>

            {/* Product name and actions */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-3xl font-serif font-bold text-brown-900 leading-tight">
                  {mockProduct.name}
                </h1>
                
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`p-3 rounded-full border-2 transition-all duration-300 ${
                      isWishlisted 
                        ? 'border-red-300 bg-red-50 text-red-600' 
                        : 'border-brown-200 hover:border-brown-300 text-brown-600'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                  
                  <button
                    onClick={handleShare}
                    className="p-3 rounded-full border-2 border-brown-200 hover:border-brown-300 text-brown-600 transition-all duration-300"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <p className="text-brown-700 leading-relaxed">
                {mockProduct.description}
              </p>
            </div>

            {/* Product specifications */}
            <div className="space-y-6">
              {/* Dimensions */}
              <div className="flex items-start space-x-3">
                <Ruler className="w-5 h-5 text-brown-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-brown-800 mb-1">Wymiary</h3>
                  <p className="text-brown-600">{mockProduct.dimensions}</p>
                </div>
              </div>

              {/* Available colors */}
              <div className="flex items-start space-x-3">
                <Palette className="w-5 h-5 text-brown-600 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-medium text-brown-800 mb-3">Dostępne kolory</h3>
                  <div className="flex flex-wrap gap-2">
                    {mockProduct.availableColors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all duration-300 ${
                          selectedColor === color
                            ? 'border-brown-600 bg-brown-600 text-white'
                            : 'border-brown-200 text-brown-700 hover:border-brown-300'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-brown-500 mt-2">
                    Wybrany kolor: <span className="font-medium">{selectedColor}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-4 pt-6 border-t border-brown-100">
              <Link
                href={`/kontakt?product=${mockProduct.id}&color=${selectedColor}`}
                className="w-full inline-flex items-center justify-center px-8 py-4 bg-brown-700 text-white font-medium rounded-lg hover:bg-brown-800 transition-all duration-300 group"
              >
                <span>Zapytaj o ten produkt</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href="/kontakt"
                className="w-full inline-flex items-center justify-center px-8 py-4 border-2 border-brown-700 text-brown-700 font-medium rounded-lg hover:bg-brown-700 hover:text-white transition-all duration-300"
              >
                Skontaktuj się z nami
              </Link>
            </div>

            {/* Additional info */}
            <div className="bg-primary-50 rounded-lg p-6 text-sm text-brown-700">
              <h4 className="font-medium text-brown-800 mb-2">Informacje dodatkowe</h4>
              <ul className="space-y-1">
                <li>• Wykonane ze skóry naturalnej najwyższej jakości</li>
                <li>• Ręczne wykonanie przez doświadczonych rzemieślników</li>
                <li>• Możliwość personalizacji (na specjalne zamówienie)</li>
                <li>• Odpowiedź na zapytania w ciągu 24 godzin</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-20">
          <h2 className="text-2xl font-serif font-bold text-brown-900 mb-8 text-center">
            Podobne Produkty
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {relatedProducts.map((product) => (
              <Link
                key={product.id}
                href={`/produkty/szczegoly/${product.id}`}
                className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="aspect-square bg-gradient-to-br from-brown-100 to-brown-200 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-brown-600">
                      <div className="w-16 h-16 mx-auto mb-2 bg-brown-300/50 rounded-full flex items-center justify-center">
                        <span className="text-xl font-serif font-bold">
                          {product.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-medium text-brown-800 group-hover:text-brown-600 transition-colors">
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