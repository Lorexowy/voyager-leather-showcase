'use client';

import { ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-100 via-primary-50 to-brown-50" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-brown-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-primary-200/40 rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-brown-100 px-4 py-2 rounded-full text-sm text-brown-700 mb-6">
              <Star className="w-4 h-4 text-brown-600" />
              <span>Najwyższa jakość skóry naturalnej</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-serif font-bold text-brown-900 mb-6 leading-tight">
              Ekskluzywna
              <span className="text-brown-600 block">Galanteria</span>
              <span className="text-brown-800">Skórzana</span>
            </h1>
            
            <p className="text-lg text-brown-700 mb-8 max-w-xl">
              Odkryj naszą kolekcję wysokiej jakości produktów skórzanych. 
              Paski, plecaki, torebki i akcesoria firmowe tworzone z pasją 
              i dbałością o każdy detal.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link 
                href="/produkty"
                className="inline-flex items-center justify-center px-8 py-4 bg-brown-700 text-white rounded-lg hover:bg-brown-800 transition-all duration-300 group shadow-lg hover:shadow-xl"
              >
                <span className="font-medium">Zobacz Produkty</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link 
                href="/kontakt"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-brown-700 text-brown-700 rounded-lg hover:bg-brown-700 hover:text-white transition-all duration-300"
              >
                <span className="font-medium">Skontaktuj się z nami</span>
              </Link>
            </div>
          </div>
          
          {/* Image placeholder */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-brown-200 to-brown-300 rounded-2xl shadow-2xl relative overflow-hidden">
              {/* Placeholder for main product image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-brown-600">
                  <div className="w-32 h-32 mx-auto mb-4 bg-brown-400/50 rounded-full flex items-center justify-center">
                    <span className="text-4xl font-serif font-bold">V</span>
                  </div>
                  <p className="text-lg font-medium">Zdjęcie produktu</p>
                  <p className="text-sm opacity-70">Tutaj zostanie umieszczone główne zdjęcie</p>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary-300 rounded-2xl rotate-12 opacity-80" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-brown-400 rounded-xl -rotate-12 opacity-60" />
          </div>
        </div>
        
        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-brown-800 mb-2">15+</div>
            <div className="text-brown-600 text-sm">Lat doświadczenia</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-brown-800 mb-2">50+</div>
            <div className="text-brown-600 text-sm">Produktów w ofercie</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-brown-800 mb-2">100%</div>
            <div className="text-brown-600 text-sm">Skóra naturalna</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-brown-800 mb-2">24h</div>
            <div className="text-brown-600 text-sm">Odpowiedź na zapytania</div>
          </div>
        </div>
      </div>
    </section>
  );
}