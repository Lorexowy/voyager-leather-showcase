'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Adres',
    details: ['Aleja Stefana Batorego 60', '33-300 Nowy Sącz']
  },
  {
    icon: Phone,
    title: 'Telefon',
    details: ['+48 505 461 050'],
    href: 'tel:+48505461050'
  },
  {
    icon: Mail,
    title: 'Email',
    details: ['voyager.sopel@gmail.com'],
    href: 'mailto:voyager.sopel@gmail.com'
  },
  {
    icon: Clock,
    title: 'Godziny pracy',
    details: ['Pon - Pt: 6:00 - 14:00', 'Sob: zamknięte', 'Niedz: zamknięte']
  }
];

// Komponent który używa useSearchParams musi być w Suspense
function ContactFormWrapper() {
  const searchParams = useSearchParams();
  const [selectedProduct, setSelectedProduct] = useState<string>('');

  useEffect(() => {
    const productId = searchParams.get('product');
    if (productId) {
      setSelectedProduct(productId);
    }
  }, [searchParams]);

  return <ContactForm selectedProductId={selectedProduct} />;
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Page Header - minimal */}
        <div className="text-center mb-24">
          <h1 className="text-5xl font-light text-gray-900 mb-8 tracking-tight">
            Kontakt
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            Masz pytania o nasze produkty? Skontaktuj się z nami – 
            odpowiemy w ciągu 24 godzin.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-16">
          {/* Contact Information - minimal */}
          <div className="lg:col-span-2 space-y-12">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div key={index} className="flex items-start space-x-6">
                  <div className="w-12 h-12 border border-gray-300 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-gray-600" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-light text-gray-900 mb-4 text-lg uppercase tracking-wider">
                      {info.title}
                    </h3>
                    <div className="text-gray-600 space-y-1 font-light">
                      {info.details.map((detail, detailIndex) => (
                        <div key={detailIndex}>
                          {info.href ? (
                            <a 
                              href={info.href}
                              className="hover:text-gray-900 transition-colors"
                            >
                              {detail}
                            </a>
                          ) : (
                            detail
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Contact Form - WRAPPED IN SUSPENSE */}
          <div className="lg:col-span-3">
            <div className="bg-gray-50 p-12">
              <h2 className="text-2xl font-light text-gray-900 mb-2 tracking-tight">
                Wyślij wiadomość
              </h2>
              <p className="text-gray-600 mb-12 font-light">
                Wypełnij formularz poniżej, a skontaktujemy się z Tobą w najkrótszym możliwym czasie.
              </p>
              
              <Suspense fallback={
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded mb-6"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded mb-6"></div>
                  <div className="h-32 bg-gray-200 rounded mb-6"></div>
                </div>
              }>
                <ContactFormWrapper />
              </Suspense>
            </div>
          </div>
        </div>

        {/* Map section - minimal */}
        <div className="mt-32">
          <h2 className="text-3xl font-light text-gray-900 mb-16 text-center tracking-tight">
            Nasza Lokalizacja
          </h2>
          
          <div className="bg-gray-50 border border-gray-200 h-96 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <div className="w-20 h-20 mx-auto mb-6 border border-gray-200 flex items-center justify-center">
                <MapPin className="w-10 h-10 text-gray-300" />
              </div>
              <h3 className="text-xl font-light text-gray-600 mb-2">Interaktywna Mapa</h3>
              <p className="text-sm font-light text-gray-500">ul. Przykładowa 123, 00-000 Warszawa</p>
            </div>
          </div>
        </div>

        {/* Bottom CTA - minimal */}
        <div className="mt-32 text-center bg-gray-900 text-white p-16">
          <h2 className="text-3xl font-light mb-6 tracking-tight">
            Potrzebujesz skontaktować się jak najszybciej?
          </h2>
          <p className="text-gray-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Jeśli masz pilne pytania dotyczące zamówienia lub potrzebujesz szybkiej wyceny, 
            skontaktuj się z nami bezpośrednio.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+48123456789"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-light hover:bg-gray-100 transition-all duration-300 uppercase tracking-wider"
            >
              <Phone className="w-4 h-4 mr-3" />
              Zadzwoń teraz
            </a>
            
            <a
              href="mailto:kontakt@voyager.pl"
              className="inline-flex items-center justify-center px-8 py-4 border border-white text-white font-light hover:bg-white hover:text-gray-900 transition-all duration-300 uppercase tracking-wider"
            >
              <Mail className="w-4 h-4 mr-3" />
              Napisz email
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}