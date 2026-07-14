'use client';

import { useState } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Award,
  Building2,
  CheckCircle2,
  Clock,
  Factory,
  Handshake,
  Layers,
  Mail,
  MapPin,
  Package,
  Phone,
  Shield,
  ShoppingBag,
  Sparkles,
  Store,
  Truck,
  Users,
  Plus,
  Minus,
} from 'lucide-react';

function ImagePlaceholder({
  className = '',
  label,
}: {
  className?: string;
  label?: string;
}) {
  return (
    <div
      className={`bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div className="text-center p-6">
        <div className="w-12 h-12 mx-auto mb-3 border border-gray-300 rounded-sm flex items-center justify-center">
          <Package className="w-5 h-5 text-gray-400" />
        </div>
        {label && (
          <span className="text-xs text-gray-400 font-light uppercase tracking-wider">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}

const highlights = [
  { icon: Factory, label: 'Polska produkcja' },
  { icon: Package, label: 'Sprzedaż hurtowa' },
  { icon: Sparkles, label: 'Personalizacja' },
  { icon: Award, label: 'Jakość premium' },
];

const targetAudience = [
  {
    icon: Store,
    title: 'Sklepy stacjonarne',
    description:
      'Galanteria skórzana do sprzedaży w butikach, sklepach z akcesoriami i punktach stacjonarnych.',
  },
  {
    icon: ShoppingBag,
    title: 'Butiki',
    description:
      'Produkty premium dopasowane do marki sklepu — od klasycznych modeli po personalizację.',
  },
  {
    icon: Truck,
    title: 'Dystrybutorzy',
    description:
      'Stała współpraca hurtowa z przejrzystymi warunkami i rzetelną realizacją zamówień.',
  },
  {
    icon: Building2,
    title: 'Klienci firmowi',
    description:
      'Prezenty firmowe, gadżety reklamowe i produkty z logo marki na zamówienie.',
  },
];

const cooperationScope = [
  {
    step: '01',
    title: 'Sprzedaż hurtowa',
    description:
      'Oferujemy galanterię skórzaną w modelu B2B — torebki, plecaki, paski i akcesoria. Dostosowujemy warunki współpracy do skali zamówienia i profilu partnera handlowego.',
    imageLabel: 'Sprzedaż hurtowa',
    image: '/images/dla-firm-hurtowa.png',
    imageAlt: 'Przygotowanie zamówień hurtowych galanterii skórzanej Voyager',
  },
  {
    step: '02',
    title: 'Personalizacja produktów',
    description:
      'Tłoczenie i grawer logotypu na skórze, dobór kolorów, nici oraz elementów metalowych. Personalizacja pod markę sklepu lub firmy klienta końcowego.',
    imageLabel: 'Personalizacja',
    image: '/images/dla-firm-personalizacja.png',
    imageAlt: 'Tłoczenie logotypu na skórzanym produkcie Voyager',
  },
  {
    step: '03',
    title: 'Współpraca długoterminowa',
    description:
      'Budujemy relacje oparte na stałej jakości, terminowości i wsparciu posprzedażowym. Elastyczne podejście do zamówień cyklicznych i projektów indywidualnych.',
    imageLabel: 'Współpraca',
    image: '/images/services/usciskdlafirm.png',
    imageAlt: 'Uścisk dłoni — długoterminowa współpraca partnerska Voyager',
  },
];

const valueProposition = [
  {
    icon: Shield,
    title: 'Rzetelność i doświadczenie',
    description: 'Ponad 21 lat w produkcji galanterii skórzanej. Sprawdzony partner dla firm.',
  },
  {
    icon: Layers,
    title: 'Naturalna skóra',
    description: 'Wyłącznie wyselekcjonowane skóry naturalne i staranne wykończenie każdego produktu.',
  },
  {
    icon: Handshake,
    title: 'Elastyczne podejście',
    description: 'Indywidualne warunki współpracy, dopasowane do potrzeb i skali Twojego biznesu.',
  },
  {
    icon: CheckCircle2,
    title: 'Stała jakość',
    description: 'Kontrola jakości na każdym etapie produkcji — powtarzalność w każdej partii.',
  },
  {
    icon: Clock,
    title: 'Terminowość',
    description: 'Harmonogramy realizacji ustalamy indywidualnie — dopasowujemy je do zakresu zamówienia i Twoich potrzeb biznesowych.',
  },
  {
    icon: Users,
    title: 'Wsparcie B2B',
    description: 'Dedykowana obsługa, faktury VAT, dokumentacja i pomoc na każdym etapie współpracy.',
  },
];

const processSteps = [
  {
    step: '01',
    title: 'Kontakt i potrzeby',
    description: 'Omawiamy profil Twojej firmy, oczekiwania i zakres współpracy.',
  },
  {
    step: '02',
    title: 'Dobór oferty i wycena',
    description: 'Proponujemy modele, materiały i personalizację wraz z przejrzystą wyceną.',
  },
  {
    step: '03',
    title: 'Produkcja i przygotowanie',
    description: 'Po akceptacji uruchamiamy produkcję zgodnie z ustalonym harmonogramem.',
  },
  {
    step: '04',
    title: 'Dostawa i dalsza współpraca',
    description: 'Dostarczamy zamówienie i wspieramy w kolejnych etapach partnerstwa.',
  },
];

const productCategories = [
  { name: 'Torebki', slug: 'torebki', image: '/images/torebka_kategoria_zdjecie.jpg' },
  { name: 'Plecaki', slug: 'plecaki', image: '/images/plecak-pokaz.png' },
  { name: 'Paski', slug: 'paski', image: '/images/kategoria_paski_obrazek.jpg' },
  { name: 'Akcesoria skórzane', slug: 'personalizacja', image: '/images/key_holder_category.jpg' },
];

const faqs = [
  {
    q: 'Czy realizujecie współpracę hurtową dla sklepów?',
    a: 'Tak, oferujemy sprzedaż hurtową galanterii skórzanej dla sklepów stacjonarnych, butików i dystrybutorów. Warunki współpracy ustalamy indywidualnie.',
  },
  {
    q: 'Czy mogę zamówić produkty z logo mojej marki?',
    a: 'Tak, wykonujemy tłoczenie i grawer logotypu na produktach skórzanych oraz elementach metalowych. Przygotowujemy wizualizację przed produkcją.',
  },
  {
    q: 'Jak wygląda proces płatności?',
    a: 'Po akceptacji projektu wystawiamy fakturę pro forma. Pełna kwota rozliczana jest przed wysyłką. Wystawiamy faktury VAT.',
  },
  {
    q: 'Czy wysyłacie produkty za granicę?',
    a: 'Tak, realizujemy sprzedaż hurtową dla firm ze wszystkich krajów Unii Europejskiej.',
  },
  {
    q: 'Czy wszystkie produkty są ze skóry naturalnej?',
    a: 'Tak, korzystamy wyłącznie z wyselekcjonowanych skór naturalnych najwyższej jakości.',
  },
  {
    q: 'Czy oferujecie gwarancję na produkty?',
    a: 'W sprzedaży hurtowej B2B obowiązują przepisy dotyczące obrotu między przedsiębiorcami — w tym ustawowa rękojmia, którą strony mogą w umowie ograniczyć lub wyłączyć (Kodeks cywilny, art. 558). Prawa konsumenckie w tej relacji nie mają zastosowania. Zapewniamy wsparcie posprzedażowe i rozpatrywanie reklamacji na warunkach uzgodnionych indywidualnie w umowie współpracy.',
  },
];

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 bg-white">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-start justify-between gap-4 p-5 sm:p-6 text-left hover:bg-gray-50 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="text-sm sm:text-base font-light text-gray-900 leading-relaxed pr-2">
          {question}
        </span>
        <span className="flex-shrink-0 mt-0.5 text-gray-400">
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </span>
      </button>
      {isOpen && (
        <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm sm:text-base text-gray-600 font-light leading-relaxed border-t border-gray-100">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function DlaFirmPage() {
  const faqColumns = [
    faqs.slice(0, Math.ceil(faqs.length / 2)),
    faqs.slice(Math.ceil(faqs.length / 2)),
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-6 tracking-tight leading-tight">
                Oferta dla firm
              </h1>
              <p className="text-base sm:text-lg text-gray-600 font-light leading-relaxed mb-8 max-w-xl">
                Voyager produkuje galanterię skórzaną klasy premium i współpracuje
                hurtowo ze sklepami, butikami oraz firmami. Oferujemy sprzedaż
                hurtową, personalizację produktów i elastyczne warunki współpracy.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  href="/kontakt"
                  className="inline-flex items-center justify-center px-7 py-3.5 bg-gray-900 text-white text-sm font-light hover:bg-gray-800 transition-colors uppercase tracking-wider"
                >
                  Zapytaj o ofertę
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link
                  href="#kontakt"
                  className="inline-flex items-center justify-center px-7 py-3.5 border border-gray-300 text-gray-900 text-sm font-light hover:bg-gray-50 transition-colors uppercase tracking-wider"
                >
                  Skontaktuj się
                </Link>
              </div>
            </div>
            <div className="relative aspect-[4/3] lg:aspect-square w-full overflow-hidden border border-gray-200">
              <Image
                src="/images/dla-firm-hero.png"
                alt="Butik z galanterią skórzaną Voyager"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Highlights bar */}
      <section className="border-y border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 flex-shrink-0 border border-gray-200 bg-white flex items-center justify-center">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                  </div>
                  <span className="text-xs sm:text-sm text-gray-700 font-light leading-snug">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Target audience */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-900 mb-4 tracking-tight">
              Dla kogo jest ta oferta?
            </h2>
            <p className="text-base sm:text-lg text-gray-600 font-light leading-relaxed">
              Współpracujemy z partnerami handlowymi, którzy chcą oferować
              klientom produkty skórzane najwyższej jakości.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {targetAudience.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="border border-gray-200 p-6 sm:p-8 hover:border-gray-300 transition-colors h-full"
                >
                  <div className="w-10 h-10 border border-gray-200 flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <h3 className="text-base sm:text-lg font-light text-gray-900 mb-3 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cooperation scope */}
      <section id="zakres-wspolpracy" className="py-16 sm:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-900 mb-4 tracking-tight">
              Zakres współpracy
            </h2>
            <p className="text-base sm:text-lg text-gray-600 font-light leading-relaxed">
              Kompleksowa oferta B2B — od sprzedaży hurtowej po personalizację
              i długofalową współpracę partnerską.
            </p>
          </div>
          <div className="space-y-12 sm:space-y-16 lg:space-y-20">
            {cooperationScope.map((item, index) => (
              <div
                key={index}
                className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                  index % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
                }`}
              >
                {'image' in item && item.image ? (
                  <div className="relative aspect-[16/10] w-full overflow-hidden border border-gray-200">
                    <Image
                      src={item.image}
                      alt={item.imageAlt ?? item.imageLabel}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <ImagePlaceholder
                    className="aspect-[16/10] w-full"
                    label={item.imageLabel}
                  />
                )}
                <div>
                  <span className="text-sm text-gray-400 font-light tracking-widest mb-3 block">
                    {item.step}
                  </span>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-light text-gray-900 mb-4 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value proposition */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-900 mb-4 tracking-tight">
              Dlaczego warto współpracować z Voyager?
            </h2>
            <p className="text-base sm:text-lg text-gray-600 font-light leading-relaxed">
              Łączymy rzemiosło, jakość materiałów i partnerskie podejście do
              współpracy B2B.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {valueProposition.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="border border-gray-200 p-6 sm:p-8 hover:border-gray-300 transition-colors"
                >
                  <div className="w-10 h-10 border border-gray-200 flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <h3 className="text-base sm:text-lg font-light text-gray-900 mb-3 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-900 mb-4 tracking-tight">
              Jak wygląda współpraca?
            </h2>
            <p className="text-base sm:text-lg text-gray-600 font-light leading-relaxed">
              Prosty i przejrzysty proces — od pierwszego kontaktu do dostawy
              i dalszej współpracy.
            </p>
          </div>

          {/* Desktop timeline */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute top-5 left-[12.5%] right-[12.5%] h-px bg-gray-300" />
              <div className="grid grid-cols-4 gap-8">
                {processSteps.map((step, index) => (
                  <div key={index} className="text-center relative">
                    <div className="w-10 h-10 bg-white border border-gray-300 flex items-center justify-center mx-auto mb-6 relative z-10">
                      <span className="text-xs text-gray-500 font-light">{step.step}</span>
                    </div>
                    <h3 className="text-base font-light text-gray-900 mb-3 tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-600 font-light leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile / tablet */}
          <div className="lg:hidden space-y-6">
            {processSteps.map((step, index) => (
              <div key={index} className="flex gap-4 sm:gap-6">
                <div className="w-10 h-10 flex-shrink-0 bg-white border border-gray-300 flex items-center justify-center">
                  <span className="text-xs text-gray-500 font-light">{step.step}</span>
                </div>
                <div className="pt-1">
                  <h3 className="text-base font-light text-gray-900 mb-2 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product categories */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-900 mb-4 tracking-tight">
              Kategorie produktowe
            </h2>
            <p className="text-base sm:text-lg text-gray-600 font-light leading-relaxed">
              Szeroka oferta galanterii skórzanej dostępna w modelu hurtowym.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {productCategories.map((category) => (
              <Link
                key={category.slug}
                href={`/produkty/${category.slug}`}
                className="group block"
              >
                <div className="relative aspect-square w-full overflow-hidden border border-gray-200 group-hover:border-gray-300 transition-colors">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-900 font-light text-center group-hover:text-gray-600 transition-colors">
                  {category.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 sm:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-900 mb-4 tracking-tight">
              Najczęściej zadawane pytania (FAQ)
            </h2>
            <p className="text-base sm:text-lg text-gray-600 font-light leading-relaxed">
              Odpowiedzi na kluczowe pytania dotyczące współpracy hurtowej,
              personalizacji i logistyki.
            </p>
          </div>

          {/* Desktop: 2 columns */}
          <div className="hidden md:grid md:grid-cols-2 gap-4">
            {faqColumns.map((column, colIndex) => (
              <div key={colIndex} className="space-y-4">
                {column.map((item, index) => (
                  <FaqItem key={index} question={item.q} answer={item.a} />
                ))}
              </div>
            ))}
          </div>

          {/* Mobile: single column */}
          <div className="md:hidden space-y-4">
            {faqs.map((item, index) => (
              <FaqItem key={index} question={item.q} answer={item.a} />
            ))}
          </div>

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: faqs.map((f) => ({
                  '@type': 'Question',
                  name: f.q,
                  acceptedAnswer: { '@type': 'Answer', text: f.a },
                })),
              }),
            }}
          />
        </div>
      </section>

      {/* CTA */}
      <section id="kontakt" className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border border-gray-200 bg-gray-50 p-8 sm:p-10 lg:p-12">
            <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl font-light text-gray-900 mb-4 tracking-tight">
                  Porozmawiajmy o współpracy
                </h2>
                <p className="text-base text-gray-600 font-light leading-relaxed max-w-xl mb-6 lg:mb-0">
                  Skontaktuj się z nami, aby omówić zakres współpracy, warunki
                  hurtowe i możliwości personalizacji. Przygotujemy ofertę
                  dopasowaną do Twojej firmy.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-6 lg:hidden">
                  <Link
                    href="/kontakt"
                    className="inline-flex items-center justify-center px-7 py-3.5 bg-gray-900 text-white text-sm font-light hover:bg-gray-800 transition-colors uppercase tracking-wider"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Napisz do nas
                  </Link>
                  <a
                    href="tel:+48505461050"
                    className="inline-flex items-center justify-center px-7 py-3.5 border border-gray-300 bg-white text-gray-900 text-sm font-light hover:bg-gray-50 transition-colors uppercase tracking-wider"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Zadzwoń teraz
                  </a>
                </div>
                <div className="flex flex-wrap gap-6 mt-6 text-sm text-gray-500 font-light">
                  <a
                    href="mailto:voyager.sopel@gmail.com"
                    className="inline-flex items-center gap-2 hover:text-gray-900 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    voyager.sopel@gmail.com
                  </a>
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Nowy Sącz, Polska
                  </span>
                </div>
              </div>
              <div className="hidden lg:flex flex-col gap-3 min-w-[220px]">
                <Link
                  href="/kontakt"
                  className="inline-flex items-center justify-center px-7 py-3.5 bg-gray-900 text-white text-sm font-light hover:bg-gray-800 transition-colors uppercase tracking-wider whitespace-nowrap"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Napisz do nas
                </Link>
                <a
                  href="tel:+48505461050"
                  className="inline-flex items-center justify-center px-7 py-3.5 border border-gray-300 bg-white text-gray-900 text-sm font-light hover:bg-gray-50 transition-colors uppercase tracking-wider whitespace-nowrap"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Zadzwoń teraz
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
