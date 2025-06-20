export interface Product {
  id: string;
  name: string;
  description: string;
  dimensions: string;
  availableColors: string[];
  category: ProductCategory;
  images: string[];
  mainImage: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
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