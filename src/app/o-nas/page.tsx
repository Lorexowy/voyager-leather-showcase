'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Award, Users, Leaf, Clock, Heart, Target, Shield, Star } from 'lucide-react';
import Link from 'next/link';

const values = [
  {
    icon: Award,
    title: 'Najwyższa Jakość',
    description: 'Każdy produkt wykonujemy z najwyższej jakości skóry naturalnej, starannie dobieranej od sprawdzonych dostawców.'
  },
  {
    icon: Heart,
    title: 'Pasja do Rzemiosła',
    description: 'Nasze produkty powstają z pasją i miłością do tradycyjnego rzemiosła skórzanego, przekazywanego z pokolenia na pokolenie.'
  },
  {
    icon: Users,
    title: 'Indywidualne Podejście',
    description: 'Każdy klient jest dla nas wyjątkowy. Oferujemy personalizację produktów i profesjonalne doradztwo.'
  },
  {
    icon: Leaf,
    title: 'Odpowiedzialność',
    description: 'Dbamy o środowisko, wykorzystując skóry z etycznych źródeł i stosując ekologiczne procesy produkcji.'
  }
];

const timeline = [
  {
    year: '2004',
    title: 'Początek działalności',
    description: 'Firma Voyager rozpoczyna działalność jako mały warsztat rodzinny specjalizujący się w produkcji pasków skórzanych.'
  },
  {
    year: '2012',
    title: 'Rozszerzenie oferty',
    description: 'Wprowadzamy do oferty torebki damskie i plecaki, odpowiadając na rosnące zapotrzebowanie klientów.'
  },
  {
    year: '2016',
    title: 'Współpraca z firmami',
    description: 'Rozpoczynamy świadczenie usług personalizacji dla przedsiębiorstw, tworząc unikalne gadżety firmowe.'
  },
  {
    year: '2020',
    title: 'Linia Premium AS',
    description: 'Wprowadzamy ekskluzywną linię "AS | Aleksandra Sopel" - produkty najwyższej jakości dla najbardziej wymagających klientów.'
  },
  {
    year: '2024',
    title: 'Obecność online',
    description: 'Uruchamiamy nową platformę cyfrową, aby lepiej prezentować nasze produkty klientom hurtowym.'
  }
];

const stats = [
  { number: '21', label: 'Lat doświadczenia' },
  { number: '100%', label: 'Skóra naturalna' }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section - minimal */}
      <section className="relative py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-6xl font-light text-gray-900 mb-8 leading-none tracking-tight">
                O Firmie
                <span className="text-gray-600 block font-light">Voyager</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-12 leading-relaxed font-light">
                Od ponad 21 lat tworzymy wyjątkowe produkty ze skóry naturalnej, 
                łącząc tradycyjne rzemiosło z nowoczesnym designem. Nasza misja to 
                dostarczanie produktów najwyższej jakości, które służą przez lata.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/produkty"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white font-light hover:bg-gray-800 transition-all duration-300 group uppercase tracking-wider"
                >
                  <span>Zobacz nasze produkty</span>
                </Link>
                
                <Link 
                  href="/kontakt"
                  className="inline-flex items-center justify-center px-8 py-4 border border-gray-900 text-gray-900 font-light hover:bg-gray-900 hover:text-white transition-all duration-300 uppercase tracking-wider"
                >
                  <span>Skontaktuj się z nami</span>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-[4/5] bg-gray-50 border border-gray-200 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-gray-300">
                    <div className="w-24 h-24 mx-auto mb-6 border border-gray-200 flex items-center justify-center">
                      <Award className="w-12 h-12" />
                    </div>
                    <p className="text-lg font-light">Naszy zespół w pracy</p>
                    <p className="text-sm font-light">Zdjęcie z warsztatów</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - minimal */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-2 gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-light mb-3">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm font-light uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section - minimal */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-light text-gray-900 mb-6 tracking-tight">
              Nasze Wartości
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
              To, co wyróżnia nas na rynku i sprawia, że nasze produkty są wyjątkowe.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div 
                  key={index}
                  className="text-center"
                >
                  <div className="w-12 h-12 border border-gray-300 flex items-center justify-center mx-auto mb-8">
                    <Icon className="w-6 h-6 text-gray-600" />
                  </div>
                  <h3 className="text-xl font-light text-gray-900 mb-4 tracking-tight">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed font-light">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section - minimal */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-light text-gray-900 mb-6 tracking-tight">
              Nasza Historia
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
              Poznaj kluczowe momenty w rozwoju firmy Voyager.
            </p>
          </div>

          <div className="space-y-16">
            {timeline.map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="flex-1">
                  <div className="bg-white border border-gray-200 p-8 hover:border-gray-900 transition-colors">
                    <div className="text-3xl font-light text-gray-600 mb-3">{item.year}</div>
                    <h3 className="text-xl font-light text-gray-900 mb-4">{item.title}</h3>
                    <p className="text-gray-600 font-light">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AS Line Section - minimal */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center bg-white/10 text-white px-4 py-2 text-sm font-light mb-8 uppercase tracking-wider">
              <Star className="w-4 h-4 mr-2" />
              Kolekcja Premium
            </div>
            
            <h2 className="text-4xl font-light mb-8 tracking-tight">
              AS | Aleksandra Sopel
            </h2>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
              Nasza ekskluzywna linia produktów premium, stworzona z najwyższej jakości skóry naturalnej. 
              Każdy element kolekcji AS to połączenie tradycyjnego rzemiosła z nowoczesnym designem.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white/5 border border-white/10 p-8">
                <Shield className="w-8 h-8 mx-auto mb-6" />
                <h3 className="font-light mb-3 uppercase tracking-wider">Gwarancja Jakości</h3>
                <p className="text-gray-400 text-sm font-light">Dożywotnia gwarancja na wszystkie produkty z linii AS</p>
              </div>
              
              <div className="bg-white/5 border border-white/10 p-8">
                <Target className="w-8 h-8 mx-auto mb-6" />
                <h3 className="font-light mb-3 uppercase tracking-wider">Precyzja Wykonania</h3>
                <p className="text-gray-400 text-sm font-light">Każdy szczegół dopracowany do perfekcji</p>
              </div>
              
              <div className="bg-white/5 border border-white/10 p-8">
                <Star className="w-8 h-8 mx-auto mb-6" />
                <h3 className="font-light mb-3 uppercase tracking-wider">Ekskluzywność</h3>
                <p className="text-gray-400 text-sm font-light">Limitowane serie i unikalne projekty</p>
              </div>
            </div>

            <Link 
              href="/produkty/as-aleksandra-sopel"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-light hover:bg-gray-100 transition-all duration-300 group uppercase tracking-wider"
            >
              <span>Odkryj kolekcję AS</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact CTA - minimal */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-light text-gray-900 mb-6 tracking-tight">
            Masz pytania o naszą firmę?
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto font-light">
            Chętnie opowiemy Ci więcej o naszej historii, procesie produkcji i wartościach, 
            którymi się kierujemy.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/kontakt"
              className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white font-light hover:bg-gray-800 transition-all duration-300 uppercase tracking-wider"
            >
              Skontaktuj się z nami
            </Link>
            
            <Link
              href="/produkty"
              className="inline-flex items-center justify-center px-8 py-4 border border-gray-900 text-gray-900 font-light hover:bg-gray-900 hover:text-white transition-all duration-300 uppercase tracking-wider"
            >
              Zobacz nasze produkty
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}