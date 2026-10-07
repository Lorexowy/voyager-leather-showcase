import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ImageIcon } from 'lucide-react';
import { CATEGORIES, ProductCategory } from '@/types';

// Add photo paths here when the category photographs are ready.
// null intentionally renders a placeholder without requesting an image.
const categoryImages: Record<ProductCategory, string | null> = {
  torebki: '/images/Torebka_kat.png',
  paski: '/images/pasek_kat.png',
  plecaki: '/images/plecak_kat.png',
  personalizacja: '/images/personalizacja_kat.png',
  'as-aleksandra-sopel': '/images/as_kat.png',
};

export default function CategoriesSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gray-50" aria-labelledby="categories-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <h2 id="categories-heading" className="text-3xl sm:text-4xl font-light text-gray-900 mb-5 tracking-tight">
            Nasze Kategorie
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            Odkryj różnorodność naszej oferty. Każdy produkt wykonany
            z najwyższą starannością i dbałością o detal.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-6">
          {CATEGORIES.map((category, index) => {
            const image = categoryImages[category.id];
            const isSpecial = category.id === 'as-aleksandra-sopel';
            const isWide = index >= 3;

            return (
              <Link
                key={category.id}
                href={`/produkty/${category.slug}`}
                className={`group relative isolate block overflow-hidden bg-stone-300 aspect-[4/5] focus-visible:!outline focus-visible:!outline-2 focus-visible:!outline-offset-4 focus-visible:!outline-gray-900 ${
                  isWide ? 'lg:col-span-3 lg:aspect-[3/2]' : 'lg:col-span-2'
                } ${isSpecial ? 'sm:col-span-2 sm:aspect-[3/2] lg:col-span-3' : ''}`}
              >
                {image ? (
                  <Image
                    src={image}
                    alt={category.name}
                    fill
                    sizes={isSpecial
                      ? '(min-width: 1280px) 608px, (min-width: 1024px) 50vw, 100vw'
                      : isWide
                      ? '(min-width: 1280px) 608px, (min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw'
                      : '(min-width: 1280px) 400px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'}
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                ) : (
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-stone-200 via-stone-300 to-stone-400"
                    aria-hidden="true"
                  >
                    <div className="absolute inset-x-0 top-[28%] flex flex-col items-center gap-3 text-stone-600">
                      <ImageIcon className="w-8 h-8" strokeWidth={1} />
                      <span className="text-xs font-light tracking-wider uppercase">Miejsce na zdjęcie</span>
                    </div>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" aria-hidden="true" />

                {isSpecial && (
                  <span className="absolute top-5 right-5 border border-white/50 bg-black/25 px-3 py-1 text-xs text-white font-light uppercase tracking-wider">
                    Premium
                  </span>
                )}

                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 lg:p-8 text-white">
                  <h3 className="text-2xl sm:text-3xl font-light leading-tight tracking-tight mb-3">
                    {category.name}
                  </h3>
                  <p className="min-h-12 text-sm text-white/85 font-light leading-relaxed max-w-md mb-5">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs sm:text-sm font-light uppercase tracking-wider">
                      {category.id === 'personalizacja' ? 'Poznaj możliwości' : 'Zobacz produkty'}
                    </span>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/50 transition-colors duration-200 group-hover:bg-white/15 motion-reduce:transition-none" aria-hidden="true">
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-10 sm:mt-14">
          <Link
            href="/produkty"
            className="inline-flex items-center px-8 py-4 bg-gray-900 text-white font-light hover:bg-gray-800 transition-colors duration-200 group uppercase tracking-wider"
          >
            <span>Zobacz wszystkie produkty</span>
            <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform motion-reduce:transition-none" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
