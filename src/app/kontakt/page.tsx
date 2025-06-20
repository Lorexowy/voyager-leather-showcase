'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import { MapPin, Phone, Mail, Clock, MessageSquare } from 'lucide-react';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Adres',
    details: ['ul. Przykładowa 123', '00-000 Warszawa'],
    action: 'Znajdź nas na mapie'
  },
  {
    icon: Phone,
    title: 'Telefon',
    details: ['+48 123 456 789'],
    action: 'Zadzwoń do nas',
    href: 'tel:+48123456789'
  },
  {
    icon: Mail,
    title: 'Email',
    details: ['kontakt@voyager.pl'],
    action: 'Napisz do nas',
    href: 'mailto:kontakt@voyager.pl'
  },
  {
    icon: Clock,
    title: 'Godziny pracy',
    details: ['Pon - Pt: 8:00 - 17:00', 'Sob: 9:00 - 14:00', 'Niedz: zamknięte'],
    action: 'Umów spotkanie'
  }
];

export default function ContactPage() {
  const searchParams = useSearchParams();
  const [selectedProduct, setSelectedProduct] = useState<string>('');

  useEffect(() => {
    const productId = searchParams.get('product');
    if (productId) {
      setSelectedProduct(productId);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-25 to-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-serif font-bold text-brown-900 mb-4">
            Skontaktuj się z nami
          </h1>
          <p className="text-lg text-brown-600 max-w-2xl mx-auto">
            Masz pytania o nasze produkty? Chcesz złożyć zamówienie lub potrzebujesz więcej informacji? 
            Jesteśmy tutaj, aby Ci pomóc!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h2 className="text-2xl font-serif font-bold text-brown-900 mb-6">
                Informacje kontaktowe
              </h2>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-brown-700 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-medium text-brown-800 mb-2">{info.title}</h3>
                        <div className="text-sm text-brown-600 space-y-1">
                          {info.details.map((detail, detailIndex) => (
                            <div key={detailIndex}>{detail}</div>
                          ))}
                        </div>
                        {info.href ? (
                          <a 
                            href={info.href}
                            className="inline-block mt-2 text-sm text-brown-700 hover:text-brown-900 font-medium transition-colors"
                          >
                            {info.action}
                          </a>
                        ) : (
                          <div className="mt-2 text-sm text-brown-700 font-medium">
                            {info.action}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Why choose us */}
            <div className="bg-primary-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-brown-900 mb-4">
                Dlaczego warto z nami współpracować?
              </h3>
              <ul className="space-y-3 text-sm text-brown-700">
                <li className="flex items-start space-x-3">
                  <MessageSquare className="w-4 h-4 text-brown-600 mt-0.5 flex-shrink-0" />
                  <span>Odpowiadamy na zapytania w ciągu 24 godzin</span>
                </li>
                <li className="flex items-start space-x-3">
                  <MessageSquare className="w-4 h-4 text-brown-600 mt-0.5 flex-shrink-0" />
                  <span>Profesjonalne doradztwo i indywidualne podejście</span>
                </li>
                <li className="flex items-start space-x-3">
                  <MessageSquare className="w-4 h-4 text-brown-600 mt-0.5 flex-shrink-0" />
                  <span>Możliwość personalizacji produktów</span>
                </li>
                <li className="flex items-start space-x-3">
                  <MessageSquare className="w-4 h-4 text-brown-600 mt-0.5 flex-shrink-0" />
                  <span>Konkurencyjne ceny dla zamówień hurtowych</span>
                </li>
              </ul>
            </div>

            {/* Business hours highlight */}
            <div className="bg-brown-50 border border-brown-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-brown-900 mb-2">
                Godziny obsługi klienta
              </h3>
              <p className="text-brown-700 text-sm mb-3">
                Jesteśmy dostępni telefonicznie i mailowo w następujących godzinach:
              </p>
              <div className="text-sm text-brown-600 space-y-1">
                <div className="flex justify-between">
                  <span>Poniedziałek - Piątek:</span>
                  <span className="font-medium">8:00 - 17:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sobota:</span>
                  <span className="font-medium">9:00 - 14:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Niedziela:</span>
                  <span className="font-medium text-red-600">Zamknięte</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-serif font-bold text-brown-900 mb-2">
                Wyślij nam wiadomość
              </h2>
              <p className="text-brown-600 mb-8">
                Wypełnij formularz poniżej, a skontaktujemy się z Tobą w najkrótszym możliwym czasie.
              </p>
              
              <ContactForm selectedProductId={selectedProduct} />
            </div>
          </div>
        </div>

        {/* Map placeholder */}
        <div className="mt-16">
          <h2 className="text-2xl font-serif font-bold text-brown-900 mb-8 text-center">
            Nasza lokalizacja
          </h2>
          
          <div className="bg-gradient-to-br from-brown-100 to-brown-200 rounded-2xl shadow-lg h-96 flex items-center justify-center">
            <div className="text-center text-brown-600">
              <MapPin className="w-16 h-16 mx-auto mb-4 text-brown-500" />
              <h3 className="text-xl font-bold mb-2">Mapa Google</h3>
              <p className="text-sm opacity-80">Tutaj zostanie umieszczona interaktywna mapa</p>
              <p className="text-sm opacity-80">ul. Przykładowa 123, 00-000 Warszawa</p>
            </div>
          </div>
        </div>

        {/* Additional contact options */}
        <div className="mt-16 bg-brown-900 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-serif font-bold mb-4">
            Potrzebujesz natychmiastowej pomocy?
          </h2>
          <p className="text-brown-200 mb-8 max-w-2xl mx-auto">
            Jeśli masz pilne pytania dotyczące zamówienia lub potrzebujesz szybkiej wyceny, 
            skontaktuj się z nami bezpośrednio przez telefon.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+48123456789"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-brown-900 font-medium rounded-lg hover:bg-primary-500 transition-all duration-300"
            >
              <Phone className="w-5 h-5 mr-2" />
              Zadzwoń teraz
            </a>
            
            <a
              href="mailto:kontakt@voyager.pl"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary-400 text-primary-400 font-medium rounded-lg hover:bg-primary-400 hover:text-brown-900 transition-all duration-300"
            >
              <Mail className="w-5 h-5 mr-2" />
              Napisz email
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}