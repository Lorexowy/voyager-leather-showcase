'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { ContactForm as ContactFormType } from '@/types';

interface ContactFormProps {
  selectedProductId?: string;
}

// Mock products for dropdown - później zastąpimy danymi z Firebase
const mockProducts = [
  { id: '1', name: 'Elegancka Torebka Damska' },
  { id: '2', name: 'Biznesowy Plecak Skórzany' },
  { id: '3', name: 'Klasyczny Pasek Męski' },
  { id: '4', name: 'AS | Premium Portfel' },
  { id: '5', name: 'Personalizowany Organizer' },
];

export default function ContactForm({ selectedProductId }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid }
  } = useForm<ContactFormType>({
    defaultValues: {
      productId: selectedProductId || '',
    },
    mode: 'onChange'
  });

  const selectedProduct = watch('productId');

  const onSubmit = async (data: ContactFormType) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Tutaj będzie integracja z EmailJS
      console.log('Form data:', data);
      
      // Symulacja wysyłania
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Symulacja sukcesu (90% szans na sukces)
      if (Math.random() > 0.1) {
        setSubmitStatus('success');
        toast.success('Wiadomość została wysłana pomyślnie!', {
          duration: 5000,
        });
        reset();
      } else {
        throw new Error('Symulowany błąd');
      }
    } catch (error) {
      setSubmitStatus('error');
      toast.error('Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie.', {
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Product selection */}
      <div>
        <label htmlFor="productId" className="block text-sm font-medium text-brown-800 mb-2">
          Produkt (opcjonalnie)
        </label>
        <select
          id="productId"
          {...register('productId')}
          className="w-full px-4 py-3 border border-brown-200 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-transparent bg-white text-brown-800"
        >
          <option value="">Wybierz produkt (opcjonalnie)</option>
          {mockProducts.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
        {selectedProduct && (
          <p className="mt-2 text-sm text-brown-600">
            Wybrany produkt: <span className="font-medium">
              {mockProducts.find(p => p.id === selectedProduct)?.name}
            </span>
          </p>
        )}
      </div>

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-brown-800 mb-2">
          Imię i nazwisko <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          {...register('name', { 
            required: 'Imię i nazwisko jest wymagane',
            minLength: {
              value: 2,
              message: 'Imię i nazwisko musi mieć co najmniej 2 znaki'
            }
          })}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-transparent bg-white ${
            errors.name ? 'border-red-300' : 'border-brown-200'
          }`}
          placeholder="Wprowadź swoje imię i nazwisko"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-brown-800 mb-2">
          Adres email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          {...register('email', { 
            required: 'Adres email jest wymagany',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Nieprawidłowy format adresu email'
            }
          })}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-transparent bg-white ${
            errors.email ? 'border-red-300' : 'border-brown-200'
          }`}
          placeholder="przykład@email.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-brown-800 mb-2">
          Numer telefonu (opcjonalnie)
        </label>
        <input
          type="tel"
          id="phone"
          {...register('phone', {
            pattern: {
              value: /^[+]?[0-9\s\-()]{9,}$/,
              message: 'Nieprawidłowy format numeru telefonu'
            }
          })}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-transparent bg-white ${
            errors.phone ? 'border-red-300' : 'border-brown-200'
          }`}
          placeholder="+48 123 456 789"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.phone.message}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-brown-800 mb-2">
          Wiadomość <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          {...register('message', { 
            required: 'Wiadomość jest wymagana',
            minLength: {
              value: 10,
              message: 'Wiadomość musi mieć co najmniej 10 znaków'
            }
          })}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-transparent bg-white resize-none ${
            errors.message ? 'border-red-300' : 'border-brown-200'
          }`}
          placeholder="Opisz swoje zapytanie, wymagania lub inne informacje..."
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Privacy policy */}
      <div className="bg-brown-50 rounded-lg p-4 text-sm text-brown-700">
        <p>
          Wysyłając formularz, wyrażasz zgodę na przetwarzanie Twoich danych osobowych 
          w celu udzielenia odpowiedzi na zapytanie. Więcej informacji w{' '}
          <a href="/polityka-prywatnosci" className="text-brown-800 hover:underline font-medium">
            polityce prywatności
          </a>.
        </p>
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={!isValid || isSubmitting}
        className={`w-full inline-flex items-center justify-center px-8 py-4 font-medium rounded-lg transition-all duration-300 ${
          isValid && !isSubmitting
            ? 'bg-brown-700 text-white hover:bg-brown-800 shadow-lg hover:shadow-xl'
            : 'bg-brown-300 text-brown-500 cursor-not-allowed'
        }`}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Wysyłanie...
          </>
        ) : submitStatus === 'success' ? (
          <>
            <CheckCircle className="w-5 h-5 mr-2" />
            Wysłano pomyślnie!
          </>
        ) : (
          <>
            <Send className="w-5 h-5 mr-2" />
            Wyślij wiadomość
          </>
        )}
      </button>

      {/* Status messages */}
      {submitStatus === 'success' && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start space-x-3">
          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-green-800 font-medium">Wiadomość wysłana pomyślnie!</h4>
            <p className="text-green-700 text-sm mt-1">
              Dziękujemy za kontakt. Odpowiemy na Twoje zapytanie w ciągu 24 godzin.
            </p>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-red-800 font-medium">Wystąpił błąd</h4>
            <p className="text-red-700 text-sm mt-1">
              Nie udało się wysłać wiadomości. Spróbuj ponownie lub skontaktuj się z nami bezpośrednio.
            </p>
          </div>
        </div>
      )}
    </form>
  );
}