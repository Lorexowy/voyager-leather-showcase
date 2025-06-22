import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  getDoc,
  updateDoc, 
  deleteDoc,
  query, 
  where,
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';
import { COLLECTIONS, FirestoreProduct, convertFirestoreProduct } from './firestore-types';
import { Product, ProductCategory } from '@/types';

// Dodaj nowy produkt
export const addProduct = async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    console.log('🔍 Debug - Adding product with data:', productData);
    
    // Przygotuj dane - usuń undefined fields
    const cleanData: any = {
      name: productData.name,
      description: productData.description,
      category: productData.category,
      availableColors: productData.availableColors,
      images: productData.images,
      mainImage: productData.mainImage,
      isActive: productData.isActive,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };
    
    // Dodaj dimensions tylko jeśli istnieją i nie są undefined
    if (productData.dimensions) {
      cleanData.dimensions = productData.dimensions;
    }
    
    console.log('🔍 Clean data to save:', cleanData);
    
    const docRef = await addDoc(collection(db, COLLECTIONS.PRODUCTS), cleanData);
    
    console.log('✅ Product added successfully with ID:', docRef.id);
    return docRef.id;
  } catch (error: any) {
    console.error('❌ Detailed error adding product:', error);
    console.error('❌ Error code:', error?.code);
    console.error('❌ Error message:', error?.message);
    throw new Error(`Nie udało się dodać produktu: ${error?.message || 'Nieznany błąd'}`);
  }
};

// Pobierz wszystkie produkty (dla admina)
export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const q = query(
      collection(db, COLLECTIONS.PRODUCTS),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const products: Product[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<FirestoreProduct, 'id'>;
      products.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
      });
    });
    
    return products;
  } catch (error) {
    console.error('Error fetching all products:', error);
    throw new Error('Nie udało się pobrać produktów');
  }
};

// Pobierz tylko aktywne produkty (dla strony publicznej)
export const getActiveProducts = async (): Promise<Product[]> => {
  try {
    const q = query(
      collection(db, COLLECTIONS.PRODUCTS),
      where('isActive', '==', true),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const products: Product[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<FirestoreProduct, 'id'>;
      products.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
      });
    });
    
    return products;
  } catch (error) {
    console.error('Error fetching active products:', error);
    throw new Error('Nie udało się pobrać produktów');
  }
};

// Pobierz produkty według kategorii
export const getProductsByCategory = async (category: ProductCategory): Promise<Product[]> => {
  try {
    const q = query(
      collection(db, COLLECTIONS.PRODUCTS),
      where('category', '==', category),
      where('isActive', '==', true),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const products: Product[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<FirestoreProduct, 'id'>;
      products.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
      });
    });
    
    return products;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw new Error('Nie udało się pobrać produktów z kategorii');
  }
};

// Pobierz jeden produkt według ID
export const getProductById = async (productId: string): Promise<Product | null> => {
  try {
    const docRef = doc(db, COLLECTIONS.PRODUCTS, productId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data() as Omit<FirestoreProduct, 'id'>;
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw new Error('Nie udało się pobrać produktu');
  }
};

// Zaktualizuj produkt
export const updateProduct = async (productId: string, productData: Partial<Omit<Product, 'id' | 'createdAt'>>): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTIONS.PRODUCTS, productId);
    
    // Przygotuj dane do aktualizacji - usuń undefined values
    const cleanData: any = {
      updatedAt: Timestamp.now(),
    };
    
    // Dodaj tylko zdefiniowane pola
    Object.keys(productData).forEach(key => {
      const value = (productData as any)[key];
      if (value !== undefined) {
        cleanData[key] = value;
      }
    });
    
    await updateDoc(docRef, cleanData);
  } catch (error) {
    console.error('Error updating product:', error);
    throw new Error('Nie udało się zaktualizować produktu');
  }
};

// Usuń produkt
export const deleteProduct = async (productId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, COLLECTIONS.PRODUCTS, productId));
  } catch (error) {
    console.error('Error deleting product:', error);
    throw new Error('Nie udało się usunąć produktu');
  }
};

// Przełącz status aktywności produktu
export const toggleProductStatus = async (productId: string): Promise<boolean> => {
  try {
    const product = await getProductById(productId);
    if (!product) {
      throw new Error('Produkt nie znaleziony');
    }
    
    const newStatus = !product.isActive;
    await updateProduct(productId, { isActive: newStatus });
    
    return newStatus;
  } catch (error) {
    console.error('Error toggling product status:', error);
    throw new Error('Nie udało się zmienić statusu produktu');
  }
};

// Wyszukaj produkty
export const searchProducts = async (searchTerm: string): Promise<Product[]> => {
  try {
    // Firebase nie ma pełnego wyszukiwania tekstowego, więc pobieramy wszystkie aktywne produkty
    // i filtrujemy po stronie klienta
    const products = await getActiveProducts();
    
    return products.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  } catch (error) {
    console.error('Error searching products:', error);
    throw new Error('Nie udało się wyszukać produktów');
  }
};

// Pobierz podobne produkty (z tej samej kategorii)
export const getSimilarProducts = async (productId: string, category: ProductCategory, limit: number = 3): Promise<Product[]> => {
  try {
    const products = await getProductsByCategory(category);
    
    // Usuń aktualny produkt i zwróć pierwsze {limit} produktów
    return products
      .filter(product => product.id !== productId)
      .slice(0, limit);
  } catch (error) {
    console.error('Error fetching similar products:', error);
    throw new Error('Nie udało się pobrać podobnych produktów');
  }
};

// Pobierz wyróżnione produkty (najnowsze aktywne)
export const getFeaturedProducts = async (limit: number = 4): Promise<Product[]> => {
  try {
    const products = await getActiveProducts();
    return products.slice(0, limit);
  } catch (error) {
    console.error('Error fetching featured products:', error);
    throw new Error('Nie udało się pobrać wyróżnionych produktów');
  }
};

// Pobierz statystyki produktów
export const getProductsStats = async () => {
  try {
    const allProducts = await getAllProducts();
    const activeProducts = allProducts.filter(p => p.isActive);
    
    // Statystyki według kategorii
    const categoryStats = {} as Record<ProductCategory, { total: number; active: number }>;
    
    allProducts.forEach(product => {
      if (!categoryStats[product.category]) {
        categoryStats[product.category] = { total: 0, active: 0 };
      }
      categoryStats[product.category].total++;
      if (product.isActive) {
        categoryStats[product.category].active++;
      }
    });
    
    return {
      total: allProducts.length,
      active: activeProducts.length,
      inactive: allProducts.length - activeProducts.length,
      byCategory: categoryStats
    };
  } catch (error) {
    console.error('Error getting products stats:', error);
    throw new Error('Nie udało się pobrać statystyk produktów');
  }
};