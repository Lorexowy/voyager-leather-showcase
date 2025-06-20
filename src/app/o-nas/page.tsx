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
    year: '2008',
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

const team = [
  {
    name: 'Aleksandra Sopel',
    role: 'Założycielka i Dyrektor Kreatywny',
    description: 'Wizjoner marki AS, odpowiedzialna za tworzenie ekskluzywnych projektów i nadzór nad jakością produktów.',
    image: '/placeholder-aleksandra.jpg'
  },
  {
    name: 'Marek Kowalski',
    role: 'Mistrz Rzemieślnik',
    description: 'Ekspert z 20-letnim doświadczeniem w pracy ze skórą, odpowiedzialny za jakość wykonania każdego produktu.',
    image: '/placeholder-marek.jpg'
  },
  {
    name: 'Anna Nowak',
    role: 'Kierownik ds. Klientów',
    description: 'Zajmuje się obsługą klientów hurtowych i koordynuje proces personalizacji produktów dla firm.',
    image: '/placeholder-anna.jpg'
  }
];

const stats = [
  { number: '15+', label: 'Lat doświadczenia' },
  { number: '1000+', label: 'Zadowolonych klientów' },
  { number: '50+', label: 'Produktów w ofercie' },
  { number: '100%', label: 'Skóra naturalna' }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-25 to-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-serif font-bold text-brown-900 mb-6 leading-tight">
                O Firmie
                <span className="text-brown-600 block">Voyager</span>
              </h1>
              
              <p className="text-lg text-brown-700 mb-8 leading-relaxed">
                Od ponad 15 lat tworzymy wyjątkowe produkty ze skóry naturalnej, 
                łącząc tradycyjne rzemiosło z nowoczesnym designem. Nasza misja to 
                dostarczanie produktów najwyższej jakości, które służą przez lata.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/produkty"
                  className="inline-flex items-center justify-center px-8 py-4 bg-brown-700 text-white rounded-lg hover:bg-brown-800 transition-all duration-300 group shadow-lg hover:shadow-xl"
                >
                  <span className="font-medium">Zobacz nasze produkty</span>
                </Link>
                
                <Link 
                  href="/kontakt"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-brown-700 text-brown-700 rounded-lg hover:bg-brown-700 hover:text-white transition-all duration-300"
                >
                  <span className="font-medium">Skontaktuj się z nami</span>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-brown-200 to-brown-300 rounded-2xl shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-brown-600">
                    <div className="w-32 h-32 mx-auto mb-4 bg-brown-400/50 rounded-full flex items-center justify-center">
                      <Award className="w-16 h-16" />
                    </div>
                    <p className="text-lg font-medium">Naszy zespół w pracy</p>
                    <p className="text-sm opacity-70">Zdjęcie z warsztatów</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary-300 rounded-2xl rotate-12 opacity-80" />
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-accent-400 rounded-xl -rotate-12 opacity-60" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-brown-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-brown-200 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-brown-900 mb-4">
              Nasze Wartości
            </h2>
            <p className="text-lg text-brown-600 max-w-2xl mx-auto">
              To, co wyróżnia nas na rynku i sprawia, że nasze produkty są wyjątkowe.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div 
                  key={index}
                  className="text-center p-6 rounded-xl bg-primary-50 hover:bg-primary-100 transition-colors duration-300 group"
                >
                  <div className="w-16 h-16 bg-brown-700 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-brown-800 transition-colors">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-brown-900 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-brown-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gradient-to-b from-primary-25 to-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-brown-900 mb-4">
              Nasza Historia
            </h2>
            <p className="text-lg text-brown-600 max-w-2xl mx-auto">
              Poznaj kluczowe momenty w rozwoju firmy Voyager.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-brown-300 h-full hidden md:block"></div>

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Content */}
                  <div className="flex-1 md:px-8">
                    <div className={`bg-white rounded-lg p-6 shadow-lg ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <div className="text-2xl font-bold text-brown-600 mb-2">{item.year}</div>
                      <h3 className="text-xl font-bold text-brown-900 mb-3">{item.title}</h3>
                      <p className="text-brown-700">{item.description}</p>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="hidden md:flex w-6 h-6 bg-brown-600 rounded-full border-4 border-white shadow-lg z-10 flex-shrink-0"></div>

                  {/* Spacer for opposite side */}
                  <div className="flex-1 md:px-8 hidden md:block"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-brown-900 mb-4">
              Nasz Zespół
            </h2>
            <p className="text-lg text-brown-600 max-w-2xl mx-auto">
              Poznaj ludzi, którzy każdego dnia pracują nad tworzeniem wyjątkowych produktów.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="aspect-square bg-gradient-to-br from-brown-200 to-brown-300 rounded-2xl shadow-lg relative overflow-hidden group-hover:shadow-xl transition-shadow duration-300">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-brown-600">
                        <div className="w-20 h-20 mx-auto mb-2 bg-brown-400/50 rounded-full flex items-center justify-center">
                          <Users className="w-10 h-10" />
                        </div>
                        <p className="text-sm font-medium">{member.name}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-brown-900 mb-2">{member.name}</h3>
                <div className="text-brown-600 font-medium mb-3">{member.role}</div>
                <p className="text-brown-700 text-sm leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AS Line Section */}
      <section className="py-20 bg-gradient-to-r from-accent-100 to-accent-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center bg-accent-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Star className="w-4 h-4 mr-2" />
              Kolekcja Premium
            </div>
            
            <h2 className="text-4xl font-serif font-bold text-accent-900 mb-6">
              AS | Aleksandra Sopel
            </h2>
            
            <p className="text-lg text-accent-800 max-w-3xl mx-auto mb-8 leading-relaxed">
              Nasza ekskluzywna linia produktów premium, stworzona z najwyższej jakości skóry naturalnej. 
              Każdy element kolekcji AS to połączenie tradycyjnego rzemiosła z nowoczesnym designem, 
              przeznaczone dla najbardziej wymagających klientów.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white/80 rounded-lg p-6">
                <Shield className="w-8 h-8 text-accent-600 mx-auto mb-4" />
                <h3 className="font-bold text-accent-900 mb-2">Gwarancja Jakości</h3>
                <p className="text-accent-700 text-sm">Dożywotnia gwarancja na wszystkie produkty z linii AS</p>
              </div>
              
              <div className="bg-white/80 rounded-lg p-6">
                <Target className="w-8 h-8 text-accent-600 mx-auto mb-4" />
                <h3 className="font-bold text-accent-900 mb-2">Precyzja Wykonania</h3>
                <p className="text-accent-700 text-sm">Każdy szczegół dopracowany do perfekcji</p>
              </div>
              
              <div className="bg-white/80 rounded-lg p-6">
                <Star className="w-8 h-8 text-accent-600 mx-auto mb-4" />
                <h3 className="font-bold text-accent-900 mb-2">Ekskluzywność</h3>
                <p className="text-accent-700 text-sm">Limitowane serie i unikalne projekty</p>
              </div>
            </div>

            <Link 
              href="/produkty/as-aleksandra-sopel"
              className="inline-flex items-center justify-center px-8 py-4 bg-accent-700 text-white rounded-lg hover:bg-accent-800 transition-all duration-300 group shadow-lg hover:shadow-xl"
            >
              <span className="font-medium">Odkryj kolekcję AS</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-brown-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif font-bold mb-4">
            Masz pytania o naszą firmę?
          </h2>
          <p className="text-brown-200 text-lg mb-8 max-w-2xl mx-auto">
            Chętnie opowiemy Ci więcej o naszej historii, procesie produkcji i wartościach, 
            którymi się kierujemy.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/kontakt"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-brown-900 font-medium rounded-lg hover:bg-primary-500 transition-all duration-300"
            >
              Skontaktuj się z nami
            </Link>
            
            <Link
              href="/produkty"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary-400 text-primary-400 font-medium rounded-lg hover:bg-primary-400 hover:text-brown-900 transition-all duration-300"
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