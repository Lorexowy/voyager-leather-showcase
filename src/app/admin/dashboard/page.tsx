'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
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
  Users
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Product, ProductCategory, CATEGORIES } from '@/types';
import ConfirmDialog from '@/components/ConfirmDialog';

// Mock data - później zastąpimy danymi z Firebase
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Elegancka Torebka Damska',
    description: 'Klasyczna torebka wykonana ze skóry naturalnej najwyższej jakości.',
    category: 'torebki' as ProductCategory,
    mainImage: '/placeholder-bag.jpg',
    images: ['/placeholder-bag.jpg', '/placeholder-bag-2.jpg'],
    availableColors: ['Czarny', 'Brązowy', 'Beżowy'],
    dimensions: '30x25x12 cm',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
    isActive: true
  },
  {
    id: '2',
    name: 'Biznesowy Plecak Skórzany',
    description: 'Funkcjonalny plecak idealny do pracy.',
    category: 'plecaki' as ProductCategory,
    mainImage: '/placeholder-backpack.jpg',
    images: ['/placeholder-backpack.jpg'],
    availableColors: ['Czarny', 'Brązowy'],
    dimensions: '40x30x15 cm',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-18'),
    isActive: true
  },
  {
    id: '3',
    name: 'Klasyczny Pasek Męski',
    description: 'Elegancki pasek z naturalnej skóry.',
    category: 'paski' as ProductCategory,
    mainImage: '/placeholder-belt.jpg',
    images: ['/placeholder-belt.jpg'],
    availableColors: ['Czarny', 'Brązowy', 'Koniakowy'],
    dimensions: 'Szerokość: 3.5 cm',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-15'),
    isActive: false
  },
  {
    id: '4',
    name: 'AS | Premium Portfel',
    description: 'Ekskluzywny portfel z linii Aleksandra Sopel.',
    category: 'as-aleksandra-sopel' as ProductCategory,
    mainImage: '/placeholder-wallet.jpg',
    images: ['/placeholder-wallet.jpg'],
    availableColors: ['Czarny', 'Bordowy'],
    dimensions: '11x9x2 cm',
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-22'),
    isActive: true
  },
  {
    id: '5',
    name: 'Personalizowany Organizer',
    description: 'Elegancki organizer biurowy z możliwością grawerowania logo firmy.',
    category: 'personalizacja' as ProductCategory,
    mainImage: '/placeholder-organizer.jpg',
    images: ['/placeholder-organizer.jpg'],
    availableColors: ['Czarny', 'Brązowy', 'Koniakowy'],
    dimensions: '25x20x5 cm',
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-16'),
    isActive: true
  },
  {
    id: '6',
    name: 'Damska Torebka Crossbody',
    description: 'Mała, praktyczna torebka na ramię, idealna na co dzień.',
    category: 'torebki' as ProductCategory,
    mainImage: '/placeholder-crossbody.jpg',
    images: ['/placeholder-crossbody.jpg'],
    availableColors: ['Czarny', 'Beżowy', 'Czerwony'],
    dimensions: '25x18x8 cm',
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-19'),
    isActive: true
  }
];

const stats = [
  { label: 'Wszystkie produkty', value: mockProducts.length.toString(), icon: Package, color: 'bg-blue-500' },
  { label: 'Aktywne produkty', value: mockProducts.filter(p => p.isActive).length.toString(), icon: Eye, color: 'bg-green-500' },
  { label: 'Nieaktywne produkty', value: mockProducts.filter(p => !p.isActive).length.toString(), icon: Filter, color: 'bg-yellow-500' },
  { label: 'Kategorie', value: CATEGORIES.length.toString(), icon: BarChart3, color: 'bg-purple-500' }
];

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryName = (categoryId: ProductCategory) => {
    return CATEGORIES.find(cat => cat.id === categoryId)?.name || categoryId;
  };

  const handleLogout = () => {
    // Tutaj będzie logika wylogowania z Firebase Auth
    toast.success('Wylogowano pomyślnie');
    router.push('/admin/login');
  };

  const handleDeleteProduct = (product: Product) => {
    setProductToDelete(product);
    setShowDeleteDialog(true);
  };

  const confirmDeleteProduct = async () => {
    if (!productToDelete) return;

    setIsDeleting(true);

    try {
      // Tutaj będzie logika usuwania z Firebase
      console.log('Deleting product:', productToDelete.id);
      
      // Symulacja usuwania
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success(`Produkt "${productToDelete.name}" został usunięty`);
      setShowDeleteDialog(false);
      setProductToDelete(null);
      
      // W prawdziwej aplikacji tutaj odświeżylibyśmy listę produktów
    } catch (error) {
      toast.error('Wystąpił błąd podczas usuwania produktu');
    } finally {
      setIsDeleting(false);
    }
  };

  const toggleProductStatus = async (productId: string) => {
    try {
      // Tutaj będzie logika zmiany statusu w Firebase
      const product = mockProducts.find(p => p.id === productId);
      if (product) {
        const newStatus = !product.isActive;
        console.log('Toggle product status:', productId, newStatus);
        
        // Symulacja aktualizacji
        await new Promise(resolve => setTimeout(resolve, 500));
        
        toast.success(`Produkt ${newStatus ? 'aktywowany' : 'deaktywowany'}`);
        
        // W prawdziwej aplikacji tutaj odświeżylibyśmy dane
      }
    } catch (error) {
      toast.error('Wystąpił błąd podczas zmiany statusu produktu');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo & Title */}
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-brown-600 to-brown-800 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">V</span>
                </div>
                <span className="text-xl font-serif font-bold text-brown-800">Voyager</span>
              </Link>
              <div className="h-6 border-l border-gray-300"></div>
              <h1 className="text-lg font-medium text-gray-900">Panel Administratora</h1>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="inline-flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Home className="w-4 h-4 mr-2" />
                Strona główna
              </Link>
              
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-2 text-sm text-gray-600 hover:text-red-600 transition-colors"
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Witaj w panelu administratora!
          </h2>
          <p className="text-gray-600">
            Zarządzaj produktami w swoim sklepie Voyager
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
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Link
            href="/admin/products/add"
            className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-brown-100 rounded-lg flex items-center justify-center group-hover:bg-brown-200 transition-colors">
                <Plus className="w-6 h-6 text-brown-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Dodaj Produkt</h3>
                <p className="text-sm text-gray-600">Dodaj nowy produkt do katalogu</p>
              </div>
            </div>
          </Link>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Zapytania</h3>
                <p className="text-sm text-gray-600">Wkrótce dostępne</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Settings className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Ustawienia</h3>
                <p className="text-sm text-gray-600">Wkrótce dostępne</p>
              </div>
            </div>
          </div>
        </div>

        {/* Products Management */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h2 className="text-lg font-medium text-gray-900">Zarządzanie Produktami</h2>
              
              <Link
                href="/admin/products/add"
                className="inline-flex items-center px-4 py-2 bg-brown-700 text-white rounded-lg hover:bg-brown-800 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Dodaj Produkt
              </Link>
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
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-transparent"
                />
              </div>

              {/* Category filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as ProductCategory | 'all')}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-transparent"
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
                          <div className="h-12 w-12 bg-gradient-to-br from-brown-100 to-brown-200 rounded-lg flex items-center justify-center">
                            <span className="text-brown-600 font-medium text-sm">
                              {product.name.charAt(0)}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 line-clamp-1">
                            {product.name}
                          </div>
                          <div className="text-sm text-gray-500 line-clamp-1">
                            {product.description.substring(0, 50)}...
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        product.category === 'as-aleksandra-sopel' 
                          ? 'bg-accent-100 text-accent-800' 
                          : 'bg-brown-100 text-brown-800'
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
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
          {filteredProducts.length === 0 && (
            <div className="px-6 py-12 text-center">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Brak produktów</h3>
              <p className="text-gray-500 mb-6">
                {searchTerm || selectedCategory !== 'all' 
                  ? 'Nie znaleziono produktów pasujących do kryteriów wyszukiwania.'
                  : 'Nie masz jeszcze żadnych produktów w bazie danych.'
                }
              </p>
              {(!searchTerm && selectedCategory === 'all') && (
                <Link
                  href="/admin/products/add"
                  className="inline-flex items-center px-4 py-2 bg-brown-700 text-white rounded-lg hover:bg-brown-800 transition-colors"
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
                <div className="text-sm text-gray-700">
                  Pokazano <span className="font-medium">{filteredProducts.length}</span> z <span className="font-medium">{mockProducts.length}</span> produktów
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Recent Activity & Quick Stats */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Ostatnie aktualizacje</h3>
            <div className="space-y-3">
              {mockProducts
                .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
                .slice(0, 5)
                .map((product) => (
                  <div key={product.id} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-brown-100 to-brown-200 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-brown-600 font-medium text-xs">
                        {product.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {product.name}
                      </p>
                      <p className="text-xs text-gray-500">
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
            </div>
          </div>

          {/* Categories Stats */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Statystyki kategorii</h3>
            <div className="space-y-3">
              {CATEGORIES.map((category) => {
                const count = mockProducts.filter(p => p.category === category.id).length;
                const activeCount = mockProducts.filter(p => p.category === category.id && p.isActive).length;
                return (
                  <div key={category.id} className="flex items-center justify-between">
                    <div className="flex-1">
                      <span className="text-sm text-gray-600">{category.name}</span>
                      <div className="text-xs text-gray-400">
                        {activeCount} aktywnych z {count} produktów
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900">{count}</span>
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