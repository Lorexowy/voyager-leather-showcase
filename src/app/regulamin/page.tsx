'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, FileText, AlertTriangle, Calendar, Mail, Phone } from 'lucide-react';

export default function RegulaminPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-12 font-light">
          <Link href="/" className="hover:text-gray-900 transition-colors">Strona główna</Link>
          <span>/</span>
          <span className="text-gray-900">Regulamin</span>
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
            <FileText className="w-8 h-8 text-gray-600" />
          </div>
          <h1 className="text-4xl font-light text-gray-900 mb-6 tracking-tight">
            Regulamin Serwisu
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            Regulamin korzystania ze strony internetowej voyagersopel.pl 
            i zasady prezentacji produktów.
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-gray max-w-none">
          <div className="bg-gray-50 p-8 mb-12 border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <Calendar className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                Data obowiązywania: {new Date().toLocaleDateString('pl-PL')}
              </span>
            </div>
            <p className="text-gray-700 font-light leading-relaxed">
              Niniejszy regulamin określa zasady korzystania ze strony internetowej voyagersopel.pl 
              oraz warunki współpracy z firmą "VOYAGER" Robert Sopel.
            </p>
          </div>

          {/* 1. Postanowienia ogólne */}
          <section className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-6 tracking-tight">
              1. Postanowienia ogólne
            </h2>
            <div className="bg-white border border-gray-200 p-6">
              <div className="space-y-4 text-gray-700 font-light">
                <p>
                  <strong>1.1.</strong> Niniejszy Regulamin określa zasady korzystania ze strony internetowej 
                  dostępnej pod adresem www.voyagersopel.pl (dalej: „Serwis").
                </p>
                <p>
                  <strong>1.2.</strong> Właścicielem i administratorem Serwisu jest "VOYAGER" Robert Sopel 
                  z siedzibą przy Aleje Stefana Batorego 60/1, 33-300 Nowy Sącz (dalej: „Administrator").
                </p>
                <p>
                  <strong>1.3.</strong> Serwis służy prezentacji produktów galanteryjnych ze skóry naturalnej 
                  oraz nawiązywaniu kontaktów biznesowych z potencjalnymi kontrahentami.
                </p>
                <p>
                  <strong>1.4.</strong> Korzystanie z Serwisu oznacza akceptację postanowień niniejszego Regulaminu.
                </p>
              </div>
            </div>
          </section>

          {/* 2. Definicje */}
          <section className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-6 tracking-tight">
              2. Definicje
            </h2>
            <div className="bg-white border border-gray-200 p-6">
              <dl className="space-y-4 text-gray-700 font-light">
                <div>
                  <dt className="font-medium text-gray-900 mb-2">Serwis</dt>
                  <dd>Strona internetowa www.voyagersopel.pl wraz z wszystkimi podstronami i funkcjonalnościami</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-900 mb-2">Użytkownik</dt>
                  <dd>Każda osoba fizyczna lub prawna korzystająca z Serwisu</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-900 mb-2">Treści</dt>
                  <dd>Wszelkie informacje, teksty, zdjęcia, grafiki i inne materiały dostępne w Serwisie</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-900 mb-2">Kontrahent</dt>
                  <dd>Podmiot prowadzący działalność gospodarczą, zainteresowany współpracą biznesową</dd>
                </div>
              </dl>
            </div>
          </section>

          {/* 3. Cel i charakter serwisu */}
          <section className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-6 tracking-tight">
              3. Cel i charakter Serwisu
            </h2>
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Prezentacja produktów</h3>
                <ul className="space-y-2 text-gray-700 font-light">
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Serwis służy prezentacji oferty produktów galanteryjnych ze skóry naturalnej</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Produkty prezentowane są wyłącznie w celach informacyjnych</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Serwis nie stanowi sklepu internetowego ani platformy e-commerce</span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 border border-blue-200 p-6">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-blue-900 mb-2">Ważne</h4>
                    <p className="text-blue-800 text-sm font-light">
                      Serwis nie umożliwia bezpośredniego składania zamówień ani dokonywania płatności online. 
                      Wszystkie transakcje wymagają bezpośredniego kontaktu z Administratorem.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 4. Zasady korzystania */}
          <section className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-6 tracking-tight">
              4. Zasady korzystania z Serwisu
            </h2>
            <div className="bg-white border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Użytkownik zobowiązuje się do:</h3>
              <ul className="space-y-3 text-gray-700 font-light mb-6">
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Korzystania z Serwisu zgodnie z prawem i dobrymi obyczajami</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Niepodejmowania działań mogących zakłócić funkcjonowanie Serwisu</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Niekopiowania i nieprzekazywania treści bez zgody Administratora</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Podawania prawdziwych danych w formularzach kontaktowych</span>
                </li>
              </ul>

              <h3 className="text-lg font-medium text-gray-900 mb-4">Zakazane jest:</h3>
              <ul className="space-y-3 text-gray-700 font-light">
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Wprowadzanie do Serwisu treści niezgodnych z prawem</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Naruszanie praw autorskich i własności intelektualnej</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Podejmowanie prób włamania lub zakłócenia działania Serwisu</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Używanie Serwisu w celach konkurencyjnych bez zgody</span>
                </li>
              </ul>
            </div>
          </section>

          {/* 5. Prawa autorskie */}
          <section className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-6 tracking-tight">
              5. Prawa autorskie i własność intelektualna
            </h2>
            <div className="bg-white border border-gray-200 p-6">
              <div className="space-y-4 text-gray-700 font-light">
                <p>
                  <strong>5.1.</strong> Wszystkie treści zawarte w Serwisie, w tym teksty, zdjęcia, grafiki, 
                  logo oraz układ strony, podlegają ochronie prawnej i stanowią własność Administratora 
                  lub są używane na podstawie odpowiednich licencji.
                </p>
                <p>
                  <strong>5.2.</strong> Kopiowanie, reprodukowanie, publikowanie lub inne wykorzystywanie 
                  treści Serwisu bez pisemnej zgody Administratora jest zabronione.
                </p>
                <p>
                  <strong>5.3.</strong> Dozwolone jest udostępnianie linków do Serwisu oraz cytowanie 
                  krótkich fragmentów treści z podaniem źródła.
                </p>
                <p>
                  <strong>5.4.</strong> Zdjęcia produktów prezentowanych w Serwisie są własnością 
                  "VOYAGER" Robert Sopel i nie mogą być wykorzystywane bez zgody.
                </p>
              </div>
            </div>
          </section>

          {/* 6. Formularz kontaktowy */}
          <section className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-6 tracking-tight">
              6. Formularz kontaktowy i nawiązywanie współpracy
            </h2>
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Zasady kontaktu</h3>
                <ul className="space-y-3 text-gray-700 font-light">
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Formularz kontaktowy służy do nawiązywania kontaktu biznesowego</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Administrator odpowiada na zapytania w ciągu 24-48 godzin</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Szczegóły współpracy ustalane są indywidualnie</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Proces współpracy</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-medium">1</div>
                    <div>
                      <h4 className="font-medium text-gray-900">Zapytanie</h4>
                      <p className="text-sm text-gray-600 font-light">Złożenie zapytania przez formularz lub bezpośredni kontakt</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-medium">2</div>
                    <div>
                      <h4 className="font-medium text-gray-900">Konsultacja</h4>
                      <p className="text-sm text-gray-600 font-light">Omówienie wymagań i możliwości współpracy</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-medium">3</div>
                    <div>
                      <h4 className="font-medium text-gray-900">Oferta</h4>
                      <p className="text-sm text-gray-600 font-light">Przygotowanie indywidualnej oferty</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-medium">4</div>
                    <div>
                      <h4 className="font-medium text-gray-900">Współpraca</h4>
                      <p className="text-sm text-gray-600 font-light">Podpisanie umowy i realizacja zamówienia</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 7. Dostępność serwisu */}
          <section className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-6 tracking-tight">
              7. Dostępność Serwisu
            </h2>
            <div className="bg-white border border-gray-200 p-6">
              <div className="space-y-4 text-gray-700 font-light">
                <p>
                  <strong>7.1.</strong> Administrator dokłada wszelkich starań, aby Serwis był dostępny 
                  przez 24 godziny na dobę, 7 dni w tygodniu.
                </p>
                <p>
                  <strong>7.2.</strong> Administrator zastrzega sobie prawo do czasowego wyłączenia Serwisu 
                  w celu przeprowadzenia prac konserwacyjnych lub modernizacyjnych.
                </p>
                <p>
                  <strong>7.3.</strong> Administrator nie ponosi odpowiedzialności za przerwy w dostępności 
                  Serwisu wynikające z przyczyn niezależnych, w tym awarii dostawców usług internetowych.
                </p>
                <p>
                  <strong>7.4.</strong> O planowanych pracach konserwacyjnych Administrator informuje 
                  z wyprzedzeniem poprzez umieszczenie stosownej informacji w Serwisie.
                </p>
              </div>
            </div>
          </section>

          {/* 8. Odpowiedzialność */}
          <section className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-6 tracking-tight">
              8. Ograniczenie odpowiedzialności
            </h2>
            <div className="bg-white border border-gray-200 p-6">
              <div className="space-y-4 text-gray-700 font-light">
                <p>
                  <strong>8.1.</strong> Informacje o produktach prezentowanych w Serwisie mają charakter 
                  informacyjny i mogą ulec zmianie bez wcześniejszego powiadomienia.
                </p>
                <p>
                  <strong>8.2.</strong> Administrator nie gwarantuje, że Serwis będzie działał bez przerw 
                  i błędów technicznych.
                </p>
                <p>
                  <strong>8.3.</strong> Użytkownik korzysta z Serwisu na własną odpowiedzialność.
                </p>
              </div>
            </div>
          </section>

          {/* 9. Ochrona danych */}
        <section className="mb-12">
        <h2 className="text-2xl font-light text-gray-900 mb-6 tracking-tight">
            9. Ochrona danych osobowych
        </h2>
        <div className="bg-white border border-gray-200 p-6">
            <div className="space-y-4 text-gray-700 font-light">
            <p>
                <strong>9.1.</strong> Zasady przetwarzania danych osobowych określa odrębna&nbsp;
                <Link href="/polityka-prywatnosci" className="text-blue-600 hover:text-blue-800 underline">
                Polityka Prywatności
                </Link>.
            </p>
            <p>
                <strong>9.2.</strong> Skorzystanie z formularza kontaktowego wymaga wcześniejszego
                wyrażenia zgody na przetwarzanie danych osobowych w celu udzielenia odpowiedzi
                na przesłane zapytanie.
            </p>
            <p>
                <strong>9.3.</strong> Administrator przetwarza dane osobowe zgodnie z obowiązującymi
                przepisami prawa, w szczególności z Rozporządzeniem Parlamentu Europejskiego i Rady (UE)
                2016/679 z dnia 27 kwietnia 2016 r. (RODO), zapewniając ich odpowiednie bezpieczeństwo
                i poufność.
            </p>
            </div>
        </div>
        </section>


          {/* 10. Zmiany regulaminu */}
          <section className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-6 tracking-tight">
              10. Zmiany Regulaminu
            </h2>
            <div className="bg-white border border-gray-200 p-6">
              <div className="space-y-4 text-gray-700 font-light">
                <p>
                  <strong>10.1.</strong> Administrator zastrzega sobie prawo do wprowadzania zmian 
                  w niniejszym Regulaminie.
                </p>
                <p>
                  <strong>10.2.</strong> O wprowadzonych zmianach Administrator poinformuje poprzez 
                  umieszczenie zaktualizowanej wersji Regulaminu w Serwisie.
                </p>
                <p>
                  <strong>10.3.</strong> Zmiany wchodzą w życie z chwilą opublikowania nowej wersji Regulaminu.
                </p>
                <p>
                  <strong>10.4.</strong> Korzystanie z Serwisu po wprowadzeniu zmian oznacza akceptację 
                  nowych warunków.
                </p>
              </div>
            </div>
          </section>

          {/* 11. Postanowienia końcowe */}
          <section className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-6 tracking-tight">
              11. Postanowienia końcowe
            </h2>
            <div className="bg-white border border-gray-200 p-6">
              <div className="space-y-4 text-gray-700 font-light">
                <p>
                  <strong>11.1.</strong> W sprawach nieuregulowanych niniejszym Regulaminem zastosowanie 
                  mają przepisy prawa polskiego.
                </p>
                <p>
                  <strong>11.2.</strong> Ewentualne spory rozstrzygane będą przez sądy powszechne właściwe 
                  dla siedziby Administratora.
                </p>
                <p>
                  <strong>11.3.</strong> W przypadku uznania któregokolwiek z postanowień Regulaminu 
                  za nieważne, pozostałe postanowienia zachowują pełną moc prawną.
                </p>
                <p>
                  <strong>11.4.</strong> Niniejszy Regulamin wchodzi w życie z dniem {new Date().toLocaleDateString('pl-PL')}.
                </p>
              </div>
            </div>
          </section>

          {/* Kontakt */}
          <section className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-6 tracking-tight">
              12. Kontakt
            </h2>
            <div className="bg-white border border-gray-200 p-6">
              <p className="text-gray-700 font-light mb-4">
                W sprawach dotyczących Regulaminu można skontaktować się z Administratorem:
              </p>
              <div className="bg-gray-50 p-6 border-l-4 border-gray-900">
                <p className="font-medium text-gray-900 mb-2">"VOYAGER" Robert Sopel</p>
                <p className="text-gray-700 font-light mb-1">Aleje Stefana Batorego 60/1</p>
                <p className="text-gray-700 font-light mb-4">33-300 Nowy Sącz</p>
                
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
            </div>
          </section>
        </div>

        {/* CTA */}
        <div className="mt-16 bg-gray-900 text-white p-8 text-center">
          <h3 className="text-2xl font-light mb-4 tracking-tight">Zainteresowany współpracą?</h3>
          <p className="text-gray-300 mb-8 font-light leading-relaxed">
            Skontaktuj się z nami, aby omówić możliwości współpracy i poznać naszą ofertę.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/kontakt"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-gray-900 font-light hover:bg-gray-100 transition-colors uppercase tracking-wider"
            >
              Wyślij zapytanie
            </Link>
            <Link
              href="/produkty"
              className="inline-flex items-center justify-center px-8 py-3 border border-white text-white font-light hover:bg-white hover:text-gray-900 transition-colors uppercase tracking-wider"
            >
              Zobacz produkty
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}