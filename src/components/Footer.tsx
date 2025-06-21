'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Instagram, Linkedin } from 'lucide-react';
import { CATEGORIES } from '@/types';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-20 grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company info - minimal */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-8 h-8 bg-white flex items-center justify-center">
                <span className="text-gray-900 font-light text-lg tracking-wider">V</span>
              </div>
              <span className="text-2xl font-light tracking-wide">Voyager</span>
            </div>
            
            <p className="text-gray-400 mb-8 leading-relaxed font-light">
              Ekskluzywna galanteria skórzana najwyższej jakości. 
              Tworzymy produkty z pasją i dbałością o każdy detal.
            </p>
            
            {/* Social media - minimal */}
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 border border-gray-700 flex items-center justify-center hover:border-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 border border-gray-700 flex items-center justify-center hover:border-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-light mb-8 uppercase tracking-wider">Nawigacja</h3>
            <ul className="space-y-4">
              <li>
                <Link 
                  href="/" 
                  className="text-gray-400 hover:text-white transition-colors font-light"
                >
                  Strona główna
                </Link>
              </li>
              <li>
                <Link 
                  href="/produkty" 
                  className="text-gray-400 hover:text-white transition-colors font-light"
                >
                  Wszystkie produkty
                </Link>
              </li>
              <li>
                <Link 
                  href="/o-nas" 
                  className="text-gray-400 hover:text-white transition-colors font-light"
                >
                  O nas
                </Link>
              </li>
              <li>
                <Link 
                  href="/kontakt" 
                  className="text-gray-400 hover:text-white transition-colors font-light"
                >
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-light mb-8 uppercase tracking-wider">Kategorie</h3>
            <ul className="space-y-4">
              {CATEGORIES.map((category) => (
                <li key={category.id}>
                  <Link 
                    href={`/produkty/${category.slug}`}
                    className="text-gray-400 hover:text-white transition-colors font-light"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info - minimal */}
          <div>
            <h3 className="text-lg font-light mb-8 uppercase tracking-wider">Kontakt</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                <div className="text-gray-400 font-light">
                  <div>ul. Przykładowa 123</div>
                  <div>00-000 Warszawa</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <a 
                  href="tel:+48123456789" 
                  className="text-gray-400 hover:text-white transition-colors font-light"
                >
                  +48 123 456 789
                </a>
              </div>
              
              <div className="flex items-center space-x-4">
                <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <a 
                  href="mailto:kontakt@voyager.pl" 
                  className="text-gray-400 hover:text-white transition-colors font-light"
                >
                  kontakt@voyager.pl
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar - minimal */}
        <div className="py-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm font-light">
              © 2024 Voyager. Wszystkie prawa zastrzeżone.
            </div>
            
            <div className="flex space-x-8 text-sm">
              <Link 
                href="/polityka-prywatnosci" 
                className="text-gray-400 hover:text-white transition-colors font-light"
              >
                Polityka prywatności
              </Link>
              <Link 
                href="/regulamin" 
                className="text-gray-400 hover:text-white transition-colors font-light"
              >
                Regulamin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}