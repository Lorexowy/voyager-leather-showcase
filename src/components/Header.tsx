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
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo - minimalistyczny */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-900 rounded-sm flex items-center justify-center">
              <span className="text-white font-light text-lg tracking-wider">V</span>
            </div>
            <span className="text-2xl font-light text-gray-900 tracking-wide">Voyager</span>
          </Link>

          {/* Desktop Navigation - minimalistyczny */}
          <nav className="hidden md:flex items-center space-x-12">
            <Link href="/" className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-light">
              Home
            </Link>
            
            {/* Dropdown Products - czysty design */}
            <div className="relative">
              <button
                onClick={toggleProducts}
                className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 transition-colors duration-200 font-light"
              >
                <span>Products</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {isProductsOpen && (
                <div className="absolute top-full left-0 mt-3 w-80 bg-white rounded-sm shadow-2xl border border-gray-50 py-4 z-50">
                  {CATEGORIES.map((category) => (
                    <Link
                      key={category.id}
                      href={`/produkty/${category.slug}`}
                      className="block px-6 py-4 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200 border-b border-gray-50 last:border-b-0"
                      onClick={() => setIsProductsOpen(false)}
                    >
                      <div className="font-medium">{category.name}</div>
                      <div className="text-xs text-gray-500 mt-1 font-light">{category.description}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/o-nas" className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-light">
              About
            </Link>
            <Link href="/kontakt" className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-light">
              Contact
            </Link>
          </nav>

          {/* Mobile menu button - minimalistyczny */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-gray-700 hover:text-gray-900"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation - clean */}
        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-gray-100">
            <div className="flex flex-col space-y-6">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-gray-900 transition-colors font-light"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              
              <div>
                <div className="text-gray-900 font-medium mb-4">Products</div>
                <div className="ml-4 space-y-4">
                  {CATEGORIES.map((category) => (
                    <Link
                      key={category.id}
                      href={`/produkty/${category.slug}`}
                      className="block text-sm text-gray-600 hover:text-gray-900 transition-colors font-light"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
              
              <Link 
                href="/o-nas" 
                className="text-gray-700 hover:text-gray-900 transition-colors font-light"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/kontakt" 
                className="text-gray-700 hover:text-gray-900 transition-colors font-light"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}