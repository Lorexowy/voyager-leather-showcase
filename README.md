This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Formularz kontaktowy — Resend na Vercel

Formularz najpierw zapisuje zapytanie w `contactMessages` w Firestore,
a następnie wywołuje `POST /api/contact-notification`. Endpoint wysyła wiadomość
przez API Resend z adresu `formularz@voyagersopel.pl` na stały adres
`voyager.sopel@gmail.com`. `Reply-To` zawiera adres klienta.

- W Vercel ustaw sekret `RESEND_API_KEY` dla środowiska Production i wdroż zmiany.
  Nie używaj prefiksu `NEXT_PUBLIC_`. Domena `voyagersopel.pl` musi być verified
  w Resend, a klucz musi mieć uprawnienie do wysyłki z tej domeny.
- Lokalnie można ustawić ten sam sekret w ignorowanym przez Git `.env.local`.
  Testy automatyczne używają atrap i nie wysyłają prawdziwych wiadomości.
- Nie są potrzebne dodatkowe sekrety Firebase ani zmiany reguł Firestore.
  Wysyłka z podglądu Vercel wymaga klucza dla środowiska Preview; bez niego
  zapytanie nadal zapisze się w bazie, ale powiadomienie nie zostanie wysłane.

Powiadomienie jest ponawiane jeden raz przy błędzie sieci lub odpowiedzi 5xx.
Obie próby używają tego samego ID dokumentu i klucza idempotencji Resend
(Resend przechowuje te klucze przez 24 godziny). Błąd powiadomienia nie powoduje
ponownego zapisu ani komunikatu o nieprzyjęciu zapytania. Nie ma kolejki w tle:
zamknięcie strony przed wywołaniem endpointu może oznaczać brak e-maila.

Endpoint waliduje dane, zgodę, rozmiar i Origin; odbiorca i nadawca są stałe.
Formularz zawiera honeypot i blokadę równoczesnego wysyłania. Limity API
(5 prób na adres IP / 10 minut, 100 prób łącznie / 10 minut) działają tylko
w obrębie pojedynczej instancji Vercel. Origin i honeypot nie uwierzytelniają
nadawcy, a bez dostępu serwerowego do Firestore endpoint nie potwierdza, czy
przekazane ID rzeczywiście istnieje w bazie. Przy nasilonym spamie potrzebne
będą limity w Vercel Firewall lub trwały limiter / ochrona botów.

Weryfikacja: `npm run test:contact`, `npx tsc --noEmit`, `npm run build`.
Po wdrożeniu wyślij zapytanie ogólne i zapytanie z karty produktu, sprawdź
oba wpisy w panelu i wiadomości w Gmailu (również Spam), a następnie sprawdź
adres odbiorcy po kliknięciu „Odpowiedz”. Błędy wysyłki są widoczne w logach
Vercel, a statusy wiadomości w Resend; treść zapytań i klucz nie są logowane
przez endpoint powiadomień.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
