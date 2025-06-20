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
    title: 'Ekologia',
    description: 'Dbamy o środowisko, wykorzystując skóry pochodzące z etycznych źródeł i ekologiczne procesy produkcji.'
  }
];

export default function AboutSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <h2 className="text-4xl font-serif font-bold text-brown-900 mb-6">
              O Firmie Voyager
            </h2>
            
            <div className="prose prose-lg text-brown-700 space-y-4">
              <p>
                <strong>Voyager</strong> to firma z tradycjami, specjalizująca się w produkcji 
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
                Szczególnie dumni jesteśmy z naszej linii premium <strong>"AS | Aleksandra Sopel"</strong>, 
                która reprezentuje absolutny szczyt jakości i designu w dziedzinie galanterii skórzanej.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-10 pt-8 border-t border-brown-100">
              <div className="text-center">
                <div className="text-2xl font-bold text-brown-800 mb-1">15+</div>
                <div className="text-sm text-brown-600">Lat na rynku</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-brown-800 mb-1">1000+</div>
                <div className="text-sm text-brown-600">Zadowolonych klientów</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-brown-800 mb-1">50+</div>
                <div className="text-sm text-brown-600">Produktów w ofercie</div>
              </div>
            </div>
          </div>

          {/* Image placeholder */}
          <div className="relative">
            <div className="aspect-[4/5] bg-gradient-to-br from-brown-200 to-brown-300 rounded-2xl shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-brown-600">
                  <div className="w-32 h-32 mx-auto mb-4 bg-brown-400/50 rounded-full flex items-center justify-center">
                    <Award className="w-16 h-16" />
                  </div>
                  <p className="text-lg font-medium">Nasza pracownia</p>
                  <p className="text-sm opacity-70">Zdjęcie z procesu produkcji</p>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary-300 rounded-2xl rotate-12 opacity-80" />
            <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-accent-400 rounded-xl -rotate-12 opacity-60" />
          </div>
        </div>

        {/* Features */}
        <div className="mt-20">
          <h3 className="text-2xl font-serif font-bold text-brown-900 text-center mb-12">
            Dlaczego warto wybrać Voyager?
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="text-center p-6 rounded-xl bg-primary-50 hover:bg-primary-100 transition-colors duration-300"
                >
                  <div className="w-16 h-16 bg-brown-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-brown-900 mb-3">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-brown-600 leading-relaxed">
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