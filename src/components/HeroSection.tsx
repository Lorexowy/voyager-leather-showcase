'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Content - clean typography */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center px-4 py-2 bg-gray-50 rounded-full text-sm text-gray-600 mb-8 font-light">
              Premium Leather Goods
            </div>
            
            <h1 className="text-6xl lg:text-7xl font-light text-gray-900 mb-8 leading-none tracking-tight">
              Crafted
              <span className="block font-light text-gray-600">Leather</span>
              <span className="block font-medium">Excellence</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-12 max-w-lg font-light leading-relaxed">
              Discover our collection of premium leather products. 
              Each piece meticulously crafted with attention to every detail.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link 
                href="/produkty"
                className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white font-light rounded-sm hover:bg-gray-800 transition-all duration-300 group"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              
              <Link 
                href="/kontakt"
                className="inline-flex items-center justify-center px-8 py-4 border border-gray-300 text-gray-700 font-light rounded-sm hover:border-gray-900 hover:text-gray-900 transition-all duration-300"
              >
                Get in Touch
              </Link>
            </div>
          </div>
          
          {/* Image - minimalistyczny placeholder */}
          <div className="relative">
            <div className="aspect-[4/5] bg-gray-50 rounded-sm relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <div className="w-32 h-32 mx-auto mb-6 border border-gray-200 rounded-sm flex items-center justify-center">
                    <span className="text-3xl font-light text-gray-300">V</span>
                  </div>
                  <p className="text-lg font-light text-gray-400">Product Image</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats - minimalistyczne */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-12">
          <div className="text-center">
            <div className="text-3xl font-light text-gray-900 mb-2">15+</div>
            <div className="text-gray-600 text-sm font-light uppercase tracking-wider">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-light text-gray-900 mb-2">50+</div>
            <div className="text-gray-600 text-sm font-light uppercase tracking-wider">Products</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-light text-gray-900 mb-2">100%</div>
            <div className="text-gray-600 text-sm font-light uppercase tracking-wider">Natural Leather</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-light text-gray-900 mb-2">24h</div>
            <div className="text-gray-600 text-sm font-light uppercase tracking-wider">Response Time</div>
          </div>
        </div>
      </div>
    </section>
  );
}