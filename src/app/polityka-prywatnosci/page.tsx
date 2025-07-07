// src/app/polityka-prywatnosci/page.tsx
'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, Shield, Mail, Phone, Calendar, BarChart3 } from 'lucide-react';

export default function PolitykaPrywatnosciPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-12 font-light">
          <Link href="/" className="hover:text-gray-900 transition-colors">Strona główna</Link>
          <span>/</span>
          <span className="text-gray-900">Polityka prywatności</span>
        </nav>

        {/* Back button */}
        <Link 
          href="/"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-16 font-light"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Powrót do strony głównej</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-gray-600" />
          </div>
          <h1 className="text-4xl font-light text-gray-900 mb-6 tracking-tight">
            Polityka Prywatności
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            Dbamy o Twoją prywatność i bezpieczeństwo danych osobowych. 
            Dowiedz się, jak przetwarzamy Twoje informacje.
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-gray max-w-none">
          <div className="bg-gray-50 p-8 mb-12 border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <Calendar className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                Ostatnia aktualizacja: {new Date().toLocaleDateString('pl-PL')}
              </span>
            </div>
            <p className="text-gray-700 font-light leading-relaxed">
              Niniejsza polityka prywatności określa zasady przetwarzania i ochrony danych osobowych 
              użytkowników strony internetowej voyagersopel.pl
            </p>
          </div>

          {/* 1. Administrator danych */}
          <section className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-6 tracking-tight">
              1. Administrator danych osobowych
            </h2>
            <div className="bg-white border border-gray-200 p-6">
              <p className="text-gray-700 font-light mb-4">
                Administratorem Twoich danych osobowych jest:
              </p>
              <div className="bg-gray-50 p-6 border-l-4 border-gray-900">
                <p className="font-medium text-gray-900 mb-2">VOYAGER Robert Sopel</p>
                <p className="text-gray-700 font-light mb-1">Aleje Stefana Batorego 60/1</p>
                <p className="text-gray-700 font-light mb-4">33-300 Nowy Sącz</p>
                
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-gray-600" />
                    <a href="mailto:voyager.sopel@gmail.com" className="text-gray-700 hover:text-gray-900 font-light">
                      voyager.sopel@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-gray-600" />
                    <a href="tel:+48505461050" className="text-gray-700 hover:text-gray-900 font-light">
                      +48 505 461 050
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 2. Jakie dane zbieramy */}
          <section className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-6 tracking-tight">
              2. Jakie dane osobowe zbieramy
            </h2>
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Formularz kontaktowy</h3>
                <p className="text-gray-700 font-light mb-4">
                  Gdy wypełniasz formularz kontaktowy na naszej stronie, zbieramy następujące dane:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 font-light">
                  <li>Imię i nazwisko</li>
                  <li>Adres e-mail</li>
                  <li>Numer telefonu (opcjonalnie)</li>
                  <li>Treść wiadomości</li>
                  <li>Informacje o produkcie, którego dotyczy zapytanie (opcjonalnie)</li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Dane techniczne</h3>
                <p className="text-gray-700 font-light mb-4">
                  Automatycznie zbieramy podstawowe dane techniczne:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 font-light">
                  <li>Adres IP</li>
                  <li>Typ przeglądarki i system operacyjny</li>
                  <li>Czas wizyty na stronie</li>
                  <li>Strony, które odwiedziłeś</li>
                </ul>
              </div>

              {/* Analytics Section - professional style */}
              <div className="bg-white border border-gray-200 p-6">
                <div className="flex items-start space-x-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Dane analityczne</h3>
                    <p className="text-gray-700 font-light mb-4">
                      W celu optymalizacji funkcjonowania strony internetowej wykorzystujemy narzędzie 
                      Vercel Analytics, które zbiera następujące dane:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 font-light mb-6">
                      <li>Liczba odwiedzin stron internetowych</li>
                      <li>Czas spędzony na poszczególnych stronach</li>
                      <li>Źródła ruchu internetowego</li>
                      <li>Podstawowe informacje o urządzeniu (typ, rozdzielczość)</li>
                      <li>Lokalizacja geograficzna na poziomie kraju lub regionu</li>
                    </ul>
                    
                    <div className="border border-gray-200 p-4">
                      <h4 className="font-medium text-gray-900 mb-3">Charakterystyka przetwarzania danych analitycznych</h4>
                      <ul className="text-sm text-gray-700 font-light space-y-2">
                        <li>• Dane są przetwarzane bez użycia plików cookies</li>
                        <li>• Wszystkie zebrane informacje są automatycznie anonimizowane</li>
                        <li>• Przetwarzanie jest zgodne z przepisami RODO/GDPR</li>
                        <li>• Dane nie są łączone z informacjami osobowymi użytkowników</li>
                        <li>• Nie ma możliwości identyfikacji konkretnych osób na podstawie zebranych danych</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 3. Cel przetwarzania */}
          <section className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-6 tracking-tight">
              3. W jakim celu przetwarzamy dane
            </h2>
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Formularz kontaktowy</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 font-light">
                  <li>Udzielenie odpowiedzi na Twoje zapytanie</li>
                  <li>Nawiązanie współpracy biznesowej</li>
                  <li>Prezentacja oferty produktów</li>
                  <li>Obsługa klienta</li>
                </ul>
                <p className="text-sm text-gray-600 font-light mt-3">
                  <strong>Podstawa prawna:</strong> zgoda osoby, której dane dotyczą (art. 6 ust. 1 lit. a RODO)
                </p>
              </div>

              <div className="bg-white border border-gray-200 p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Dane techniczne</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 font-light">
                  <li>Zapewnienie bezpieczeństwa strony</li>
                  <li>Analiza ruchu i optymalizacja witryny</li>
                  <li>Rozwiązywanie problemów technicznych</li>
                </ul>
                <p className="text-sm text-gray-600 font-light mt-3">
                  <strong>Podstawa prawna:</strong> prawnie uzasadniony interes administratora (art. 6 ust. 1 lit. f RODO)
                </p>
              </div>

              <div className="bg-white border border-gray-200 p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Dane analityczne</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 font-light">
                  <li>Analiza popularności treści i funkcjonalności strony</li>
                  <li>Optymalizacja wydajności i użyteczności witryny</li>
                  <li>Badanie zachowań użytkowników w celu poprawy usług</li>
                  <li>Generowanie statystyk odwiedzin i użytkowania</li>
                  <li>Doskonalenie jakości świadczonych usług</li>
                </ul>
                <p className="text-sm text-gray-600 font-light mt-3">
                  <strong>Podstawa prawna:</strong> prawnie uzasadniony interes administratora (art. 6 ust. 1 lit. f RODO)
                </p>
              </div>
            </div>
          </section>

          {/* 4. Udostępnianie danych */}
          <section className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-6 tracking-tight">
              4. Komu udostępniamy dane
            </h2>
            <div className="bg-white border border-gray-200 p-6">
              <p className="text-gray-700 font-light mb-4">
                Twoje dane osobowe mogą być udostępniane następującym kategoriom odbiorców:
              </p>
              <ul className="space-y-3 text-gray-700 font-light">
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span><strong>Vercel Inc.</strong> - dostawca usług hostingu i narzędzi analitycznych</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span><strong>Dostawcy usług IT:</strong> hostingu, utrzymania strony internetowej</span>
                </li>
              </ul>
              <p className="text-sm text-gray-600 font-light mt-4 bg-gray-50 p-4">
                <strong>Oświadczenie:</strong> Nie sprzedajemy, nie wynajmujemy ani nie udostępniamy 
                danych osobowych podmiotom trzecim w celach marketingowych.
              </p>
            </div>
          </section>

          {/* 5. Cookies */}
          <section className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-6 tracking-tight">
              5. Pliki cookies i technologie śledzące
            </h2>
            <div className="bg-white border border-gray-200 p-6">
              <div className="space-y-4">
                <div className="border border-gray-200 p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Informacja o braku cookies analitycznych</h4>
                  <p className="text-gray-700 font-light text-sm">
                    Nasza strona internetowa nie wykorzystuje plików cookies do celów analitycznych. 
                    System Vercel Analytics funkcjonuje w oparciu o technologie zachowujące prywatność użytkowników, 
                    bez konieczności przechowywania jakichkolwiek danych w przeglądarce internetowej.
                  </p>
                </div>
                
                <p className="text-gray-700 font-light">
                  Strona może wykorzystywać wyłącznie następujące rodzaje plików cookies:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 font-light">
                  <li><strong>Cookies techniczne</strong> - niezbędne do prawidłowego funkcjonowania strony</li>
                  <li><strong>Cookies sesyjne</strong> - zapewniające bezpieczeństwo podczas przeglądania</li>
                  <li><strong>Cookies preferencji</strong> - zapamiętujące ustawienia użytkownika</li>
                </ul>
                
                <p className="text-gray-700 font-light">
                  Wymienione pliki cookies nie wymagają zgody użytkownika, ponieważ są niezbędne 
                  do prawidłowego świadczenia usług drogą elektroniczną.
                </p>
              </div>
            </div>
          </section>

          {/* 6. Czas przechowywania */}
          <section className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-6 tracking-tight">
              6. Okres przechowywania danych
            </h2>
            <div className="bg-white border border-gray-200 p-6">
              <ul className="space-y-4 text-gray-700 font-light">
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span><strong>Dane z formularza kontaktowego:</strong> maksymalnie 3 lata od ostatniego kontaktu lub do momentu wycofania zgody</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span><strong>Dane techniczne:</strong> maksymalnie 2 lata od ostatniej wizyty na stronie</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span><strong>Dane analityczne:</strong> zgodnie z polityką Vercel Inc., maksymalnie 2 lata w formie zanonimizowanej</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span><strong>Logi systemowe:</strong> maksymalnie 12 miesięcy od wygenerowania</span>
                </li>
              </ul>
            </div>
          </section>

          {/* 7. Twoje prawa */}
          <section className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-6 tracking-tight">
              7. Prawa osób, których dane dotyczą
            </h2>
            <div className="bg-white border border-gray-200 p-6">
              <p className="text-gray-700 font-light mb-6">
                Zgodnie z przepisami RODO przysługują Ci następujące uprawnienia:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Prawo dostępu do danych</h4>
                    <p className="text-sm text-gray-600 font-light">Możliwość uzyskania informacji o przetwarzanych danych osobowych</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Prawo do sprostowania</h4>
                    <p className="text-sm text-gray-600 font-light">Możliwość żądania poprawienia nieprawidłowych lub niepełnych danych</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Prawo do usunięcia</h4>
                    <p className="text-sm text-gray-600 font-light">Możliwość żądania usunięcia danych osobowych w określonych przypadkach</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Prawo do ograniczenia przetwarzania</h4>
                    <p className="text-sm text-gray-600 font-light">Możliwość żądania ograniczenia zakresu przetwarzania danych</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Prawo do przenoszenia danych</h4>
                    <p className="text-sm text-gray-600 font-light">Możliwość otrzymania danych w formacie strukturalnym</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Prawo sprzeciwu</h4>
                    <p className="text-sm text-gray-600 font-light">Możliwość wniesienia sprzeciwu wobec przetwarzania danych</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 8. Bezpieczeństwo */}
          <section className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-6 tracking-tight">
              8. Bezpieczeństwo danych
            </h2>
            <div className="bg-white border border-gray-200 p-6">
              <p className="text-gray-700 font-light mb-4">
                Stosujemy odpowiednie środki techniczne i organizacyjne w celu zapewnienia bezpieczeństwa danych osobowych:
              </p>
              <ul className="space-y-2 text-gray-700 font-light">
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Szyfrowanie transmisji danych protokołem SSL/TLS</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Regularne wykonywanie kopii zapasowych danych</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Ograniczenie dostępu do danych osobowych wyłącznie do upoważnionych osób</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Ciągły monitoring bezpieczeństwa systemów informatycznych</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Wykorzystanie technologii analitycznych zachowujących prywatność użytkowników</span>
                </li>
              </ul>
            </div>
          </section>

          {/* 9. Kontakt */}
          <section className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-6 tracking-tight">
              9. Kontakt w sprawach ochrony danych
            </h2>
            <div className="bg-white border border-gray-200 p-6">
              <p className="text-gray-700 font-light mb-4">
                W sprawach dotyczących przetwarzania danych osobowych można skontaktować się z administratorem:
              </p>
              <div className="bg-gray-50 p-6 border-l-4 border-gray-900">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-600" />
                    <a href="mailto:voyager.sopel@gmail.com" className="text-gray-700 hover:text-gray-900 font-light">
                      voyager.sopel@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-gray-600" />
                    <a href="tel:+48505461050" className="text-gray-700 hover:text-gray-900 font-light">
                      +48 505 461 050
                    </a>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 font-light mt-4">
                Osobie, której dane dotyczą, przysługuje również prawo wniesienia skargi do Prezesa 
                Urzędu Ochrony Danych Osobowych, w przypadku uznania, że przetwarzanie danych osobowych 
                narusza przepisy rozporządzenia RODO.
              </p>
            </div>
          </section>

          {/* 10. Zmiany polityki */}
          <section className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-6 tracking-tight">
              10. Zmiany polityki prywatności
            </h2>
            <div className="bg-white border border-gray-200 p-6">
              <p className="text-gray-700 font-light">
                Administrator zastrzega sobie prawo do wprowadzania zmian w niniejszej polityce prywatności. 
                Informacja o istotnych zmianach zostanie umieszczona na stronie internetowej. 
                Zaleca się regularne zapoznawanie się z treścią polityki prywatności w celu śledzenia ewentualnych aktualizacji.
              </p>
            </div>
          </section>
        </div>

        {/* CTA */}
        <div className="mt-16 bg-gray-900 text-white p-8 text-center">
          <h3 className="text-2xl font-light mb-4 tracking-tight">Pytania dotyczące polityki prywatności</h3>
          <p className="text-gray-300 mb-8 font-light leading-relaxed">
            W przypadku pytań lub wątpliwości dotyczących niniejszej polityki prywatności 
            prosimy o kontakt z administratorem danych.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/kontakt"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-gray-900 font-light hover:bg-gray-100 transition-colors uppercase tracking-wider"
            >
              Formularz kontaktowy
            </Link>
            <a
              href="mailto:voyager.sopel@gmail.com"
              className="inline-flex items-center justify-center px-8 py-3 border border-white text-white font-light hover:bg-white hover:text-gray-900 transition-colors uppercase tracking-wider"
            >
              <Mail className="w-4 h-4 mr-3" />
              Wyślij email
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}