'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/HeroBanner.jpg"
          alt="Leather craftsmanship - premium leather goods"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white mb-8 font-light border border-white/20">
            Ekskluzywna galanteria skórzana
          </div>
          
          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light text-white mb-8 leading-none tracking-tight">
            Rzemiosło
            <span className="block font-light text-white/80">Skórzane</span>
            <span className="block font-medium">Doskonałość</span>
          </h1>
          
          {/* Description */}
          <p className="text-lg sm:text-xl text-white/90 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Odkryj naszą kolekcję produktów ze skóry naturalnej najwyższej jakości. 
            Każdy element wykonany z dbałością o najmniejszy detal.
          </p>
          
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/produkty"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-light rounded-sm hover:bg-gray-100 transition-all duration-300 group"
            >
              <span>Zobacz kolekcję</span>
              <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            
            <Link 
              href="/kontakt"
              className="inline-flex items-center justify-center px-8 py-4 border border-white/30 text-white font-light rounded-sm hover:border-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
            >
              Skontaktuj się
            </Link>
          </div>
        </div>
        
        {/* Stats - positioned at bottom */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-light text-white mb-2">15+</div>
            <div className="text-white/80 text-xs sm:text-sm font-light uppercase tracking-wider">Lat doświadczenia</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-light text-white mb-2">50+</div>
            <div className="text-white/80 text-xs sm:text-sm font-light uppercase tracking-wider">Produktów</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-light text-white mb-2">100%</div>
            <div className="text-white/80 text-xs sm:text-sm font-light uppercase tracking-wider">Skóra naturalna</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-light text-white mb-2">24h</div>
            <div className="text-white/80 text-xs sm:text-sm font-light uppercase tracking-wider">Czas odpowiedzi</div>
          </div>
        </div>
      </div>
    </section>
  );
}