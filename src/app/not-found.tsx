'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, Home, Search, Mail, Package, AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      <div className="flex-1 flex items-center justify-center py-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* 404 Number - minimalistyczny */}
          <div className="mb-12">
            <div className="inline-flex items-center justify-center w-32 h-32 border-4 border-gray-200 text-6xl font-light text-gray-400 mb-8">
              404
            </div>
          </div>

          {/* Header */}
          <h1 className="text-4xl font-light text-gray-900 mb-6 tracking-tight">
            Strona nie została znaleziona
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 font-light leading-relaxed">
            Przepraszamy, ale strona której szukasz nie istnieje lub została przeniesiona. 
            Sprawdź adres URL lub skorzystaj z nawigacji poniżej.
          </p>

          {/* Search suggestions - minimalistyczne */}
          <div className="bg-gray-50 p-8 mb-12 border border-gray-200">
            <div className="flex items-center space-x-3 mb-6">
              <Search className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-light text-gray-900 uppercase tracking-wider">
                Sugerowane strony
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Link
                href="/"
                className="flex items-center space-x-4 p-4 bg-white border border-gray-200 hover:border-gray-900 transition-all duration-300 group"
              >
                <div className="w-12 h-12 border border-gray-300 flex items-center justify-center group-hover:border-gray-900 transition-colors">
                  <Home className="w-6 h-6 text-gray-600 group-hover:text-gray-900" />
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-gray-900 group-hover:text-gray-700">Strona główna</h3>
                  <p className="text-sm text-gray-600 font-light">Powrót do strony startowej</p>
                </div>
              </Link>

              <Link
                href="/produkty"
                className="flex items-center space-x-4 p-4 bg-white border border-gray-200 hover:border-gray-900 transition-all duration-300 group"
              >
                <div className="w-12 h-12 border border-gray-300 flex items-center justify-center group-hover:border-gray-900 transition-colors">
                  <Package className="w-6 h-6 text-gray-600 group-hover:text-gray-900" />
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-gray-900 group-hover:text-gray-700">Nasze produkty</h3>
                  <p className="text-sm text-gray-600 font-light">Przeglądaj kolekcję</p>
                </div>
              </Link>

              <Link
                href="/o-nas"
                className="flex items-center space-x-4 p-4 bg-white border border-gray-200 hover:border-gray-900 transition-all duration-300 group"
              >
                <div className="w-12 h-12 border border-gray-300 flex items-center justify-center group-hover:border-gray-900 transition-colors">
                  <AlertCircle className="w-6 h-6 text-gray-600 group-hover:text-gray-900" />
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-gray-900 group-hover:text-gray-700">O firmie</h3>
                  <p className="text-sm text-gray-600 font-light">Poznaj naszą historię</p>
                </div>
              </Link>

              <Link
                href="/kontakt"
                className="flex items-center space-x-4 p-4 bg-white border border-gray-200 hover:border-gray-900 transition-all duration-300 group"
              >
                <div className="w-12 h-12 border border-gray-300 flex items-center justify-center group-hover:border-gray-900 transition-colors">
                  <Mail className="w-6 h-6 text-gray-600 group-hover:text-gray-900" />
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-gray-900 group-hover:text-gray-700">Kontakt</h3>
                  <p className="text-sm text-gray-600 font-light">Skontaktuj się z nami</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Categories - quick access */}
          <div className="mb-12">
            <h3 className="text-lg font-light text-gray-900 mb-6 uppercase tracking-wider">
              Kategorie produktów
            </h3>
            
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/produkty/torebki"
                className="px-6 py-3 border border-gray-200 text-gray-700 hover:border-gray-900 hover:text-gray-900 transition-all duration-300 font-light uppercase tracking-wider"
              >
                Torebki
              </Link>
              
              <Link
                href="/produkty/paski"
                className="px-6 py-3 border border-gray-200 text-gray-700 hover:border-gray-900 hover:text-gray-900 transition-all duration-300 font-light uppercase tracking-wider"
              >
                Paski
              </Link>
              
              <Link
                href="/produkty/plecaki"
                className="px-6 py-3 border border-gray-200 text-gray-700 hover:border-gray-900 hover:text-gray-900 transition-all duration-300 font-light uppercase tracking-wider"
              >
                Plecaki
              </Link>
              
              <Link
                href="/produkty/as-aleksandra-sopel"
                className="px-6 py-3 bg-gray-900 text-white hover:bg-gray-800 transition-all duration-300 font-light uppercase tracking-wider"
              >
                AS Premium
              </Link>
            </div>
          </div>

          {/* Main CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white font-light hover:bg-gray-800 transition-all duration-300 group uppercase tracking-wider"
            >
              <ArrowLeft className="w-4 h-4 mr-3 group-hover:-translate-x-1 transition-transform" />
              Powrót do strony głównej
            </Link>
            
            <Link
              href="/kontakt"
              className="inline-flex items-center justify-center px-8 py-4 border border-gray-900 text-gray-900 font-light hover:bg-gray-900 hover:text-white transition-all duration-300 uppercase tracking-wider"
            >
              <Mail className="w-4 h-4 mr-3" />
              Skontaktuj się z nami
            </Link>
          </div>

          {/* Help text */}
          <div className="mt-16 bg-gray-50 p-6 border border-gray-200">
            <h3 className="text-lg font-light text-gray-900 mb-4 tracking-tight">
              Potrzebujesz pomocy?
            </h3>
            <p className="text-gray-600 font-light leading-relaxed mb-4">
              Jeśli nadal nie możesz znaleźć tego czego szukasz, skontaktuj się z nami bezpośrednio. 
              Chętnie pomożemy Ci znaleźć odpowiednie produkty lub informacje.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-600 font-light">
              <a 
                href="mailto:voyager.sopel@gmail.com" 
                className="flex items-center space-x-2 hover:text-gray-900 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>voyager.sopel@gmail.com</span>
              </a>
              <span className="hidden sm:block text-gray-400">|</span>
              <a 
                href="tel:+48505461050" 
                className="flex items-center space-x-2 hover:text-gray-900 transition-colors"
              >
                <span>📞</span>
                <span>+48 505 461 050</span>
              </a>
            </div>
          </div>

          {/* Bottom note */}
          <div className="mt-12 text-sm text-gray-500 font-light">
            <p>
              Kod błędu: 404 | Strona nie została znaleziona
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}