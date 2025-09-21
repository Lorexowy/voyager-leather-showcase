'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Instagram, Linkedin, Clock, Award } from 'lucide-react';
import { CATEGORIES } from '@/types';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company info & Certyfikat */}
          <div className="sm:col-span-2 lg:col-span-1">
            {/* Logo container - naprawiony */}
            <div className="flex items-center justify-center sm:justify-start mb-8">
              <div className="w-auto h-auto flex items-center justify-center">
                <Image
                  src="/images/logo/logovoyager.svg"
                  alt="Voyager Logo"
                  width={250}
                  height={250}
                  className="filter brightness-0 invert"
                />
              </div>
            </div>
            
            <p className="text-gray-400 mb-8 leading-relaxed font-light text-center sm:text-left">
              Ekskluzywna galanteria skórzana najwyższej jakości. 
              Tworzymy produkty z pasją i dbałością o każdy detal.
            </p>
            
            {/* Quality Certificate */}
            <div className="p-4 border border-gray-700 bg-gray-800/30">
              <div className="flex items-center space-x-3 mb-2">
                <Award className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-light text-gray-300 uppercase tracking-wider">Certyfikat Jakości</span>
              </div>
              <p className="text-xs text-gray-400 font-light leading-relaxed">
                100% naturalna skóra najwyższej jakości. 
                Każdy produkt przechodzi rygorystyczną kontrolę jakości.
              </p>
            </div>
          </div>

          {/* Navigation & Social */}
          <div className="sm:col-span-1 lg:col-span-1">
            <h3 className="text-lg font-light mb-8 uppercase tracking-wider">Nawigacja</h3>
            <ul className="space-y-4 mb-8">
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
                  href="/dla-firm" 
                  className="text-gray-400 hover:text-white transition-colors font-light"
                >
                  Dla Firm
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

            {/* Social sharing */}
            <div>
              <h4 className="text-sm font-light mb-4 uppercase tracking-wider text-gray-300">Udostępnij nas</h4>
              <div className="flex flex-wrap gap-3">
                <a 
                  href="https://www.facebook.com/sharer/sharer.php?u=https://voyagersopel.pl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-gray-700 flex items-center justify-center hover:border-white transition-colors"
                  aria-label="Udostępnij na Facebook"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a 
                  href="https://twitter.com/intent/tweet?url=https://voyagersopel.pl&text=Sprawdź%20ekskluzywną%20galanterie%20skórzaną%20od%20Voyager"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-gray-700 flex items-center justify-center hover:border-white transition-colors"
                  aria-label="Udostępnij na Twitter"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.linkedin.com/sharing/share-offsite/?url=https://voyagersopel.pl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-gray-700 flex items-center justify-center hover:border-white transition-colors"
                  aria-label="Udostępnij na LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a 
                  href="https://wa.me/?text=Sprawdź%20ekskluzywną%20galanterie%20skórzaną%20od%20Voyager%20https://voyagersopel.pl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-gray-700 flex items-center justify-center hover:border-white transition-colors"
                  aria-label="Udostępnij przez WhatsApp"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="sm:col-span-1 lg:col-span-1">
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

          {/* Contact info - Enhanced */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-lg font-light mb-8 uppercase tracking-wider">Kontakt</h3>
            
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start space-x-4">
                <MapPin className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                <div className="text-gray-400 font-light">
                  <div className="mb-1">Aleja Stefana Batorego 60</div>
                  <div>33-300 Nowy Sącz</div>
                </div>
              </div>
              
              {/* Phone */}
              <div className="flex items-start space-x-4">
                <Phone className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                <div>
                  <a 
                    href="tel:+48505461050" 
                    className="text-gray-400 hover:text-white transition-colors font-light block"
                  >
                    +48 505 461 050
                  </a>
                  <span className="text-sm text-gray-500 font-light">Obsługa klienta</span>
                </div>
              </div>
              
              {/* Email */}
              <div className="flex items-start space-x-4">
                <Mail className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                <div>
                  <a 
                    href="mailto:voyager.sopel@gmail.com" 
                    className="text-gray-400 hover:text-white transition-colors font-light block break-all"
                  >
                    voyager.sopel@gmail.com
                  </a>
                  <span className="text-sm text-gray-500 font-light">Zapytania ogólne</span>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start space-x-4">
                <Clock className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                <div className="text-gray-400 font-light">
                  <div className="mb-3 font-light">Godziny pracy</div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Pon - Pt:</span>
                      <span className="ml-2">6:00 - 14:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sobota:</span>
                      <span className="ml-2 text-gray-500">Zamknięte</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Niedziela:</span>
                      <span className="ml-2 text-gray-500">Zamknięte</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm font-light">
              © 2025 Voyager. Wszystkie prawa zastrzeżone.
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-8 text-sm text-center sm:text-left">
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

        {/* Developer credit */}
        <div className="py-4 border-t border-gray-800/50">
          <div className="text-center">
            <p className="text-gray-500 text-xs font-light">
              Strona zaprojektowana i wykonana przez{' '}
              <a 
                href="https://www.micheldev.pl" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors font-medium"
              >
                MichelDev
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
