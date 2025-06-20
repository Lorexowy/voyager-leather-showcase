'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';
import { CATEGORIES } from '@/types';

export default function Footer() {
  return (
    <footer className="bg-brown-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-brown-900 font-bold text-lg">V</span>
              </div>
              <span className="text-2xl font-serif font-bold">Voyager</span>
            </div>
            
            <p className="text-brown-200 mb-6 leading-relaxed">
              Ekskluzywna galanteria skórzana najwyższej jakości. 
              Tworzymy produkty z pasją i dbałością o każdy detal.
            </p>
            
            {/* Social media */}
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-brown-800 rounded-lg flex items-center justify-center hover:bg-brown-700 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-brown-800 rounded-lg flex items-center justify-center hover:bg-brown-700 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-brown-800 rounded-lg flex items-center justify-center hover:bg-brown-700 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-bold mb-6">Szybkie Linki</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/" 
                  className="text-brown-200 hover:text-white transition-colors"
                >
                  Strona Główna
                </Link>
              </li>
              <li>
                <Link 
                  href="/produkty" 
                  className="text-brown-200 hover:text-white transition-colors"
                >
                  Wszystkie Produkty
                </Link>
              </li>
              <li>
                <Link 
                  href="/o-nas" 
                  className="text-brown-200 hover:text-white transition-colors"
                >
                  O Nas
                </Link>
              </li>
              <li>
                <Link 
                  href="/kontakt" 
                  className="text-brown-200 hover:text-white transition-colors"
                >
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-bold mb-6">Kategorie</h3>
            <ul className="space-y-3">
              {CATEGORIES.map((category) => (
                <li key={category.id}>
                  <Link 
                    href={`/produkty/${category.slug}`}
                    className="text-brown-200 hover:text-white transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-lg font-bold mb-6">Kontakt</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" />
                <div className="text-brown-200">
                  <div>ul. Przykładowa 123</div>
                  <div>00-000 Warszawa</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <a 
                  href="tel:+48123456789" 
                  className="text-brown-200 hover:text-white transition-colors"
                >
                  +48 123 456 789
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <a 
                  href="mailto:kontakt@voyager.pl" 
                  className="text-brown-200 hover:text-white transition-colors"
                >
                  kontakt@voyager.pl
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-brown-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-brown-300 text-sm">
              © 2024 Voyager. Wszystkie prawa zastrzeżone.
            </div>
            
            <div className="flex space-x-6 text-sm">
              <Link 
                href="/polityka-prywatnosci" 
                className="text-brown-300 hover:text-white transition-colors"
              >
                Polityka Prywatności
              </Link>
              <Link 
                href="/regulamin" 
                className="text-brown-300 hover:text-white transition-colors"
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