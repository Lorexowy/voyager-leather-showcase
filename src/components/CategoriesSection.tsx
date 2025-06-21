'use client';

import Link from 'next/link';
import { ArrowRight, Briefcase, ShoppingBag, Backpack, Sparkles, Crown } from 'lucide-react';
import { CATEGORIES } from '@/types';

const categoryIcons = {
  'torebki': ShoppingBag,
  'paski': Briefcase,
  'plecaki': Backpack,
  'personalizacja': Sparkles,
  'as-aleksandra-sopel': Crown,
};

export default function CategoriesSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - minimalistyczny */}
        <div className="text-center mb-20">
          <h2 className="text-4xl font-light text-gray-900 mb-6 tracking-tight">
            Nasze Kategorie
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            Odkryj różnorodność naszej oferty. Każdy produkt wykonany 
            z najwyższą starannością i dbałością o detal.
          </p>
        </div>

        {/* Categories Grid - clean */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CATEGORIES.map((category, index) => {
            const Icon = categoryIcons[category.id];
            const isSpecial = category.id === 'as-aleksandra-sopel';
            
            return (
              <Link
                key={category.id}
                href={`/produkty/${category.slug}`}
                className={`group relative p-8 bg-white border transition-all duration-300 hover:border-gray-900 ${
                  isSpecial 
                    ? 'border-gray-900' 
                    : 'border-gray-200'
                }`}
              >
                {/* Special badge for AS line - minimal */}
                {isSpecial && (
                  <div className="absolute top-6 right-6 bg-gray-900 text-white px-3 py-1 text-xs font-light uppercase tracking-wider">
                    Premium
                  </div>
                )}
                
                {/* Icon - minimalistyczna */}
                <div className={`w-12 h-12 border flex items-center justify-center mb-8 transition-colors ${
                  isSpecial 
                    ? 'border-gray-900 text-gray-900' 
                    : 'border-gray-300 text-gray-600 group-hover:border-gray-900 group-hover:text-gray-900'
                }`}>
                  <Icon className="w-6 h-6" />
                </div>
                
                {/* Content */}
                <h3 className={`text-xl font-light mb-4 ${
                  isSpecial ? 'text-gray-900' : 'text-gray-900'
                }`}>
                  {category.name}
                </h3>
                
                <p className={`text-sm mb-8 leading-relaxed font-light ${
                  isSpecial ? 'text-gray-600' : 'text-gray-600'
                }`}>
                  {category.description}
                </p>
                
                {/* CTA - minimal */}
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-light uppercase tracking-wider ${
                    isSpecial ? 'text-gray-700' : 'text-gray-600'
                  }`}>
                    Zobacz produkty
                  </span>
                  <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                    isSpecial ? 'text-gray-900' : 'text-gray-600'
                  }`} />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA - minimal */}
        <div className="text-center mt-20">
          <Link 
            href="/produkty"
            className="inline-flex items-center px-8 py-4 bg-gray-900 text-white font-light hover:bg-gray-800 transition-all duration-300 group uppercase tracking-wider"
          >
            <span>Zobacz wszystkie produkty</span>
            <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}