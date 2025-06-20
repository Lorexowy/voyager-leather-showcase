'use client';

import { Award, Users, Leaf, Clock } from 'lucide-react';

const features = [
  {
    icon: Award,
    title: 'Najwyższa Jakość',
    description: 'Używamy wyłącznie skóry naturalnej najwyższej jakości, starannie wyselekcjonowanej od sprawdzonych dostawców.'
  },
  {
    icon: Clock,
    title: 'Tradycja i Doświadczenie',
    description: 'Ponad 15 lat doświadczenia w branży galanterii skórzanej pozwala nam tworzyć produkty na najwyższym poziomie.'
  },
  {
    icon: Users,
    title: 'Obsługa Klientów',
    description: 'Każdy klient jest dla nas ważny. Oferujemy indywidualne podejście i profesjonalne doradztwo.'
  },
  {
    icon: Leaf,
    title: 'Odpowiedzialność',
    description: 'Dbamy o środowisko, wykorzystując skóry pochodzące z etycznych źródeł i ekologiczne procesy produkcji.'
  }
];

export default function AboutSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Content - clean typography */}
          <div>
            <h2 className="text-4xl font-light text-gray-900 mb-8 tracking-tight">
              O Firmie Voyager
            </h2>
            
            <div className="space-y-6 text-gray-600 font-light leading-relaxed">
              <p className="text-lg">
                <strong className="font-medium text-gray-900">Voyager</strong> to firma z tradycjami, specjalizująca się w produkcji 
                wysokiej jakości galanterii skórzanej. Od ponad 15 lat tworzymy produkty, 
                które łączą w sobie elegancję, funkcjonalność i trwałość.
              </p>
              
              <p>
                Nasza oferta obejmuje szeroki asortyment produktów - od klasycznych pasków 
                i eleganckich torebek, przez funkcjonalne plecaki, aż po ekskluzywne 
                akcesoria firmowe. Każdy produkt wykonywany jest ręcznie przez doświadczonych 
                rzemieślników.
              </p>
              
              <p>
                Szczególnie dumni jesteśmy z naszej linii premium <strong className="font-medium text-gray-900">"AS | Aleksandra Sopel"</strong>, 
                która reprezentuje absolutny szczyt jakości i designu w dziedzinie galanterii skórzanej.
              </p>
            </div>

            {/* Stats - minimalistyczne */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-3xl font-light text-gray-900 mb-2">15+</div>
                <div className="text-sm text-gray-600 font-light uppercase tracking-wider">Lat na rynku</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light text-gray-900 mb-2">1000+</div>
                <div className="text-sm text-gray-600 font-light uppercase tracking-wider">Zadowolonych klientów</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light text-gray-900 mb-2">50+</div>
                <div className="text-sm text-gray-600 font-light uppercase tracking-wider">Produktów w ofercie</div>
              </div>
            </div>
          </div>

          {/* Image placeholder - minimalistyczny */}
          <div className="relative">
            <div className="aspect-[4/5] bg-white border border-gray-200 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-gray-300">
                  <div className="w-24 h-24 mx-auto mb-6 border border-gray-200 flex items-center justify-center">
                    <Award className="w-12 h-12 text-gray-300" />
                  </div>
                  <p className="text-lg font-light text-gray-400">Nasza pracownia</p>
                  <p className="text-sm text-gray-400 font-light">Zdjęcie z procesu produkcji</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features - minimalistyczne */}
        <div className="mt-24">
          <h3 className="text-2xl font-light text-gray-900 text-center mb-16 tracking-tight">
            Dlaczego warto wybrać Voyager?
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="text-center"
                >
                  <div className="w-12 h-12 border border-gray-300 flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-6 h-6 text-gray-600" />
                  </div>
                  <h4 className="text-lg font-light text-gray-900 mb-4 tracking-tight">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed font-light">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}