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
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-brown-900 mb-4">
            Nasze Kategorie
          </h2>
          <p className="text-lg text-brown-600 max-w-2xl mx-auto">
            Odkryj różnorodność naszej oferty. Od eleganckich torebek po funkcjonalne plecaki, 
            każdy produkt wykonany jest z najwyższą starannością.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CATEGORIES.map((category, index) => {
            const Icon = categoryIcons[category.id];
            const isSpecial = category.id === 'as-aleksandra-sopel';
            
            return (
              <Link
                key={category.id}
                href={`/produkty/${category.slug}`}
                className={`group relative p-8 rounded-2xl transition-all duration-300 hover:shadow-xl ${
                  isSpecial 
                    ? 'bg-gradient-to-br from-accent-100 to-accent-200 border-2 border-accent-300 hover:from-accent-200 hover:to-accent-300' 
                    : 'bg-gradient-to-br from-primary-50 to-primary-100 hover:from-primary-100 hover:to-primary-200'
                }`}
              >
                {/* Special badge for AS line */}
                {isSpecial && (
                  <div className="absolute -top-3 -right-3 bg-accent-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Premium
                  </div>
                )}
                
                {/* Icon */}
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-colors ${
                  isSpecial 
                    ? 'bg-accent-600 text-white group-hover:bg-accent-700' 
                    : 'bg-brown-700 text-white group-hover:bg-brown-800'
                }`}>
                  <Icon className="w-8 h-8" />
                </div>
                
                {/* Content */}
                <h3 className={`text-xl font-bold mb-3 ${
                  isSpecial ? 'text-accent-800' : 'text-brown-800'
                }`}>
                  {category.name}
                </h3>
                
                <p className={`text-sm mb-6 leading-relaxed ${
                  isSpecial ? 'text-accent-700' : 'text-brown-600'
                }`}>
                  {category.description}
                </p>
                
                {/* CTA */}
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${
                    isSpecial ? 'text-accent-700' : 'text-brown-700'
                  }`}>
                    Zobacz produkty
                  </span>
                  <ArrowRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${
                    isSpecial ? 'text-accent-600' : 'text-brown-600'
                  }`} />
                </div>
                
                {/* Hover effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Link 
            href="/produkty"
            className="inline-flex items-center px-8 py-4 bg-brown-700 text-white rounded-lg hover:bg-brown-800 transition-all duration-300 group shadow-lg hover:shadow-xl"
          >
            <span className="font-medium">Zobacz wszystkie produkty</span>
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}