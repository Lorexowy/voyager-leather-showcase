'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';

export default function RetailPartnerSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Logo Alpelia - Left Side */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative w-full max-w-sm h-48 md:h-64">
              <Image
                src="/images/logo/alpaca_no_background.png"
                alt="Alpelia - Partner handlowy Voyager"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Content - Right Side */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-light text-gray-900 mb-6 tracking-tight">
              Sprzedaż Detaliczna
            </h2>
            
            <p className="text-lg text-gray-600 font-light leading-relaxed mb-8">
              Jeżeli chcą Państwo <strong className="font-medium text-gray-900">kupić nasze produkty detalicznie</strong>, 
              zapraszamy na sklep internetowy naszego partnera handlowego.
            </p>
            
            <p className="text-gray-600 font-light leading-relaxed mb-10">
              Współpracujemy z <strong className="font-medium text-gray-900">Alpelią</strong>, aby zapewnić wygodny dostęp 
              do pełnej oferty produktów Voyager w sprzedaży detalicznej. Wszystkie produkty są wykonane z tej samej 
              najwyższej jakości skóry naturalnej.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="https://www.alpelia.pl" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white font-light rounded-sm hover:bg-black transition-all duration-300 group uppercase tracking-wide shadow-sm"
              >
                <span>Odwiedź sklep Alpelia</span>
                <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link 
                href="/alpelia" 
                className="inline-flex items-center justify-center px-8 py-4 border border-gray-300 text-gray-900 font-light rounded-sm hover:bg-gray-50 transition-all duration-300 uppercase tracking-wide"
              >
                <span>Więcej informacji</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
