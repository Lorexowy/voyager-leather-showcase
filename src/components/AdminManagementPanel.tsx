'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { 
  UserPlus, 
  Shield, 
  Mail, 
  Trash2, 
  RefreshCw,
  Calendar,
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff
} from 'lucide-react';
import toast from 'react-hot-toast';
import { 
  createNewAdmin, 
  getAllAdmins, 
  removeAdmin,
  AdminUser 
} from '@/lib/admin-management';
import ConfirmDialog from './ConfirmDialog';

interface AddAdminForm {
  email: string;
  displayName: string;
  temporaryPassword: string;
}

export default function AdminManagementPanel() {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState<AdminUser | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm<AddAdminForm>({
    mode: 'onChange'
  });

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    setIsLoading(true);
    try {
      const adminsList = await getAllAdmins();
      setAdmins(adminsList);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: AddAdminForm) => {
    setIsCreating(true);
    try {
      await createNewAdmin(data.email, data.temporaryPassword, data.displayName);
      toast.success('Administrator został utworzony pomyślnie!');
      reset();
      setShowAddForm(false);
      fetchAdmins();
    } catch (error: any) {
      if (error.message.includes('przekierowany na stronę logowania')) {
        toast.success('Administrator został utworzony pomyślnie!');
        toast.loading('Przekierowywanie na stronę logowania...', { duration: 2000 });
        setTimeout(() => {
          router.push('/admin/login');
        }, 2000);
      } else {
        toast.error(error.message);
      }
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteAdmin = (admin: AdminUser) => {
    setAdminToDelete(admin);
    setShowDeleteDialog(true);
  };

  const confirmDeleteAdmin = async () => {
    if (!adminToDelete) return;

    setIsDeleting(true);
    try {
      await removeAdmin(adminToDelete.id);
      toast.success(`Administrator ${adminToDelete.email} został usunięty`);
      setShowDeleteDialog(false);
      setAdminToDelete(null);
      fetchAdmins();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="flex items-center justify-center">
          <RefreshCw className="w-6 h-6 text-gray-400 animate-spin mr-3" />
          <span className="text-gray-600 font-light">Ładowanie administratorów...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-lg font-light text-gray-900">Zarządzanie Administratorami</h2>
              <p className="text-sm text-gray-600 font-light mt-1">
                Dodawaj i zarządzaj dostępem administratorów do panelu
              </p>
            </div>
            
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-light"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Dodaj Administratora
            </button>
          </div>
        </div>

        {/* Add Admin Form */}
        {showAddForm && (
          <div className="px-6 py-6 bg-gray-50 border-b border-gray-200">
            <h3 className="text-md font-light text-gray-900 mb-4">Dodaj nowego administratora</h3>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-light text-gray-900 mb-2">
                    Adres email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email', {
                      required: 'Email jest wymagany',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Nieprawidłowy format email'
                      }
                    })}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 font-light ${
                      errors.email ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="admin@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 flex items-center font-light">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Display Name */}
                <div>
                  <label htmlFor="displayName" className="block text-sm font-light text-gray-900 mb-2">
                    Nazwa wyświetlana
                  </label>
                  <input
                    type="text"
                    id="displayName"
                    {...register('displayName')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 font-light"
                    placeholder="Jan Kowalski"
                  />
                </div>
              </div>

              {/* Temporary Password */}
              <div>
                <label htmlFor="temporaryPassword" className="block text-sm font-light text-gray-900 mb-2">
                  Hasło <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="temporaryPassword"
                    {...register('temporaryPassword', {
                      required: 'Hasło jest wymagane',
                      minLength: {
                        value: 8,
                        message: 'Hasło musi mieć co najmniej 8 znaków'
                      }
                    })}
                    className={`w-full px-3 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 font-light ${
                      errors.temporaryPassword ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Wprowadź hasło"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.temporaryPassword && (
                  <p className="mt-1 text-sm text-red-600 flex items-center font-light">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.temporaryPassword.message}
                  </p>
                )}
                <p className="mt-1 text-xs text-gray-500 font-light">
                  Administrator będzie używał tego hasła do logowania
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-3 pt-4">
                <button
                  type="submit"
                  disabled={!isValid || isCreating}
                  className={`inline-flex items-center px-4 py-2 rounded-lg font-light transition-colors ${
                    isValid && !isCreating
                      ? 'bg-gray-900 text-white hover:bg-gray-800'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isCreating ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Tworzenie...
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4 mr-2" />
                      Utwórz Administratora
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    reset();
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors font-light"
                >
                  Anuluj
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Admins List */}
        <div className="divide-y divide-gray-200">
          {admins.length === 0 ? (
            <div className="p-12 text-center">
              <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-light text-gray-900 mb-2">Brak administratorów</h3>
              <p className="text-gray-500 font-light">
                Dodaj pierwszego administratora, aby zarządzać systemem.
              </p>
            </div>
          ) : (
            admins.map((admin) => (
              <div key={admin.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <Shield className="w-5 h-5 text-gray-600" />
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="text-sm font-medium text-gray-900">
                          {admin.displayName || admin.email}
                        </h4>
                        <span className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                          {admin.role}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Mail className="w-4 h-4" />
                          <span className="font-light">{admin.email}</span>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span className="font-light">
                            Dodany {admin.createdAt.toLocaleDateString('pl-PL')}
                          </span>
                        </div>
                        
                        {admin.createdBy && (
                          <span className="font-light">
                            przez {admin.createdBy}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleDeleteAdmin(admin)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      title="Usuń administratora"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Stats */}
        {admins.length > 0 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="text-sm text-gray-700 font-light">
              Łącznie <span className="font-medium">{admins.length}</span> administrator{admins.length === 1 ? '' : admins.length < 5 ? 'ów' : 'ów'}
            </div>
          </div>
        )}
      </div>

      {/* Important Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="text-blue-900 font-medium mb-2">Jak to działa:</h4>
            <div className="text-blue-800 text-sm font-light space-y-1">
              <p>1. Nowy administrator zostanie utworzony w Firebase Authentication</p>
              <p>2. Automatycznie zostanie dodany do bazy danych administratorów</p>
              <p>3. Będzie mógł logować się używając podanego emaila i hasła</p>
              <p>4. Po utworzeniu zostaniesz przekierowany na stronę logowania</p>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => {
          setShowDeleteDialog(false);
          setAdminToDelete(null);
        }}
        onConfirm={confirmDeleteAdmin}
        title="Usuń administratora"
        message={`Czy na pewno chcesz usunąć administratora "${adminToDelete?.email}"? Nie będzie mógł już logować się do panelu.`}
        confirmText="Usuń administratora"
        cancelText="Anuluj"
        type="danger"
        isLoading={isDeleting}
      />
    </div>
  );
}