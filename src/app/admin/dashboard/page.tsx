'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { isUserAdmin, signOut } from '@/lib/auth';
import { 
  getAllProducts, 
  toggleProductStatus as toggleProductStatusFirebase,
  deleteProduct as deleteProductFirebase,
  getProductsStats 
} from '@/lib/products';
import { 
  Package, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Search, 
  Filter,
  ExternalLink,
  LogOut,
  Home,
  BarChart3,
  MoreVertical,
  Settings,
  Users,
  Mail,
  Clock,
  Shield,
  RefreshCw
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Product, ProductCategory, CATEGORIES, formatDimensions } from '@/types';
import ConfirmDialog from '@/components/ConfirmDialog';
import ContactMessagesPanel from '@/components/ContactMessagesPanel';
import AdminManagementPanel from '@/components/AdminManagementPanel';

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [productsStats, setProductsStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    byCategory: {} as Record<ProductCategory, { total: number; active: number }>
  });
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeTab, setActiveTab] = useState<'products' | 'messages' | 'admins'>('products');
  const router = useRouter();

  // Sprawdź autoryzację
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const adminStatus = await isUserAdmin(currentUser);
        if (adminStatus) {
          setUser(currentUser);
          setIsAdmin(true);
        } else {
          toast.error('Brak uprawnień administratora');
          router.push('/admin/login');
        }
      } else {
        router.push('/admin/login');
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  // Załaduj produkty gdy admin jest zalogowany
  useEffect(() => {
    if (isAdmin) {
      fetchProducts();
    }
  }, [isAdmin]);

  // Funkcja ładowania produktów
  const fetchProducts = async () => {
    setIsLoadingProducts(true);
    try {
      const [allProducts, stats] = await Promise.all([
        getAllProducts(),
        getProductsStats()
      ]);
      setProducts(allProducts);
      setProductsStats(stats);
    } catch (error: any) {
      toast.error(error.message || 'Nie udało się załadować produktów');
    } finally {
      setIsLoadingProducts(false);
    }
  };

  // Pokaż loader podczas sprawdzania autoryzacji
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-gray-900 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 font-light">Sprawdzanie uprawnień...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null; // Przekierowanie w toku
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryName = (categoryId: ProductCategory) => {
    return CATEGORIES.find(cat => cat.id === categoryId)?.name || categoryId;
  };

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success('Wylogowano pomyślnie');
      router.push('/admin/login');
    } catch (error) {
      toast.error('Błąd podczas wylogowania');
    }
  };

  const handleDeleteProduct = (product: Product) => {
    setProductToDelete(product);
    setShowDeleteDialog(true);
  };

  const confirmDeleteProduct = async () => {
    if (!productToDelete) return;

    setIsDeleting(true);

    try {
      await deleteProductFirebase(productToDelete.id);
      toast.success(`Produkt "${productToDelete.name}" został usunięty`);
      setShowDeleteDialog(false);
      setProductToDelete(null);
      
      // Odśwież listę produktów
      await fetchProducts();
    } catch (error: any) {
      toast.error(error.message || 'Wystąpił błąd podczas usuwania produktu');
    } finally {
      setIsDeleting(false);
    }
  };

  const toggleProductStatus = async (productId: string) => {
    try {
      const newStatus = await toggleProductStatusFirebase(productId);
      toast.success(`Produkt ${newStatus ? 'aktywowany' : 'deaktywowany'}`);
      
      // Odśwież listę produktów
      await fetchProducts();
    } catch (error: any) {
      toast.error(error.message || 'Wystąpił błąd podczas zmiany statusu produktu');
    }
  };

  const stats = [
    { label: 'Wszystkie produkty', value: productsStats.total.toString(), icon: Package, color: 'bg-blue-500' },
    { label: 'Aktywne produkty', value: productsStats.active.toString(), icon: Eye, color: 'bg-green-500' },
    { label: 'Nieaktywne produkty', value: productsStats.inactive.toString(), icon: Filter, color: 'bg-yellow-500' },
    { label: 'Kategorie', value: CATEGORIES.length.toString(), icon: BarChart3, color: 'bg-purple-500' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo & Title */}
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-900 rounded-sm flex items-center justify-center">
                  <span className="text-white font-light tracking-wider">V</span>
                </div>
                <span className="text-xl font-light text-gray-900 tracking-wide">Voyager</span>
              </Link>
              <div className="h-6 border-l border-gray-300"></div>
              <h1 className="text-lg font-light text-gray-900">Panel Administratora</h1>
            </div>

            {/* User info & Actions */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 font-light">
                {user?.email}
              </span>
              
              <Link
                href="/"
                className="inline-flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors font-light"
              >
                <Home className="w-4 h-4 mr-2" />
                Strona główna
              </Link>
              
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-2 text-sm text-gray-600 hover:text-red-600 transition-colors font-light"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Wyloguj
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Message */}
        <div className="mb-8">
          <h2 className="text-2xl font-light text-gray-900 mb-2 tracking-tight">
            Witaj w panelu administratora!
          </h2>
          <p className="text-gray-600 font-light">
            Zarządzaj produktami, wiadomościami i administratorami w swoim sklepie Voyager
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1 font-light uppercase tracking-wider">{stat.label}</p>
                    <p className="text-2xl font-light text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('products')}
                className={`py-2 px-1 border-b-2 font-light text-sm transition-colors ${
                  activeTab === 'products'
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Package className="w-4 h-4" />
                  <span>Produkty</span>
                </div>
              </button>
              
              <button
                onClick={() => setActiveTab('messages')}
                className={`py-2 px-1 border-b-2 font-light text-sm transition-colors ${
                  activeTab === 'messages'
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>Wiadomości</span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('admins')}
                className={`py-2 px-1 border-b-2 font-light text-sm transition-colors ${
                  activeTab === 'admins'
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span>Administratorzy</span>
                </div>
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'products' && (
          <div className="space-y-8">
            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-6">
              <Link
                href="/admin/products/add"
                className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow group"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                    <Plus className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-light text-gray-900">Dodaj Produkt</h3>
                    <p className="text-sm text-gray-600 font-light">Dodaj nowy produkt do katalogu</p>
                  </div>
                </div>
              </Link>

              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-light text-gray-900">Klienci</h3>
                    <p className="text-sm text-gray-600 font-light">Wkrótce dostępne</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Settings className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-light text-gray-900">Ustawienia</h3>
                    <p className="text-sm text-gray-600 font-light">Wkrótce dostępne</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Management */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <h2 className="text-lg font-light text-gray-900">Zarządzanie Produktami</h2>
                  
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={fetchProducts}
                      disabled={isLoadingProducts}
                      className="inline-flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors font-light"
                    >
                      <RefreshCw className={`w-4 h-4 mr-2 ${isLoadingProducts ? 'animate-spin' : ''}`} />
                      Odśwież
                    </button>
                    
                    <Link
                      href="/admin/products/add"
                      className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-light"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Dodaj Produkt
                    </Link>
                  </div>
                </div>
              </div>

              {/* Filters */}
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Search */}
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Szukaj produktów..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent font-light"
                    />
                  </div>

                  {/* Category filter */}
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value as ProductCategory | 'all')}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent font-light"
                  >
                    <option value="all">Wszystkie kategorie</option>
                    {CATEGORIES.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Loading state */}
              {isLoadingProducts ? (
                <div className="p-12 text-center">
                  <RefreshCw className="w-8 h-8 text-gray-400 animate-spin mx-auto mb-4" />
                  <p className="text-gray-600 font-light">Ładowanie produktów...</p>
                </div>
              ) : (
                <>
                  {/* Products Table */}
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Produkt
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Kategoria
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Ostatnia aktualizacja
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Akcje
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {filteredProducts.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-12 w-12">
                                    {product.mainImage ? (
                                      <img
                                        src={product.mainImage}
                                        alt={product.name}
                                        className="h-12 w-12 object-cover rounded-lg border border-gray-200"
                                        onError={(e) => {
                                          // Fallback jeśli zdjęcie się nie załaduje
                                          const target = e.target as HTMLImageElement;
                                          target.style.display = 'none';
                                          const fallback = target.nextElementSibling as HTMLElement;
                                          if (fallback) fallback.style.display = 'flex';
                                        }}
                                      />
                                    ) : null}
                                    {/* Fallback placeholder */}
                                    <div 
                                      className={`h-12 w-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center border border-gray-200 ${
                                        product.mainImage ? 'hidden' : 'flex'
                                      }`}
                                    >
                                      <span className="text-gray-600 font-medium text-sm">
                                        {product.name.charAt(0)}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900 line-clamp-1">
                                      {product.name}
                                    </div>
                                    <div className="text-sm text-gray-500 line-clamp-1 font-light">
                                      {product.description.substring(0, 50)}...
                                    </div>
                                    <div className="text-xs text-gray-400 font-light mt-1">
                                      {formatDimensions(product.dimensions)}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              {/* Reszta kolumn bez zmian */}
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                  product.category === 'as-aleksandra-sopel' 
                                    ? 'bg-gray-800 text-white' 
                                    : 'bg-gray-100 text-gray-800'
                                }`}>
                                  {getCategoryName(product.category)}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <button
                                  onClick={() => toggleProductStatus(product.id)}
                                  className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                    product.isActive 
                                      ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                                      : 'bg-red-100 text-red-800 hover:bg-red-200'
                                  } transition-colors cursor-pointer`}
                                >
                                  {product.isActive ? 'Aktywny' : 'Nieaktywny'}
                                </button>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-light">
                                {product.updatedAt.toLocaleDateString('pl-PL')}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div className="flex items-center justify-end space-x-2">
                                  <Link
                                    href={`/produkty/szczegoly/${product.id}`}
                                    target="_blank"
                                    className="text-blue-600 hover:text-blue-800 p-1 rounded transition-colors"
                                    title="Zobacz produkt"
                                  >
                                    <ExternalLink className="w-4 h-4" />
                                  </Link>
                                  
                                  <Link
                                    href={`/admin/products/edit/${product.id}`}
                                    className="text-gray-600 hover:text-gray-800 p-1 rounded transition-colors"
                                    title="Edytuj"
                                  >
                                    <Edit className="w-4 h-4" />
                                  </Link>
                                  
                                  <button
                                    onClick={() => handleDeleteProduct(product)}
                                    className="text-red-600 hover:text-red-800 p-1 rounded transition-colors"
                                    title="Usuń"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                  {/* Empty state */}
                  {filteredProducts.length === 0 && !isLoadingProducts && (
                    <div className="px-6 py-12 text-center">
                      <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-light text-gray-900 mb-2">
                        {products.length === 0 ? 'Brak produktów' : 'Nie znaleziono produktów'}
                      </h3>
                      <p className="text-gray-500 mb-6 font-light">
                        {products.length === 0 
                          ? 'Nie masz jeszcze żadnych produktów w bazie danych.'
                          : searchTerm || selectedCategory !== 'all' 
                            ? 'Nie znaleziono produktów pasujących do kryteriów wyszukiwania.'
                            : 'Nie znaleziono produktów.'
                        }
                      </p>
                      {products.length === 0 && (
                        <Link
                          href="/admin/products/add"
                          className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-light"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Dodaj pierwszy produkt
                        </Link>
                      )}
                    </div>
                  )}

                  {/* Results count */}
                  {filteredProducts.length > 0 && (
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-700 font-light">
                          Pokazano <span className="font-medium">{filteredProducts.length}</span> z <span className="font-medium">{products.length}</span> produktów
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Recent Activity & Quick Stats */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-light text-gray-900 mb-4">Ostatnie aktualizacje</h3>
                <div className="space-y-3">
                  {products
                    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
                    .slice(0, 5)
                    .map((product) => (
                      <div key={product.id} className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-gray-600 font-medium text-xs">
                            {product.name.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {product.name}
                          </p>
                          <p className="text-xs text-gray-500 font-light">
                            Zaktualizowano {product.updatedAt.toLocaleDateString('pl-PL')}
                          </p>
                        </div>
                        <Link
                          href={`/admin/products/edit/${product.id}`}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                      </div>
                    ))}
                  
                  {products.length === 0 && (
                    <p className="text-gray-500 text-sm font-light text-center py-4">
                      Brak produktów do wyświetlenia
                    </p>
                  )}
                </div>
              </div>

              {/* Categories Stats */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-light text-gray-900 mb-4">Statystyki kategorii</h3>
                <div className="space-y-3">
                  {CATEGORIES.map((category) => {
                    const categoryStats = productsStats.byCategory[category.id] || { total: 0, active: 0 };
                    return (
                      <div key={category.id} className="flex items-center justify-between">
                        <div className="flex-1">
                          <span className="text-sm text-gray-600 font-light">{category.name}</span>
                          <div className="text-xs text-gray-400 font-light">
                            {categoryStats.active} aktywnych z {categoryStats.total} produktów
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-900">{categoryStats.total}</span>
                          <Link
                            href={`/produkty/${category.slug}`}
                            target="_blank"
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div>
            <ContactMessagesPanel />
          </div>
        )}

        {/* Admins Tab */}
        {activeTab === 'admins' && (
          <div>
            <AdminManagementPanel />
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => {
          setShowDeleteDialog(false);
          setProductToDelete(null);
        }}
        onConfirm={confirmDeleteProduct}
        title="Usuń produkt"
        message={`Czy na pewno chcesz usunąć produkt "${productToDelete?.name}"? Tej operacji nie można cofnąć.`}
        confirmText="Usuń produkt"
        cancelText="Anuluj"
        type="danger"
        isLoading={isDeleting}
      />
    </div>
  );
}