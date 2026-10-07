'use client';

import { ArrowRight, ExternalLink } from 'lucide-react';
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
            alt="Galanteria skórzana Voyager"
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
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <Image
              src="/images/logo/logofullhero.svg"
              alt="Voyager — Polska Galanteria Skórzana"
              width={560}
              height={190}
              className="filter brightness-0 invert w-full max-w-[360px] sm:max-w-[560px] h-auto"
              priority
            />
          </div>
          
          {/* Description */}
          <p className="text-base sm:text-lg text-white/90 mb-8 max-w-2xl mx-auto font-light leading-relaxed">
            Tworzymy torebki, paski i plecaki ze skóry naturalnej.
            {' '}Oferujemy sprzedaż hurtową i personalizację produktów dla firm.
          </p>
          
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/produkty"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-light rounded-sm hover:bg-gray-100 transition-all duration-300 group focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
            >
              <span>Zobacz kolekcję</span>
              <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            
            <Link 
              href="/dla-firm"
              className="inline-flex items-center justify-center px-8 py-4 border border-white/60 text-white font-light rounded-sm hover:border-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
            >
              Oferta dla firm
            </Link>
          </div>

          <p className="mt-6 text-sm sm:text-base text-white/90 font-light leading-relaxed">
            Kupujesz dla siebie?{' '}
            <a
              href="https://www.alpelia.pl"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-white underline underline-offset-4 decoration-white/70 hover:decoration-white"
            >
              Odwiedź sklep naszego partnera Alpelia
              <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span className="sr-only"> (otwiera się w nowej karcie)</span>
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
