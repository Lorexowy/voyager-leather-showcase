'use client';

import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { ContactForm as ContactFormType } from '@/types';
import { submitContactForm } from '@/lib/contact';
import { sendContactNotification } from '@/lib/contact-notification';
import { getActiveProducts } from '@/lib/products';
import { Product } from '@/types';

interface ContactFormProps {
  selectedProductId?: string;
}

interface ExtendedContactForm extends ContactFormType {
  privacyConsent: boolean;
  website: string;
}

export default function ContactForm({ selectedProductId }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const submittingRef = useRef(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isValid }
  } = useForm<ExtendedContactForm>({
    defaultValues: {
      productId: selectedProductId || '',
      privacyConsent: false,
      website: '',
    },
    mode: 'onChange'
  });

  const selectedProduct = watch('productId');

  useEffect(() => {
    setValue('productId', selectedProductId || '');
  }, [selectedProductId, setValue]);

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

  const onSubmit = async (data: ExtendedContactForm) => {
    if (submittingRef.current) return;
    // Honeypot: real visitors never interact with this field.
    if (data.website) {
      setSubmitStatus('success');
      reset();
      return;
    }
    submittingRef.current = true;
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Znajdź nazwę produktu jeśli wybrano produkt
      const selectedProductName = data.productId 
        ? products.find(p => p.id === data.productId)?.name 
        : undefined;

      const submissionData = {
        name: data.name.trim(),
        email: data.email.trim(),
        phone: data.phone?.trim() || '',
        message: data.message.trim(),
        productId: data.productId || selectedProduct || '',
        productName: selectedProductName || '',
        consentGiven: data.privacyConsent,
        consentTimestamp: new Date().toISOString(),
      };

      const messageId = await submitContactForm(submissionData);
      setSubmitStatus('success');
      toast.success('Otrzymaliśmy Twoje zapytanie!');
      reset();

      // Failure here does not undo or repeat the successful database write.
      await sendContactNotification({ ...submissionData, messageId, website: '' });
    } catch (error: any) {
      console.error('Contact form error:', error);
      setSubmitStatus('error');
      toast.error(error.message || 'Wystąpił błąd podczas wysyłania wiadomości.');
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="absolute -left-[10000px]" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
      </div>
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
          {selectedProduct && !products.some(product => product.id === selectedProduct) && (
            <option value={selectedProduct}>Produkt wskazany w zapytaniu</option>
          )}
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name} - {product.category === 'as-aleksandra-sopel' ? 'AS Premium' : product.category}
            </option>
          ))}
        </select>
        {selectedProduct && !isLoadingProducts && (
          <p className="mt-3 text-sm text-gray-600 font-light">
            Wybrany produkt: <span className="font-medium text-gray-900">
              {products.find(p => p.id === selectedProduct)?.name || 'Produkt wskazany w zapytaniu'}
            </span>
          </p>
        )}
        {selectedProduct && !isLoadingProducts && !products.some(product => product.id === selectedProduct) && (
          <p className="mt-2 text-sm text-gray-600">
            Nie udało się pobrać szczegółów tego produktu. Możesz wysłać zapytanie — zachowamy jego identyfikator.
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
          maxLength={200}
          {...register('name', { 
            required: 'Imię i nazwisko jest wymagane',
            minLength: {
              value: 2,
              message: 'Imię i nazwisko musi mieć co najmniej 2 znaki'
            },
            validate: value => value.trim().length >= 2 || 'Wpisz imię i nazwisko',
            maxLength: 200,
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
          maxLength={254}
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
          maxLength={50}
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
          maxLength={5000}
          {...register('message', { 
            required: 'Wiadomość jest wymagana',
            minLength: {
              value: 10,
              message: 'Wiadomość musi mieć co najmniej 10 znaków'
            },
            validate: value => value.trim().length >= 10 || 'Wiadomość musi mieć co najmniej 10 znaków',
            maxLength: 5000,
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

      {/* Privacy consent checkbox */}
      <div>
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="privacyConsent"
            {...register('privacyConsent', {
              required: 'Musisz wyrazić zgodę na przetwarzanie danych osobowych'
            })}
            className={`w-4 h-4 mt-1 text-gray-900 border-gray-300 rounded focus:ring-gray-900 ${
              errors.privacyConsent ? 'border-red-300' : ''
            }`}
          />
          <label htmlFor="privacyConsent" className="text-sm text-gray-700 font-light leading-relaxed">
            <span className="text-red-500">*</span> Wyrażam zgodę na przetwarzanie moich danych osobowych 
            przez VOYAGER Robert Sopel w celu udzielenia odpowiedzi na moje zapytanie. 
            Zapoznałem/am się z{' '}
            <a 
              href="/polityka-prywatnosci" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-900 hover:underline font-medium"
            >
              polityką prywatności
            </a>
            {' '}i akceptuję jej postanowienia.
          </label>
        </div>
        {errors.privacyConsent && (
          <p className="mt-2 text-sm text-red-600 flex items-center font-light">
            <AlertCircle className="w-4 h-4 mr-2" />
            {errors.privacyConsent.message}
          </p>
        )}
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
        {isSubmitting && submitStatus !== 'success' ? (
          <>
            <Loader2 className="w-4 h-4 mr-3 animate-spin" />
            Wysyłanie...
          </>
        ) : submitStatus === 'success' ? (
          <>
            <CheckCircle className="w-4 h-4 mr-3" />
            Zapytanie przyjęte!
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
        <div role="status" className="bg-green-50 border border-green-200 p-6 flex items-start space-x-4">
          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-green-900 font-medium mb-2">Otrzymaliśmy Twoje zapytanie!</h4>
            <p className="text-green-800 text-sm font-light">
              Dziękujemy za kontakt. Odpowiemy na Twoje zapytanie do 48 godzin.
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
