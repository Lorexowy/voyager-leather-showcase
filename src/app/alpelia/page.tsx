'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { ArrowRight, ExternalLink, ShoppingBag, Shield, Truck, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const faqs = [
  {
    q: 'Czy produkty dostępne w sklepie Alpelia to te same produkty co oferowane przez Voyager?',
    a: 'Tak, wszystkie produkty dostępne w sklepie Alpelia są wykonane z tej samej najwyższej jakości skóry naturalnej i produkowane przez Voyager. Partner handlowy Alpelia oferuje nasze produkty w sprzedaży detalicznej.'
  },
  {
    q: 'Jak mogę zamówić produkty Voyager detalicznie?',
    a: 'Możesz zamówić nasze produkty detalicznie bezpośrednio ze sklepu internetowego Alpelia pod adresem www.alpelia.pl. Sklep oferuje wygodne zamówienia online z szybką dostawą do domu.'
  },
  {
    q: 'Czy produkty dostępne w Alpelii mają taką samą jakość jak produkty oferowane bezpośrednio przez Voyager?',
    a: 'Tak, absolutnie. Wszystkie produkty dostępne w sklepie Alpelia są produkowane przez Voyager z tej samej najwyższej jakości skóry naturalnej i z tą samą dbałością o detale. Różnica dotyczy jedynie kanału sprzedaży.'
  }
];

export default function AlpeliaPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-100 via-gray-50 to-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.03),transparent_50%)]"></div>
        </div>

        <div className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center max-w-4xl mx-auto">
              {/* Logo Alpelia */}
              <div className="mb-16 flex justify-center">
                <div className="relative w-72 h-36 md:w-96 md:h-48">
                  <Image
                    src="/images/logo/alpelia_logo.png"
                    alt="Alpelia - Partner handlowy Voyager"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              <Link 
                href="https://www.alpelia.pl" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white font-light rounded-sm hover:bg-black transition-all duration-300 group uppercase tracking-wide shadow-sm"
              >
                <span>Przejdź do sklepu</span>
                <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="animate-subtle-bounce">
            <ChevronDown className="w-5 h-5 text-gray-400" strokeWidth={1.5} />
          </div>
        </div>
      </section>

      {/* Informational Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-medium text-gray-900 mb-8 tracking-tight">
                Nasz Partner Handlowy
              </h2>
              
              <div className="space-y-6 text-gray-600 font-light leading-relaxed">
                <p className="text-lg">
                  Jeśli chcą Państwo <strong className="font-medium text-gray-900">kupić nasze produkty detalicznie</strong>, 
                  zapraszamy na sklep internetowy naszego partnera handlowego <strong className="font-medium text-gray-900">Alpelia</strong>.
                </p>
                
                <p>
                  Współpracujemy z <strong className="font-medium text-gray-900">Alpelią</strong>, aby zapewnić naszym klientom 
                  wygodny dostęp do pełnej oferty produktów Voyager w sprzedaży detalicznej. 
                  Sklep oferuje szeroki wybór naszych produktów skórzanych, które można zamówić online.
                </p>
                
                <p>
                  Wszystkie produkty dostępne w sklepie są wykonane z najwyższej jakości skóry naturalnej, 
                  takiej samej jak produkty oferowane bezpośrednio przez Voyager dla klientów biznesowych.
                </p>
              </div>

              <div className="mt-10">
                <Link 
                  href="https://www.alpelia.pl" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white font-light rounded-sm hover:bg-black transition-all duration-300 group uppercase tracking-wide shadow-sm"
                >
                  <span>Odwiedź sklep Alpelia</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Bento Grid Features */}
            <div className="grid grid-cols-2 gap-4 h-full">
              {/* Large card - Szeroka Oferta */}
              <div className="col-span-2 p-8 border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-gray-50 to-white">
                <div className="flex flex-col h-full">
                  <div className="w-14 h-14 border border-gray-300 flex items-center justify-center mb-6 rounded-lg bg-white">
                    <ShoppingBag className="w-7 h-7 text-gray-700" />
                  </div>
                  <h3 className="text-2xl font-medium text-gray-900 mb-3 tracking-tight">
                    Szeroka Oferta
                  </h3>
                  <p className="text-gray-600 font-light leading-relaxed text-base">
                    Pełna gama produktów Voyager dostępna w sprzedaży detalicznej.
                  </p>
                </div>
              </div>

              {/* Medium card - Ta Sama Jakość */}
              <div className="col-span-1 p-6 border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-lg transition-all duration-300 bg-white">
                <div className="flex flex-col h-full">
                  <div className="w-12 h-12 border border-gray-300 flex items-center justify-center mb-4 rounded-lg bg-gray-50">
                    <Shield className="w-6 h-6 text-gray-700" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2 tracking-tight">
                    Ta Sama Jakość
                  </h3>
                  <p className="text-gray-600 font-light leading-relaxed text-sm">
                    Produkty tej samej najwyższej jakości, co w ofercie bezpośredniej.
                  </p>
                </div>
              </div>

              {/* Medium card - Szybka Dostawa */}
              <div className="col-span-1 p-6 border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-lg transition-all duration-300 bg-white">
                <div className="flex flex-col h-full">
                  <div className="w-12 h-12 border border-gray-300 flex items-center justify-center mb-4 rounded-lg bg-gray-50">
                    <Truck className="w-6 h-6 text-gray-700" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2 tracking-tight">
                    Szybka Dostawa
                  </h3>
                  <p className="text-gray-600 font-light leading-relaxed text-sm">
                    Wygodne zamówienia online z szybką dostawą do domu.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-light text-gray-900 mb-4 tracking-tight">
              Najczęstsze pytania
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto font-light">
              Odpowiedzi na najważniejsze pytania dotyczące sprzedaży detalicznej.
            </p>
          </div>
          <div className="divide-y divide-gray-200 border border-gray-200 rounded-2xl overflow-hidden bg-white">
            {faqs.map((item, i) => (
              <details key={i} className="group">
                <summary className="list-none cursor-pointer select-none flex items-start gap-4 p-6 hover:bg-gray-50">
                  <div className="mt-1 w-2 h-2 rounded-full bg-gray-300 group-open:bg-gray-800 transition-colors"></div>
                  <h3 className="flex-1 text-lg font-light text-gray-900">{item.q}</h3>
                  <span className="ml-4 text-gray-400 group-open:rotate-45 transition-transform text-2xl leading-none">+</span>
                </summary>
                <div className="px-6 pb-6 text-gray-600 font-light leading-relaxed">{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
