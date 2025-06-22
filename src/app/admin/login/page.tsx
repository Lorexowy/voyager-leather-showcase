'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { onAuthStateChanged } from 'firebase/auth';
import { Eye, EyeOff, Lock, Mail, AlertCircle, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { auth } from '@/lib/firebase';
import { signInAdmin, isUserAdmin } from '@/lib/auth';

interface LoginForm {
  email: string;
  password: string;
}

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<LoginForm>({
    mode: 'onChange'
  });

  // Sprawdź czy admin już jest zalogowany
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Sprawdź czy to admin
        const adminStatus = await isUserAdmin(currentUser);
        if (adminStatus) {
          // Admin już zalogowany - przekieruj na dashboard
          toast.success('Jesteś już zalogowany!');
          router.push('/admin/dashboard');
          return;
        }
      }
      // Nie jest zalogowany lub nie jest adminem - pokaż formularz
      setIsCheckingAuth(false);
    });

    return () => unsubscribe();
  }, [router]);

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);

    try {
      const user = await signInAdmin(data.email, data.password);
      
      toast.success(`Witaj ${user.displayName || 'Administratorze'}!`);
      router.push('/admin/dashboard');
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || 'Nieprawidłowy email lub hasło');
    } finally {
      setIsLoading(false);
    }
  };

  // Pokazuj loader podczas sprawdzania autoryzacji
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          <div className="animate-spin w-8 h-8 border-2 border-gray-900 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 font-light">Sprawdzanie statusu logowania...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-gray-900 rounded-sm flex items-center justify-center">
              <span className="text-white font-light text-xl tracking-wider">V</span>
            </div>
            <span className="text-2xl font-light text-gray-900 tracking-wide">Voyager</span>
          </Link>
          
          <h1 className="text-3xl font-light text-gray-900 mb-4 tracking-tight">
            Panel Administratora
          </h1>
          <p className="text-gray-600 font-light">
            Zaloguj się, aby zarządzać produktami
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-gray-50 p-8 border border-gray-200">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email field */}
            <div>
              <label htmlFor="email" className="block text-sm font-light text-gray-900 mb-3 uppercase tracking-wider">
                Adres email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
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
                  className={`w-full pl-10 pr-4 py-3 border focus:outline-none bg-white font-light transition-colors ${
                    errors.email ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-gray-900'
                  }`}
                  placeholder="admin@voyager.pl"
                  disabled={isLoading}
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600 flex items-center font-light">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password field */}
            <div>
              <label htmlFor="password" className="block text-sm font-light text-gray-900 mb-3 uppercase tracking-wider">
                Hasło
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  {...register('password', {
                    required: 'Hasło jest wymagane',
                    minLength: {
                      value: 6,
                      message: 'Hasło musi mieć co najmniej 6 znaków'
                    }
                  })}
                  className={`w-full pl-10 pr-12 py-3 border focus:outline-none bg-white font-light transition-colors ${
                    errors.password ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-gray-900'
                  }`}
                  placeholder="Wprowadź hasło"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600 flex items-center font-light">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={!isValid || isLoading}
              className={`w-full flex items-center justify-center px-4 py-3 font-light transition-all duration-300 uppercase tracking-wider ${
                isValid && !isLoading
                  ? 'bg-gray-900 text-white hover:bg-gray-800'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-3 animate-spin" />
                  Logowanie...
                </>
              ) : (
                'Zaloguj się'
              )}
            </button>
          </form>

          {/* Password Reset Info */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 font-light">
              Problemy z logowaniem? Skontaktuj się z administratorem systemu.
            </p>
          </div>
        </div>

        {/* Back to site */}
        <div className="text-center mt-8">
          <Link 
            href="/"
            className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-light"
          >
            ← Powrót do strony głównej
          </Link>
        </div>
      </div>
    </div>
  );
}