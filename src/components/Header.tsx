'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown } from 'lucide-react';
import { CATEGORIES } from '@/types';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsProductsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsProductsOpen(false);
    }, 150); // 150ms delay before closing
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsProductsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        setIsProductsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo - prawdziwe logo SVG */}
          <Link href="/" className="flex items-center">
            <div className="relative w-32 h-32 md:w-40 md:h-40">
              <Image
                src="/images/logo/logovoyager.svg"
                alt="Voyager Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation - minimalistyczny */}
          <nav className="hidden md:flex items-center space-x-12">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-light relative group"
            >
              Strona główna
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            
            {/* Dropdown Products - hover activated with proper delay */}
            <div 
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                ref={buttonRef}
                className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 transition-all duration-200 font-light relative group"
              >
                <span className="relative">
                  Produkty
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 transition-all duration-300 group-hover:w-full"></span>
                </span>
                <ChevronDown 
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isProductsOpen ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              
              <div
                ref={dropdownRef}
                className={`absolute top-full left-0 mt-1 w-80 bg-white rounded-sm shadow-2xl border border-gray-50 py-4 z-50 transition-all duration-300 origin-top ${
                  isProductsOpen 
                    ? 'opacity-100 scale-100 translate-y-0' 
                    : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                }`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {CATEGORIES.map((category, index) => (
                  <Link
                    key={category.id}
                    href={`/produkty/${category.slug}`}
                    className="block px-6 py-4 text-sm text-gray-700 hover:bg-gray-50 transition-all duration-200 border-b border-gray-50 last:border-b-0 group"
                    onClick={() => setIsProductsOpen(false)}
                    style={{
                      transitionDelay: isProductsOpen ? `${index * 50}ms` : '0ms'
                    }}
                  >
                    <div className="font-medium group-hover:text-gray-900 transition-colors duration-200">
                      {category.name}
                    </div>
                    <div className="text-xs text-gray-500 mt-1 font-light group-hover:text-gray-600 transition-colors duration-200">
                      {category.description}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <Link 
              href="/o-nas" 
              className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-light relative group"
            >
              O nas
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/kontakt" 
              className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-light relative group"
            >
              Kontakt
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Mobile menu button - minimalistyczny */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-gray-700 hover:text-gray-900 transition-all duration-200 hover:bg-gray-50 rounded-sm"
          >
            <div className="relative w-5 h-5">
              <Menu 
                className={`w-5 h-5 absolute transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'
                }`} 
              />
              <X 
                className={`w-5 h-5 absolute transition-all duration-300 ${
                  isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'
                }`} 
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation - clean with animation */}
        <div
          className={`md:hidden border-t border-gray-100 overflow-hidden transition-all duration-300 ${
            isMenuOpen ? 'max-h-96 py-6' : 'max-h-0 py-0'
          }`}
        >
          <div className="flex flex-col space-y-6">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-light transform hover:translate-x-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Strona główna
            </Link>
            
            <div>
              <div className="text-gray-900 font-medium mb-4">Produkty</div>
              <div className="ml-4 space-y-4">
                {CATEGORIES.map((category) => (
                  <Link
                    key={category.id}
                    href={`/produkty/${category.slug}`}
                    className="block text-sm text-gray-600 hover:text-gray-900 transition-all duration-200 font-light transform hover:translate-x-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
            
            <Link 
              href="/o-nas" 
              className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-light transform hover:translate-x-1"
              onClick={() => setIsMenuOpen(false)}
            >
              O nas
            </Link>
            <Link 
              href="/kontakt" 
              className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-light transform hover:translate-x-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Kontakt
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}