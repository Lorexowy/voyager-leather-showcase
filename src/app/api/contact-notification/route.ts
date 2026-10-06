import { createHash } from 'node:crypto';
import type { ContactNotification } from '../../../lib/contact-notification';

export const runtime = 'nodejs';

const MAX_BODY_BYTES = 32_768;
const WINDOW_MS = 10 * 60_000;
// Best-effort limits per running instance, not a distributed rate limiter.
const attempts = new Map<string, { count: number; expiresAt: number }>();

function reply(status: number, error?: string) {
  return Response.json(error ? { error } : { accepted: true }, {
    status,
    headers: { 'Cache-Control': 'no-store' },
  });
}

function allowedOrigin(request: Request): boolean {
  const origins = new Set(['https://voyagersopel.pl', 'https://www.voyagersopel.pl']);
  if (process.env.VERCEL_URL) origins.add(`https://${process.env.VERCEL_URL}`);
  if (process.env.NODE_ENV !== 'production') {
    origins.add('http://localhost:3000');
    origins.add('http://127.0.0.1:3000');
  }
  return origins.has(request.headers.get('origin') || '');
}

function withinRateLimit(request: Request): boolean {
  const now = Date.now();
  for (const [key, entry] of attempts) {
    if (entry.expiresAt <= now) attempts.delete(key);
  }
  // Vercel sets x-vercel-forwarded-for; do not trust a client-supplied XFF.
  const ip = process.env.VERCEL
    ? request.headers.get('x-vercel-forwarded-for') || 'unknown'
    : 'local';
  const key = createHash('sha256').update(ip).digest('hex');
  const global = attempts.get('all') || { count: 0, expiresAt: now + WINDOW_MS };
  const client = attempts.get(key) || { count: 0, expiresAt: now + WINDOW_MS };
  if (global.count >= 100 || client.count >= 5) return false;
  global.count++;
  client.count++;
  attempts.set('all', global);
  attempts.set(key, client);
  return true;
}

function validPayload(value: unknown): value is ContactNotification {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const data = value as Record<string, unknown>;
  const singleLine = (key: string, min: number, max: number, optional = false) => {
    const field = data[key];
    if (optional && field === undefined) return true;
    return typeof field === 'string' && field.trim().length >= min &&
      field.length <= max && !/[\x00-\x1f\x7f]/.test(field);
  };
  return singleLine('messageId', 20, 20) && /^[a-zA-Z0-9]{20}$/.test(data.messageId as string) &&
    singleLine('name', 2, 200) && singleLine('email', 3, 254) &&
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email as string) &&
    singleLine('phone', 0, 50, true) && singleLine('productId', 0, 200, true) &&
    singleLine('productName', 0, 300, true) &&
    typeof data.message === 'string' && data.message.trim().length >= 10 &&
    data.message.length <= 5000 && !/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/.test(data.message) &&
    data.consentGiven === true && (data.website === undefined || data.website === '');
}

async function readBody(request: Request): Promise<string> {
  const reader = request.body?.getReader();
  if (!reader) throw new Error('Missing body');
  const decoder = new TextDecoder();
  let bytes = 0;
  let text = '';
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > MAX_BODY_BYTES) {
        await reader.cancel();
        throw new Error('Body too large');
      }
      text += decoder.decode(value, { stream: true });
    }
    return text + decoder.decode();
  } finally {
    reader.releaseLock();
  }
}

export async function POST(request: Request): Promise<Response> {
  if (!allowedOrigin(request)) return reply(403, 'Niedozwolone źródło zapytania.');
  if (request.headers.get('content-type')?.split(';')[0].trim() !== 'application/json') {
    return reply(415, 'Wymagany format JSON.');
  }
  if (!withinRateLimit(request)) return reply(429, 'Zbyt wiele zapytań.');

  let data: unknown;
  try {
    data = JSON.parse(await readBody(request));
  } catch {
    return reply(400, 'Nieprawidłowe dane zapytania.');
  }
  if (!validPayload(data)) return reply(400, 'Nieprawidłowe dane zapytania.');

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('Contact notification: RESEND_API_KEY is not configured.');
    return reply(503, 'Powiadomienia są chwilowo niedostępne.');
  }

  const product = data.productName || (data.productId ? 'Zapytanie o produkt' : 'Zapytanie ogólne');
  const text = [
    'Nowe zapytanie z voyagersopel.pl',
    '',
    `Imię i nazwisko: ${data.name}`,
    `E-mail: ${data.email}`,
    `Telefon: ${data.phone || 'Nie podano'}`,
    `Produkt: ${product}`,
    ...(data.productId ? [`ID produktu: ${data.productId}`] : []),
    `ID zapytania: ${data.messageId}`,
    '',
    'Treść wiadomości:',
    data.message,
    '',
    'Kliknij „Odpowiedz”, aby napisać bezpośrednio do klienta.',
    'Panel: https://www.voyagersopel.pl/admin/dashboard',
  ].join('\n');

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': `contact-notification/${data.messageId}`,
      },
      body: JSON.stringify({
        from: 'Voyager — formularz <formularz@voyagersopel.pl>',
        to: ['voyager.sopel@gmail.com'],
        reply_to: data.email,
        subject: `Zapytanie ze strony — ${product}`,
        text,
      }),
      signal: AbortSignal.timeout(8_000),
    });
    if (!response.ok) {
      // Never log the body, which may include customer data or credentials.
      console.error('Contact notification: Resend rejected request.', response.status);
      return reply(response.status === 429 || response.status >= 500 ? 503 : 502,
        'Nie udało się wysłać powiadomienia.');
    }
    return reply(200);
  } catch {
    console.error('Contact notification: Resend connection failed.');
    return reply(503, 'Nie udało się wysłać powiadomienia.');
  }
}
