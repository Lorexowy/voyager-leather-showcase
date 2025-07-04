'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Award, Users, Leaf, Heart, Target, Shield, Star, Factory, Hammer, Clock, CheckCircle, Sparkles, X, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

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

const comparisons = [
  {
    category: 'Materiały',
    standard: { icon: Factory, text: 'Materiały syntetyczne', subtext: 'Sklej, sztuczna skóra', negative: true },
    voyager: { icon: Leaf, text: '100% skóra naturalna', subtext: 'Najwyższa jakość', premium: true }
  },
  {
    category: 'Produkcja',
    standard: { icon: Factory, text: 'Produkcja masowa', subtext: 'Automatyzacja', negative: true },
    voyager: { icon: Hammer, text: 'Ręczne rzemiosło', subtext: '21 lat doświadczenia', premium: true }
  },
  {
    category: 'Trwałość',
    standard: { icon: AlertTriangle, text: 'Krótka żywotność', subtext: 'Miesiące użytkowania', negative: true },
    voyager: { icon: Shield, text: 'Produkt na lata', subtext: 'Dożywotnia trwałość', premium: true }
  },
  {
    category: 'Gwarancja',
    standard: { icon: X, text: 'Brak gwarancji', subtext: 'Bez wsparcia', negative: true },
    voyager: { icon: CheckCircle, text: 'Gwarancja jakości', subtext: 'Pełne wsparcie', premium: true }
  },
  {
    category: 'Personalizacja',
    standard: { icon: Factory, text: 'Standardowe wzory', subtext: 'Jedna opcja', negative: true },
    voyager: { icon: Sparkles, text: 'Pełna personalizacja', subtext: 'Indywidualne projekty', premium: true }
  }
];

const stats = [
  { number: '21', label: 'Lat doświadczenia' },
  { number: '100%', label: 'Skóra naturalna' }
];

export default function AboutPage() {
  const [hoveredSide, setHoveredSide] = useState<'standard' | 'voyager' | null>(null);
  const [activeSide, setActiveSide] = useState<'standard' | 'voyager' | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section with Interactive Comparator */}
      <section className="relative py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-light text-gray-900 mb-8 leading-none tracking-tight">
              O Firmie
              <span className="text-gray-600 block font-light">Voyager</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 sm:mb-12 leading-relaxed font-light max-w-3xl mx-auto px-4 sm:px-0">
              Od ponad 21 lat tworzymy wyjątkowe produkty ze skóry naturalnej, 
              łącząc tradycyjne rzemiosło z nowoczesnym designem. Nasza misja to 
              dostarczanie produktów najwyższej jakości, które służą przez lata.
            </p>
          </div>

          {/* Interactive Comparator */}
          <div className="bg-gray-50 border border-gray-200 overflow-hidden">
            <div className="text-center py-6 sm:py-8 bg-white border-b border-gray-200 px-4">
              <h2 className="text-xl sm:text-2xl font-light text-gray-900 tracking-tight">
                Dlaczego Voyager?
              </h2>
              <p className="text-gray-600 font-light mt-2 text-sm sm:text-base">
                Porównaj nasze produkty z przeciętnymi na rynku
              </p>
              <p className="text-xs text-gray-500 mt-2 sm:hidden">
                Dotknij aby porównać
              </p>
            </div>

            {/* Desktop Layout - Split Screen */}
            <div className="hidden lg:grid lg:grid-cols-2 min-h-[500px]">
              {/* Left Side - Standard Products */}
              <div 
                className={`bg-gray-100 p-8 border-r border-gray-200 transition-all duration-500 cursor-pointer relative ${
                  hoveredSide === 'standard' ? 'bg-gray-200' : ''
                } ${hoveredSide === 'voyager' ? 'bg-gray-50 opacity-60' : ''}`}
                onMouseEnter={() => setHoveredSide('standard')}
                onMouseLeave={() => setHoveredSide(null)}
                onClick={() => setActiveSide(activeSide === 'standard' ? null : 'standard')}
              >
                {/* Subtle overlay for "mediocre" feeling */}
                <div className="absolute top-4 right-4 text-gray-400">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                
                <div className="text-center mb-8">
                  <h3 className="text-lg font-light text-gray-700 mb-2 opacity-90">Przeciętne produkty</h3>
                  <div className="w-10 h-10 bg-gray-300 border border-gray-400 flex items-center justify-center mx-auto opacity-75">
                    <Factory className="w-5 h-5 text-gray-600" />
                  </div>
                </div>

                <div className="space-y-5">
                  {comparisons.map((comp, index) => {
                    const Icon = comp.standard.icon;
                    return (
                      <div 
                        key={index}
                        className={`transition-all duration-300 opacity-85 ${
                          hoveredSide === 'standard' ? 'transform translate-x-1 opacity-100' : ''
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="w-7 h-7 border border-gray-400 bg-gray-200 flex items-center justify-center flex-shrink-0 mt-1 opacity-75">
                            <Icon className="w-3.5 h-3.5 text-gray-600" />
                          </div>
                          <div>
                            <h4 className="font-light text-gray-700 mb-1 text-sm leading-tight">{comp.standard.text}</h4>
                            <p className="text-xs text-gray-500 font-light">{comp.standard.subtext}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Side - Voyager Products */}
              <div 
                className={`bg-white p-8 transition-all duration-500 cursor-pointer relative shadow-sm ${
                  hoveredSide === 'voyager' ? 'bg-gray-50 shadow-md' : ''
                } ${hoveredSide === 'standard' ? 'opacity-60' : ''}`}
                onMouseEnter={() => setHoveredSide('voyager')}
                onMouseLeave={() => setHoveredSide(null)}
                onClick={() => setActiveSide(activeSide === 'voyager' ? null : 'voyager')}
              >
                {/* Premium badge */}
                <div className="absolute top-4 right-4">
                  <div className="inline-flex items-center bg-gray-900 text-white px-2 py-1 text-xs font-light uppercase tracking-wider">
                    <Star className="w-3 h-3 mr-1" />
                    Premium
                  </div>
                </div>
                
                <div className="text-center mb-8">
                  <h3 className="text-xl font-medium text-gray-900 mb-3 tracking-tight">Produkty Voyager</h3>
                  <div className="w-14 h-14 bg-gray-900 border-2 border-gray-900 flex items-center justify-center mx-auto shadow-sm">
                    <Award className="w-7 h-7 text-white" />
                  </div>
                </div>

                <div className="space-y-7">
                  {comparisons.map((comp, index) => {
                    const Icon = comp.voyager.icon;
                    return (
                      <div 
                        key={index}
                        className={`transition-all duration-300 ${
                          hoveredSide === 'voyager' ? 'transform -translate-x-2' : ''
                        }`}
                      >
                        <div className="flex items-start space-x-4">
                          <div className="w-9 h-9 border-2 border-gray-900 bg-gray-900 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="font-medium text-gray-900 leading-tight">{comp.voyager.text}</h4>
                              <CheckCircle className="w-4 h-4 text-gray-700 flex-shrink-0" />
                            </div>
                            <p className="text-sm text-gray-600 font-light leading-relaxed">{comp.voyager.subtext}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom guarantee */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                    <Shield className="w-4 h-4" />
                    <span className="font-light">Gwarancja najwyższej jakości</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile/Tablet Layout - Alternating Sections */}
            <div className="lg:hidden">
              {/* Toggle Buttons for Mobile */}
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveSide(activeSide === 'standard' ? null : 'standard')}
                  className={`flex-1 py-4 px-4 text-center transition-all duration-300 ${
                    activeSide === 'standard' 
                      ? 'bg-gray-200 text-gray-900' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-150'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Factory className="w-4 h-4" />
                    <AlertTriangle className="w-3 h-3 opacity-60" />
                  </div>
                  <span className="text-xs font-light mt-1 block">Przeciętne produkty</span>
                </button>
                <button
                  onClick={() => setActiveSide(activeSide === 'voyager' ? null : 'voyager')}
                  className={`flex-1 py-4 px-4 text-center transition-all duration-300 border-l border-gray-200 ${
                    activeSide === 'voyager' 
                      ? 'bg-gray-900 text-white' 
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Award className="w-4 h-4" />
                    <Star className="w-3 h-3" />
                  </div>
                  <span className="text-xs font-light mt-1 block">Produkty Voyager</span>
                </button>
              </div>

              {/* Mobile Content */}
              <div className="p-4 sm:p-6">
                {comparisons.map((comp, index) => (
                  <div key={index} className="mb-6 last:mb-0">
                    <h4 className="text-center text-sm font-light text-gray-500 mb-4 uppercase tracking-wider">
                      {comp.category}
                    </h4>
                    
                    <div className="space-y-4">
                      {/* Standard Product */}
                      <div 
                        className={`p-4 rounded-lg border transition-all duration-300 relative ${
                          activeSide === 'standard' || activeSide === null 
                            ? 'bg-gray-100 border-gray-300' 
                            : 'bg-gray-50 border-gray-200 opacity-50'
                        }`}
                      >
                        <div className="absolute top-2 right-2">
                          <X className="w-3 h-3 text-gray-400" />
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-7 h-7 border border-gray-400 bg-gray-200 flex items-center justify-center flex-shrink-0 opacity-75">
                            <comp.standard.icon className="w-3.5 h-3.5 text-gray-600" />
                          </div>
                          <div className="flex-1 pr-6">
                            <h5 className="font-light text-gray-700 text-sm sm:text-base opacity-90">{comp.standard.text}</h5>
                            <p className="text-xs sm:text-sm text-gray-500 font-light">{comp.standard.subtext}</p>
                          </div>
                        </div>
                      </div>

                      {/* Voyager Product */}
                      <div 
                        className={`p-4 rounded-lg border transition-all duration-300 relative shadow-sm ${
                          activeSide === 'voyager' || activeSide === null 
                            ? 'bg-white border-gray-900' 
                            : 'bg-gray-50 border-gray-200 opacity-50'
                        }`}
                      >
                        <div className="absolute top-2 right-2">
                          <div className="flex items-center space-x-1">
                            <CheckCircle className="w-3 h-3 text-gray-700" />
                            <Star className="w-3 h-3 text-gray-700" />
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 border-2 border-gray-900 bg-gray-900 flex items-center justify-center flex-shrink-0 shadow-sm">
                            <comp.voyager.icon className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1 pr-12">
                            <h5 className="font-medium text-gray-900 text-sm sm:text-base">{comp.voyager.text}</h5>
                            <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed">{comp.voyager.subtext}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 sm:mt-12 px-4 sm:px-0">
            <Link 
              href="/produkty"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gray-900 text-white font-light hover:bg-gray-800 transition-all duration-300 group uppercase tracking-wider text-sm sm:text-base"
            >
              <span>Zobacz nasze produkty</span>
            </Link>
            
            <Link 
              href="/kontakt"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border border-gray-900 text-gray-900 font-light hover:bg-gray-900 hover:text-white transition-all duration-300 uppercase tracking-wider text-sm sm:text-base"
            >
              <span>Skontaktuj się z nami</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
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

      {/* Values Section */}
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

      {/* AS Line Section */}
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

      {/* Contact CTA */}
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