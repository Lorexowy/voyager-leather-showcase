'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import {
  Award,
  Shield,
  Clock,
  Sparkles,
  Mail,
  Phone,
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    title: 'Grawer logotypu',
    description: 'Oferujemy grawer logotypu dla firm. Grawerujemy logotypy na paskach, torebkach, plecakach i innych produktach skórzanych, oraz elementach metalowych.',
    bullets: ['MOQ od 25 szt.', 'Grawer laserowy / tłoczenie', 'Różne szerokości i kolory'],
    image: '/images/services/grawerydlafirmy.png'
  },
  {
    title: 'Tłoczenie logotypu',
    description: 'Tłoczymy logotypy firm na naszych produktach skórzanych. Używamy najwyższej jakości matryc do tłoczenia w skórze, aby efekt był jak najbardziej trwały i estetyczny.',
    bullets: ['Indywidualne opakowania', 'Personalizacja kolorów i nici', 'Opcja brandingu pudełek'],
    image: '/images/services/tloczeniedlafirm.png'
  },
  {
    title: 'Współpraca',
    description: 'Oferujemy współpracę stałą i okresową w zależności od potrzeb klienta.',
    bullets: ['Pakiety onboardingowe', 'Certyfikaty jakości', 'Możliwość dropshippingu'],
    image: '/images/services/usciskdlafirm.png'
  }
];

const benefits = [
  { icon: Award, title: 'Najwyższa Jakość', description: '21 lat doświadczenia w produkcji galanterii. Tylko wyselekcjonowane skóry i kontrola jakości na każdym etapie.' },
  { icon: Shield, title: 'Gwarancja i Serwis', description: 'Pełna gwarancja na produkty firmowe. Szybki serwis, wymiany i wsparcie posprzedażowe.' },
  { icon: Clock, title: 'Terminowość', description: 'Standardowa realizacja 2–3 tygodnie. Priorytetowe zlecenia realizujemy w trybie przyspieszonym.' },
  { icon: Sparkles, title: 'Personalizacja Premium', description: 'Tłoczenia, grawery, wybrane kolory skóry – w pełni pod Twoją markę.' }
];

const faqs = [
  { q: 'Czy mogę zamówić próbki produktów przed złożeniem zamówienia?', a: 'Tak, oferujemy próbki materiałów i wykończeń. Cena takiej próbki jest zależna od produktu i zakresu personalizacji. Po szczegóły zapraszamy do kontaktu prywatnego ponieważ do każdego zamówienia podchodzimy indywidualnie.' },
  { q: 'Czy wykonujecie projekty z logo mojej firmy?', a: 'Tak, możemy wykonać projekt z logotypem Państwa firmy.' },
  { q: 'Jak wygląda proces płatności?', a: 'Po akceptacji projektu wystawiamy fakturę pro forma. Pełna kwota rozliczana jest przed wysyłką.' },
  { q: 'Czy mogę zamówić różne kolory w ramach jednego zamówienia?', a: 'Tak, możemy przygotować partię w różnych wariantach kolorystycznych skóry w ramach jednego zamówienia.' },
  { q: 'Czy wysyłacie produkty za granicę?', a: 'Tak, realizujemy zamówienia dla klientów z całej Europy. Organizujemy transport kurierski.' },
  { q: 'Jak długo utrzymuje się grawer lub tłoczenie?', a: 'Stosujemy wyłącznie profesjonalne techniki, dzięki czemu personalizacja jest trwała i odporna na ścieranie.' },
  { q: 'Czy wszystkie produkty są wykonywane ze skóry naturalnej?', a: 'Tak, korzystamy wyłącznie z wyselekcjonowanych skór naturalnych.' },
  { q: 'Czy wystawiacie faktury VAT?', a: 'Tak, wszystkie zamówienia realizujemy z pełną dokumentacją księgową – faktura VAT jest standardem.' },
  { q: 'Czy oferujecie gwarancję na produkty?', a: 'Tak, każdy produkt objęty jest gwarancją producenta. W razie potrzeby zapewniamy również serwis i naprawy.' }
];

const process = [
  { step: '01', title: 'Konsultacja', description: 'Analizujemy potrzeby i dobieramy materiały, modele oraz zakres personalizacji.' },
  { step: '02', title: 'Projekt & Wycena', description: 'Przygotowujemy wizualizację, rekomendację wykończeń i przejrzystą wycenę.' },
  { step: '03', title: 'Zatwierdzenie', description: 'Po akceptacji uruchamiamy produkcję zgodnie z harmonogramem.' },
  { step: '04', title: 'Dostawa', description: 'Produkty dostarczamy w eleganckich opakowaniach wraz z certyfikatami jakości.' }
];

export default function DlaFirmPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0 lg:p-8">
          <div className="relative w-full h-full lg:border-4 lg:border-white/20 lg:rounded-lg lg:overflow-hidden">
            <Image src="/images/herobanerdlafirm.png" alt="Voyager - Produkty skórzane dla firm" fill className="object-cover object-center" priority sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/10"></div>
          </div>
        </div>

        <div className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-white">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl mb-6 leading-none tracking-tight font-extrabold">
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Oferta dla firm</span>
              </h1>
              <p className="text-xl sm:text-2xl text-gray-100 mb-8 sm:mb-12 leading-relaxed max-w-4xl mx-auto font-light">
                Projektujemy i tworzymy galanterię skórzaną klasy premium — personalizujemy produkty skórzane dla Twojej marki.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="#kontakt" className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-white/90 text-gray-900 font-medium hover:bg-white transition-all duration-300 group uppercase tracking-wide shadow-sm">
                  <span>Zamów wycenę</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="#uslugi" className="inline-flex items-center justify-center px-8 py-4 rounded-lg border border-white/70 text-white font-medium hover:bg-white/10 transition-all duration-300 uppercase tracking-wide">
                  <span>Zobacz usługi</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services – Split hero cards */}
      <section id="uslugi" className="py-20 sm:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {services.map((item, idx) => (
            <div key={idx} className={`grid lg:grid-cols-2 gap-10 items-center ${idx % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
              <div className="relative">
              <div className="relative w-full aspect-[16/10] sm:aspect-[5/4] lg:aspect-[16/9] overflow-hidden rounded-2xl ring-1 ring-black/5 shadow-sm bg-white">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width:1024px) 100vw, 50vw"
                    priority={idx === 0}
                    className="object-cover p-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/5 via-transparent to-transparent pointer-events-none md:from-black/10" />
                </div>
              </div>
              <div>
                <div className="max-w-lg">
                  <h3 className="text-3xl sm:text-4xl font-light text-gray-900 mb-4 tracking-tight">{item.title}</h3>
                  <p className="text-gray-600 font-light leading-relaxed mb-8">{item.description}</p>
                  <div className="flex flex-wrap gap-3">
                    <Link href="#kontakt" className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gray-900 text-white font-medium hover:bg-black transition-colors duration-300 uppercase tracking-wide shadow-sm">
                      Zapytaj o wycenę
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                    <Link href="/kontakt" className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-gray-300 text-gray-900 font-medium hover:bg-gray-50 transition-colors duration-300 uppercase tracking-wide">Kontakt</Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-light text-gray-900 mb-6 tracking-tight">Dlaczego Wybrać Voyager?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">Ponad 21 lat doświadczenia — kontrola jakości na każdym etapie i wykończenia klasy premium.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center p-6 rounded-2xl bg-white/70 backdrop-blur border border-gray-200/70 hover:border-gray-300 transition-colors">
                  <div className="w-12 h-12 rounded-full ring-1 ring-black/10 bg-white flex items-center justify-center mx-auto mb-6 shadow-sm">
                    <Icon className="w-6 h-6 text-gray-600" />
                  </div>
                  <h3 className="text-xl font-light text-gray-900 mb-4 tracking-tight">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed font-light">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-light text-gray-900 mb-6 tracking-tight">Jak wygląda współpraca?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">Prosty i przejrzysty proces od pomysłu do gotowego produktu.</p>
          </div>
          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
              <div className="grid grid-cols-4 gap-8">
                {process.map((step, index) => (
                  <div key={index} className="relative">
                    <div className="w-16 h-16 bg-white ring-1 ring-black/10 flex items-center justify-center mx-auto mb-6 relative z-10 rounded-full shadow-sm">
                      <span className="text-sm font-light text-gray-600">{step.step}</span>
                    </div>
                    <div className="text-center">
                      <h3 className="text-lg font-light text-gray-900 mb-3 tracking-tight">{step.title}</h3>
                      <p className="text-gray-600 font-light leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:hidden space-y-8">
            {process.map((step, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-white ring-1 ring-black/10 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                  <span className="text-sm font-light text-gray-600">{step.step}</span>
                </div>
                <div>
                  <h3 className="text-lg font-light text-gray-900 mb-2 tracking-tight">{step.title}</h3>
                  <p className="text-gray-600 font-light leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-gray-200 mb-4">
              <HelpCircle className="w-6 h-6 text-gray-600" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-light text-gray-900 mb-4 tracking-tight">Najczęstsze pytania (FAQ)</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto font-light">Zebraliśmy kluczowe informacje o personalizacji, terminach i logistyce. Jeśli masz inne pytania – napisz do nas.</p>
          </div>
          <div className="divide-y divide-gray-200 border border-gray-200 rounded-2xl overflow-hidden">
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
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }) }} />
        </div>
      </section>

      {/* CTA */}
      <section id="kontakt" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-light text-gray-900 mb-6 tracking-tight">Porozmawiajmy o Twoim projekcie</h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto font-light">Skontaktuj się z nami, aby omówić zakres, materiały i terminy. Przygotujemy dopasowaną ofertę wraz z próbkami wykończeń.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/kontakt" className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-gray-900 text-white font-medium hover:bg-black transition-colors duration-300 uppercase tracking-wide shadow-sm">
              <Mail className="w-4 h-4 mr-2" />Napisz do nas
            </Link>
            <a href="tel:+48123456789" className="inline-flex items-center justify-center px-8 py-4 rounded-lg border border-gray-300 text-gray-900 font-medium hover:bg-gray-50 transition-colors duration-300 uppercase tracking-wide">
              <Phone className="w-4 h-4 mr-2" />Zadzwoń teraz
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
