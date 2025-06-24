export interface Product {
  id: string;
  name: string;
  description: string;
  dimensions?: ProductDimensions; // Teraz opcjonalne i jako obiekt
  availableColors: string[];
  category: ProductCategory;
  images: string[];
  mainImage: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export interface ProductDimensions {
  width?: number;  // szerokość w cm
  height?: number; // wysokość w cm
  depth?: number;  // głębokość w cm
  length?: number; // długość w cm (dla pasków)
  unit: 'cm' | 'mm'; // jednostka
}

export type ProductCategory = 
  | 'torebki'
  | 'paski' 
  | 'plecaki'
  | 'personalizacja'
  | 'as-aleksandra-sopel';

export interface CategoryInfo {
  id: ProductCategory;
  name: string;
  description: string;
  slug: string;
}

export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  message: string;
  productId?: string;
  productName?: string;
  consentGiven?: boolean;
  consentTimestamp?: string; 
}

export interface AdminUser {
  email: string;
  password: string;
}

export interface FilterOptions {
  category?: ProductCategory;
  search?: string;
  colors?: string[];
}

// Funkcja pomocnicza do formatowania wymiarów
export const formatDimensions = (dimensions?: ProductDimensions): string => {
  if (!dimensions) return 'Brak informacji o wymiarach';
  
  const { width, height, depth, length, unit } = dimensions;
  const parts: string[] = [];
  
  // Dla pasków używamy długość x szerokość
  if (length && width) {
    parts.push(`${length} x ${width} ${unit}`);
  }
  // Dla innych produktów używamy szerokość x wysokość x głębokość
  else {
    if (width) parts.push(`${width}`);
    if (height) parts.push(`${height}`);
    if (depth) parts.push(`${depth}`);
    
    if (parts.length > 0) {
      return `${parts.join(' x ')} ${unit}`;
    }
  }
  
  return parts.length > 0 ? parts.join(' x ') + ` ${unit}` : 'Brak informacji o wymiarach';
};

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'torebki',
    name: 'Torebki',
    description: 'Eleganckie torebki skórzane dla wymagających klientów',
    slug: 'torebki'
  },
  {
    id: 'paski',
    name: 'Paski',
    description: 'Klasyczne i nowoczesne paski ze skóry naturalnej',
    slug: 'paski'
  },
  {
    id: 'plecaki',
    name: 'Plecaki',
    description: 'Funkcjonalne plecaki łączące styl z praktycznością',
    slug: 'plecaki'
  },
  {
    id: 'personalizacja',
    name: 'Personalizacja Produktów',
    description: 'Usługi personalizacji produktów skórzanych dla firm',
    slug: 'personalizacja'
  },
  {
    id: 'as-aleksandra-sopel',
    name: 'AS | Aleksandra Sopel',
    description: 'Ekskluzywna linia produktów z najlepszej jakości skóry',
    slug: 'as-aleksandra-sopel'
  }
];