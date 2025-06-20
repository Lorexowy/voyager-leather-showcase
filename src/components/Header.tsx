'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import { CATEGORIES } from '@/types';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProducts = () => setIsProductsOpen(!isProductsOpen);

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-brown-600 to-brown-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">V</span>
            </div>
            <span className="text-2xl font-serif font-bold text-brown-800">Voyager</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-brown-700 hover:text-brown-900 transition-colors">
              Strona Główna
            </Link>
            
            {/* Dropdown Products */}
            <div className="relative">
              <button
                onClick={toggleProducts}
                className="flex items-center space-x-1 text-brown-700 hover:text-brown-900 transition-colors"
              >
                <span>Nasze Produkty</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {isProductsOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-brown-100 py-2 z-50">
                  {CATEGORIES.map((category) => (
                    <Link
                      key={category.id}
                      href={`/produkty/${category.slug}`}
                      className="block px-4 py-3 text-sm text-brown-700 hover:bg-primary-50 hover:text-brown-900 transition-colors"
                      onClick={() => setIsProductsOpen(false)}
                    >
                      <div className="font-medium">{category.name}</div>
                      <div className="text-xs text-brown-500 mt-1">{category.description}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/o-nas" className="text-brown-700 hover:text-brown-900 transition-colors">
              O Nas
            </Link>
            <Link href="/kontakt" className="text-brown-700 hover:text-brown-900 transition-colors">
              Kontakt
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-brown-700 hover:text-brown-900 hover:bg-brown-50"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-brown-100">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-brown-700 hover:text-brown-900 transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Strona Główna
              </Link>
              
              <div>
                <div className="text-brown-800 font-medium px-2 py-1 mb-2">Nasze Produkty</div>
                <div className="ml-4 space-y-2">
                  {CATEGORIES.map((category) => (
                    <Link
                      key={category.id}
                      href={`/produkty/${category.slug}`}
                      className="block text-sm text-brown-600 hover:text-brown-900 transition-colors px-2 py-1"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
              
              <Link 
                href="/o-nas" 
                className="text-brown-700 hover:text-brown-900 transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                O Nas
              </Link>
              <Link 
                href="/kontakt" 
                className="text-brown-700 hover:text-brown-900 transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Kontakt
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}