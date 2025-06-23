'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center">
      {/* Background Image with white border on desktop only */}
      <div className="absolute inset-0 z-0 lg:p-8">
        <div className="relative w-full h-full lg:border-4 lg:border-white/20 lg:rounded-lg lg:overflow-hidden">
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
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Logo */}
          <div className="mb-12 flex justify-center">
            <Image
              src="/images/logo/logofullhero.svg"
              alt="Polska Galanteria Skórzana"
              width={700}
              height={400}
              className="filter brightness-0 invert max-w-full h-auto"
              priority
            />
          </div>
          
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
      </div>
    </section>
  );
}