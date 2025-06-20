'use client';

import { useState } from 'react';
import { ChevronDown, X, Filter } from 'lucide-react';
import { FilterOptions, ProductCategory, CATEGORIES } from '@/types';

interface ProductFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  totalProducts: number;
}

const availableColors = [
  'Czarny',
  'Brązowy',
  'Beżowy',
  'Koniakowy',
  'Bordowy',
  'Czerwony',
  'Granatowy'
];

export default function ProductFilters({ filters, onFiltersChange, totalProducts }: ProductFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(['category', 'colors']));

  const toggleSection = (section: string) => {
    const newOpenSections = new Set(openSections);
    if (newOpenSections.has(section)) {
      newOpenSections.delete(section);
    } else {
      newOpenSections.add(section);
    }
    setOpenSections(newOpenSections);
  };

  const handleCategoryChange = (category: ProductCategory | undefined) => {
    onFiltersChange({
      ...filters,
      category
    });
  };

  const handleColorChange = (color: string) => {
    const currentColors = filters.colors || [];
    const newColors = currentColors.includes(color)
      ? currentColors.filter(c => c !== color)
      : [...currentColors, color];
    
    onFiltersChange({
      ...filters,
      colors: newColors.length > 0 ? newColors : undefined
    });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = filters.category || (filters.colors && filters.colors.length > 0);

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden w-full flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-brown-200 mb-6"
      >
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-brown-600" />
          <span className="font-medium text-brown-800">Filtry</span>
          {hasActiveFilters && (
            <span className="w-2 h-2 bg-brown-600 rounded-full"></span>
          )}
        </div>
        <ChevronDown className={`w-5 h-5 text-brown-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Filters panel */}
      <div className={`bg-white rounded-lg shadow-sm border border-brown-200 overflow-hidden ${
        isOpen ? 'block' : 'hidden lg:block'
      }`}>
        {/* Header */}
        <div className="p-6 border-b border-brown-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-brown-900">Filtry</h3>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-brown-600 hover:text-brown-800 transition-colors"
              >
                Wyczyść wszystkie
              </button>
            )}
          </div>
          <p className="text-sm text-brown-600 mt-1">
            {totalProducts} produktów
          </p>
        </div>

        {/* Category filter */}
        <div className="border-b border-brown-100">
          <button
            onClick={() => toggleSection('category')}
            className="w-full flex items-center justify-between p-6 text-left"
          >
            <span className="font-medium text-brown-800">Kategoria</span>
            <ChevronDown className={`w-4 h-4 text-brown-600 transition-transform ${
              openSections.has('category') ? 'rotate-180' : ''
            }`} />
          </button>
          
          {openSections.has('category') && (
            <div className="px-6 pb-6 space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  checked={!filters.category}
                  onChange={() => handleCategoryChange(undefined)}
                  className="w-4 h-4 text-brown-600 border-brown-300 focus:ring-brown-500"
                />
                <span className="text-sm text-brown-700">Wszystkie kategorie</span>
              </label>
              
              {CATEGORIES.map((category) => (
                <label key={category.id} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    checked={filters.category === category.id}
                    onChange={() => handleCategoryChange(category.id)}
                    className="w-4 h-4 text-brown-600 border-brown-300 focus:ring-brown-500"
                  />
                  <span className="text-sm text-brown-700">{category.name}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Colors filter */}
        <div className="border-b border-brown-100">
          <button
            onClick={() => toggleSection('colors')}
            className="w-full flex items-center justify-between p-6 text-left"
          >
            <span className="font-medium text-brown-800">Kolory</span>
            <ChevronDown className={`w-4 h-4 text-brown-600 transition-transform ${
              openSections.has('colors') ? 'rotate-180' : ''
            }`} />
          </button>
          
          {openSections.has('colors') && (
            <div className="px-6 pb-6 space-y-3">
              {availableColors.map((color) => (
                <label key={color} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={(filters.colors || []).includes(color)}
                    onChange={() => handleColorChange(color)}
                    className="w-4 h-4 text-brown-600 border-brown-300 rounded focus:ring-brown-500"
                  />
                  <span className="text-sm text-brown-700">{color}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Active filters summary */}
        {hasActiveFilters && (
          <div className="p-6">
            <h4 className="text-sm font-medium text-brown-800 mb-3">Aktywne filtry:</h4>
            <div className="flex flex-wrap gap-2">
              {filters.category && (
                <span className="inline-flex items-center px-3 py-1 bg-brown-100 text-brown-700 rounded-full text-xs">
                  {CATEGORIES.find(c => c.id === filters.category)?.name}
                  <button
                    onClick={() => handleCategoryChange(undefined)}
                    className="ml-2 hover:text-brown-900"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              
              {filters.colors?.map((color) => (
                <span key={color} className="inline-flex items-center px-3 py-1 bg-brown-100 text-brown-700 rounded-full text-xs">
                  {color}
                  <button
                    onClick={() => handleColorChange(color)}
                    className="ml-2 hover:text-brown-900"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}