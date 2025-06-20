'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Lock, Mail, AlertCircle, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface LoginForm {
  email: string;
  password: string;
}

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<LoginForm>({
    mode: 'onChange'
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);

    try {
      // Tutaj będzie logika logowania z Firebase Auth
      console.log('Login attempt:', data);
      
      // Symulacja logowania
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Sprawdź dane logowania (w prawdziwej aplikacji to będzie przez Firebase)
      if (data.email === 'admin@voyager.pl' && data.password === 'admin123') {
        toast.success('Zalogowano pomyślnie!');
        router.push('/admin/dashboard');
      } else {
        throw new Error('Nieprawidłowe dane logowania');
      }
    } catch (error) {
      toast.error('Nieprawidłowy email lub hasło');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-primary-25 to-brown-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-brown-600 to-brown-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">V</span>
            </div>
            <span className="text-2xl font-serif font-bold text-brown-800">Voyager</span>
          </Link>
          
          <h1 className="text-3xl font-serif font-bold text-brown-900 mb-2">
            Panel Administratora
          </h1>
          <p className="text-brown-600">
            Zaloguj się, aby zarządzać produktami
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-brown-100">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-brown-800 mb-2">
                Adres email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-brown-400" />
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
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-transparent bg-white ${
                    errors.email ? 'border-red-300' : 'border-brown-200'
                  }`}
                  placeholder="admin@voyager.pl"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-brown-800 mb-2">
                Hasło
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-brown-400" />
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
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-transparent bg-white ${
                    errors.password ? 'border-red-300' : 'border-brown-200'
                  }`}
                  placeholder="Wprowadź hasło"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-brown-400 hover:text-brown-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={!isValid || isLoading}
              className={`w-full flex items-center justify-center px-4 py-3 font-medium rounded-lg transition-all duration-300 ${
                isValid && !isLoading
                  ? 'bg-brown-700 text-white hover:bg-brown-800 shadow-lg hover:shadow-xl'
                  : 'bg-brown-300 text-brown-500 cursor-not-allowed'
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Logowanie...
                </>
              ) : (
                'Zaloguj się'
              )}
            </button>
          </form>

          {/* Demo credentials info */}
          <div className="mt-8 p-4 bg-brown-50 rounded-lg border border-brown-200">
            <h3 className="text-sm font-medium text-brown-800 mb-2">Dane testowe:</h3>
            <div className="text-sm text-brown-600 space-y-1">
              <div><strong>Email:</strong> admin@voyager.pl</div>
              <div><strong>Hasło:</strong> admin123</div>
            </div>
          </div>
        </div>

        {/* Back to site */}
        <div className="text-center mt-8">
          <Link 
            href="/"
            className="text-brown-600 hover:text-brown-800 transition-colors text-sm"
          >
            ← Powrót do strony głównej
          </Link>
        </div>
      </div>
    </div>
  );
}