import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  getDoc,
  updateDoc, 
  deleteDoc,
  deleteField,
  query, 
  where,
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';
import { COLLECTIONS, FirestoreProduct, convertFirestoreProduct } from './firestore-types';
import { Product, ProductCategory } from '@/types';
import { deleteMultipleImages } from './storage';

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

// ZAKTUALIZOWANA funkcja updateProduct
export const updateProduct = async (
  productId: string, 
  productData: Partial<Omit<Product, 'id' | 'createdAt'>>
): Promise<void> => {
  try {
    console.log('🔍 Updating product:', productId, 'with data:', productData);
    
    const docRef = doc(db, COLLECTIONS.PRODUCTS, productId);
    
    // Sprawdź czy dokument istnieje
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error('Produkt nie istnieje');
    }
    
    // Przygotuj dane do aktualizacji - DOKŁADNIE bez undefined
    const cleanData: Record<string, any> = {
      updatedAt: Timestamp.now(),
    };
    
    // Bezpieczne dodawanie pól - tylko te które naprawdę mają wartość
    if (productData.name !== undefined) {
      cleanData.name = productData.name;
    }
    
    if (productData.description !== undefined) {
      cleanData.description = productData.description;
    }
    
    if (productData.category !== undefined) {
      cleanData.category = productData.category;
    }
    
    if (productData.availableColors !== undefined) {
      cleanData.availableColors = productData.availableColors;
    }
    
    if (productData.images !== undefined) {
      cleanData.images = productData.images;
    }
    
    if (productData.mainImage !== undefined) {
      cleanData.mainImage = productData.mainImage;
    }
    
    if (productData.isActive !== undefined) {
      cleanData.isActive = productData.isActive;
    }
    
    // Specjalna obsługa dimensions - może być null lub obiekt
    if (productData.dimensions !== undefined) {
      if (productData.dimensions === null) {
        // Użyj deleteField() aby usunąć pole
        cleanData.dimensions = deleteField();
      } else {
        cleanData.dimensions = productData.dimensions;
      }
    }
    
    console.log('🔍 Clean data to update:', cleanData);
    
    // Użyj updateDoc z bezpieczną obsługą błędów
    await updateDoc(docRef, cleanData);
    
    console.log('✅ Product updated successfully');
  } catch (error: any) {
    console.error('❌ Error updating product:', error);
    console.error('❌ Error code:', error?.code);
    console.error('❌ Error message:', error?.message);
    
    // Lepsze komunikaty błędów
    if (error?.code === 'not-found') {
      throw new Error('Produkt nie został znaleziony');
    } else if (error?.code === 'permission-denied') {
      throw new Error('Brak uprawnień do edycji produktu');
    } else if (error?.code === 'invalid-argument') {
      throw new Error('Nieprawidłowe dane produktu');
    } else {
      throw new Error(`Nie udało się zaktualizować produktu: ${error?.message || 'Nieznany błąd'}`);
    }
  }
};

// Usuń produkt
export const deleteProduct = async (productId: string): Promise<void> => {
  try {
    // Najpierw pobierz dane produktu żeby mieć URLs zdjęć
    const product = await getProductById(productId);
    
    if (product && product.images && product.images.length > 0) {
      console.log(`Deleting ${product.images.length} images for product ${productId}`);
      
      // Usuń wszystkie zdjęcia z Firebase Storage
      try {
        await deleteMultipleImages(product.images);
        console.log('Images deleted successfully from storage');
      } catch (storageError) {
        console.error('Error deleting images from storage:', storageError);
        // Kontynuuj mimo błędu z storage - usuń przynajmniej rekord produktu
      }
    }
    
    // Usuń rekord produktu z Firestore
    await deleteDoc(doc(db, COLLECTIONS.PRODUCTS, productId));
    console.log('Product deleted successfully from Firestore');
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