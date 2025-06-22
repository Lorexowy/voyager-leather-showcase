import { Timestamp } from 'firebase/firestore';
import { ProductCategory, ProductDimensions } from '@/types';

// Firestore document types
export interface FirestoreProduct {
  id: string;
  name: string;
  description: string;
  dimensions?: ProductDimensions; // Zaktualizowane na nowy format
  availableColors: string[];
  category: ProductCategory;
  images: string[];
  mainImage: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  isActive: boolean;
  slug?: string;
  metaDescription?: string;
}

export interface FirestoreContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  productId?: string;
  productName?: string;
  createdAt: Timestamp;
  isRead: boolean;
  isReplied: boolean;
}

export interface FirestoreAdmin {
  id: string;
  email: string;
  displayName?: string;
  lastLogin: Timestamp;
  createdAt: Timestamp;
}

// Helper functions
export const convertFirestoreProduct = (firestoreProduct: FirestoreProduct) => ({
  ...firestoreProduct,
  createdAt: firestoreProduct.createdAt.toDate(),
  updatedAt: firestoreProduct.updatedAt.toDate(),
});

export const convertToFirestoreProduct = (product: any): Omit<FirestoreProduct, 'id'> => ({
  ...product,
  createdAt: Timestamp.fromDate(product.createdAt || new Date()),
  updatedAt: Timestamp.fromDate(product.updatedAt || new Date()),
});

// Collection names
export const COLLECTIONS = {
  PRODUCTS: 'products',
  CONTACT_MESSAGES: 'contactMessages',
  ADMINS: 'admins',
} as const;

// Helper function for contact messages
export const convertFirestoreContactMessage = (firestoreMessage: FirestoreContactMessage) => ({
  ...firestoreMessage,
  createdAt: firestoreMessage.createdAt.toDate(),
});