'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { ContactForm as ContactFormType } from '@/types';
import { submitContactForm } from '@/lib/contact';
import { getActiveProducts } from '@/lib/products';
import { Product } from '@/types';

interface ContactFormProps {
  selectedProductId?: string;
}

export default function ContactForm({ selectedProductId }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

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

  // Załaduj prawdziwe produkty z Firebase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const activeProducts = await getActiveProducts();
        setProducts(activeProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Nie udało się załadować listy produktów');
      } finally {
        setIsLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  const onSubmit = async (data: ContactFormType) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Znajdź nazwę produktu jeśli wybrano produkt
      const selectedProductName = data.productId 
        ? products.find(p => p.id === data.productId)?.name 
        : undefined;

      const formDataWithProduct = {
        ...data,
        productName: selectedProductName
      };

      // 1. Zapisz do Firebase
      await submitContactForm(formDataWithProduct);
      
      // 2. Wyślij przez EmailJS (jeśli skonfigurowane)
      // await sendEmailNotification(formDataWithProduct);
      
      setSubmitStatus('success');
      toast.success('Wiadomość została wysłana pomyślnie!');
      reset();
    } catch (error: any) {
      console.error('Contact form error:', error);
      setSubmitStatus('error');
      toast.error(error.message || 'Wystąpił błąd podczas wysyłania wiadomości.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Product selection */}
      <div>
        <label htmlFor="productId" className="block text-sm font-light text-gray-900 mb-3 uppercase tracking-wider">
          Produkt (opcjonalnie)
        </label>
        <select
          id="productId"
          {...register('productId')}
          className="w-full px-4 py-4 border border-gray-200 focus:border-gray-900 focus:outline-none bg-white text-gray-900 font-light transition-colors"
          disabled={isLoadingProducts}
        >
          <option value="">
            {isLoadingProducts ? 'Ładowanie produktów...' : 'Wybierz produkt (opcjonalnie)'}
          </option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name} - {product.category === 'as-aleksandra-sopel' ? 'AS Premium' : product.category}
            </option>
          ))}
        </select>
        {selectedProduct && !isLoadingProducts && (
          <p className="mt-3 text-sm text-gray-600 font-light">
            Wybrany produkt: <span className="font-medium text-gray-900">
              {products.find(p => p.id === selectedProduct)?.name}
            </span>
          </p>
        )}
      </div>

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-light text-gray-900 mb-3 uppercase tracking-wider">
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
          className={`w-full px-4 py-4 border focus:outline-none bg-white font-light transition-colors ${
            errors.name ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-gray-900'
          }`}
          placeholder="Wprowadź swoje imię i nazwisko"
        />
        {errors.name && (
          <p className="mt-2 text-sm text-red-600 flex items-center font-light">
            <AlertCircle className="w-4 h-4 mr-2" />
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-light text-gray-900 mb-3 uppercase tracking-wider">
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
          className={`w-full px-4 py-4 border focus:outline-none bg-white font-light transition-colors ${
            errors.email ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-gray-900'
          }`}
          placeholder="przykład@email.com"
        />
        {errors.email && (
          <p className="mt-2 text-sm text-red-600 flex items-center font-light">
            <AlertCircle className="w-4 h-4 mr-2" />
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-light text-gray-900 mb-3 uppercase tracking-wider">
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
          className={`w-full px-4 py-4 border focus:outline-none bg-white font-light transition-colors ${
            errors.phone ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-gray-900'
          }`}
          placeholder="+48 123 456 789"
        />
        {errors.phone && (
          <p className="mt-2 text-sm text-red-600 flex items-center font-light">
            <AlertCircle className="w-4 h-4 mr-2" />
            {errors.phone.message}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-light text-gray-900 mb-3 uppercase tracking-wider">
          Wiadomość <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          rows={6}
          {...register('message', { 
            required: 'Wiadomość jest wymagana',
            minLength: {
              value: 10,
              message: 'Wiadomość musi mieć co najmniej 10 znaków'
            }
          })}
          className={`w-full px-4 py-4 border focus:outline-none bg-white resize-none font-light transition-colors ${
            errors.message ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-gray-900'
          }`}
          placeholder="Opisz swoje zapytanie, wymagania lub inne informacje..."
        />
        {errors.message && (
          <p className="mt-2 text-sm text-red-600 flex items-center font-light">
            <AlertCircle className="w-4 h-4 mr-2" />
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Privacy policy */}
      <div className="bg-gray-50 p-6 text-sm text-gray-600 font-light border border-gray-200">
        <p>
          Wysyłając formularz, wyrażasz zgodę na przetwarzanie Twoich danych osobowych 
          w celu udzielenia odpowiedzi na zapytanie. Więcej informacji w{' '}
          <a href="/polityka-prywatnosci" className="text-gray-900 hover:underline font-medium">
            polityce prywatności
          </a>.
        </p>
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={!isValid || isSubmitting}
        className={`w-full inline-flex items-center justify-center px-8 py-4 font-light transition-all duration-300 uppercase tracking-wider ${
          isValid && !isSubmitting
            ? 'bg-gray-900 text-white hover:bg-gray-800'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 mr-3 animate-spin" />
            Wysyłanie...
          </>
        ) : submitStatus === 'success' ? (
          <>
            <CheckCircle className="w-4 h-4 mr-3" />
            Wysłano pomyślnie!
          </>
        ) : (
          <>
            <Send className="w-4 h-4 mr-3" />
            Wyślij wiadomość
          </>
        )}
      </button>

      {/* Status messages */}
      {submitStatus === 'success' && (
        <div className="bg-green-50 border border-green-200 p-6 flex items-start space-x-4">
          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-green-900 font-medium mb-2">Wiadomość wysłana pomyślnie!</h4>
            <p className="text-green-800 text-sm font-light">
              Dziękujemy za kontakt. Odpowiemy na Twoje zapytanie w ciągu 24 godzin.
              Wiadomość została zapisana w naszym systemie.
            </p>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="bg-red-50 border border-red-200 p-6 flex items-start space-x-4">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-red-900 font-medium mb-2">Wystąpił błąd</h4>
            <p className="text-red-800 text-sm font-light">
              Nie udało się wysłać wiadomości. Spróbuj ponownie lub skontaktuj się z nami bezpośrednio.
            </p>
          </div>
        </div>
      )}
    </form>
  );
}