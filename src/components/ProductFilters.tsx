'use client';

import { useState } from 'react';
import { ChevronDown, X, Filter } from 'lucide-react';
import { FilterOptions, ProductCategory, CATEGORIES } from '@/types';

interface ProductFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  totalProducts: number;
  hideCategories?: boolean;
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

export default function ProductFilters({ 
  filters, 
  onFiltersChange, 
  totalProducts, 
  hideCategories = false 
}: ProductFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openSections, setOpenSections] = useState<Set<string>>(
    new Set(hideCategories ? ['colors'] : ['category', 'colors'])
  );

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
    if (hideCategories) {
      onFiltersChange({ colors: undefined });
    } else {
      onFiltersChange({});
    }
  };

  const hasActiveFilters = hideCategories 
    ? (filters.colors && filters.colors.length > 0)
    : (filters.category || (filters.colors && filters.colors.length > 0));

  return (
    <>
      {/* Mobile toggle button - minimal */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden w-full flex items-center justify-between p-4 bg-white border border-gray-200 mb-8 hover:border-gray-900 transition-colors font-light"
      >
        <div className="flex items-center space-x-3">
          <Filter className="w-4 h-4 text-gray-600" />
          <span className="text-gray-900 uppercase tracking-wider">Filtry</span>
          {hasActiveFilters && (
            <span className="w-1.5 h-1.5 bg-gray-900 rounded-full"></span>
          )}
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Filters panel - minimal */}
      <div className={`bg-white border border-gray-200 overflow-hidden ${
        isOpen ? 'block' : 'hidden lg:block'
      }`}>
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-light text-gray-900 uppercase tracking-wider">Filtry</h3>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-light uppercase tracking-wider"
              >
                Wyczyść
              </button>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-2 font-light">
            {totalProducts} produktów
          </p>
        </div>

        {/* Category filter */}
        {!hideCategories && (
          <div className="border-b border-gray-100">
            <button
              onClick={() => toggleSection('category')}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="font-light text-gray-900 uppercase tracking-wider">Kategoria</span>
              <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${
                openSections.has('category') ? 'rotate-180' : ''
              }`} />
            </button>
            
            {openSections.has('category') && (
              <div className="px-6 pb-6 space-y-4">
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="category"
                    checked={!filters.category}
                    onChange={() => handleCategoryChange(undefined)}
                    className="w-4 h-4 text-gray-900 border-gray-300 focus:ring-gray-900"
                  />
                  <span className="text-sm text-gray-700 font-light group-hover:text-gray-900 transition-colors">
                    Wszystkie kategorie
                  </span>
                </label>
                
                {CATEGORIES.map((category) => (
                  <label key={category.id} className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="category"
                      checked={filters.category === category.id}
                      onChange={() => handleCategoryChange(category.id)}
                      className="w-4 h-4 text-gray-900 border-gray-300 focus:ring-gray-900"
                    />
                    <span className="text-sm text-gray-700 font-light group-hover:text-gray-900 transition-colors">
                      {category.name}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Colors filter */}
        <div className={`${!hideCategories ? 'border-b border-gray-100' : ''}`}>
          <button
            onClick={() => toggleSection('colors')}
            className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
          >
            <span className="font-light text-gray-900 uppercase tracking-wider">Kolory</span>
            <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${
              openSections.has('colors') ? 'rotate-180' : ''
            }`} />
          </button>
          
          {openSections.has('colors') && (
            <div className="px-6 pb-6 space-y-4">
              {availableColors.map((color) => (
                <label key={color} className="flex items-center space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={(filters.colors || []).includes(color)}
                    onChange={() => handleColorChange(color)}
                    className="w-4 h-4 text-gray-900 border-gray-300 focus:ring-gray-900"
                  />
                  <span className="text-sm text-gray-700 font-light group-hover:text-gray-900 transition-colors">
                    {color}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Active filters summary */}
        {hasActiveFilters && (
          <div className="p-6">
            <h4 className="text-sm font-light text-gray-900 mb-4 uppercase tracking-wider">Aktywne filtry:</h4>
            <div className="flex flex-wrap gap-2">
              {!hideCategories && filters.category && (
                <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-xs font-light">
                  {CATEGORIES.find(c => c.id === filters.category)?.name}
                  <button
                    onClick={() => handleCategoryChange(undefined)}
                    className="ml-2 hover:text-gray-900 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              
              {filters.colors?.map((color) => (
                <span key={color} className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-xs font-light">
                  {color}
                  <button
                    onClick={() => handleColorChange(color)}
                    className="ml-2 hover:text-gray-900 transition-colors"
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