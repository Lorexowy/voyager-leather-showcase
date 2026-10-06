const assert = require('node:assert/strict');
const { test, beforeEach, afterEach, after } = require('node:test');
const { mkdtempSync, rmSync } = require('node:fs');
const { tmpdir } = require('node:os');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

// Compile just the notification modules with the project's TypeScript compiler.
const output = mkdtempSync(path.join(tmpdir(), 'voyager-contact-tests-'));
execFileSync(process.execPath, [require.resolve('typescript/bin/tsc'),
  'src/app/api/contact-notification/route.ts', 'src/lib/contact-notification.ts',
  '--outDir', output, '--rootDir', 'src', '--module', 'commonjs',
  '--target', 'es2022', '--lib', 'es2022,dom', '--skipLibCheck', '--strict',
]);
const routePath = path.join(output, 'app/api/contact-notification/route.js');
const { sendContactNotification } = require(path.join(output, 'lib/contact-notification.js'));
const originalFetch = global.fetch;
const originalEnv = { ...process.env };
let POST;
let calls;

beforeEach(() => {
  process.env.RESEND_API_KEY = 'test-key-not-a-real-secret';
  process.env.NODE_ENV = 'test';
  delete process.env.VERCEL;
  delete process.env.VERCEL_URL;
  delete require.cache[require.resolve(routePath)];
  ({ POST } = require(routePath));
  calls = [];
  global.fetch = async (...args) => {
    calls.push(args);
    return Response.json({ id: 'test-email-id' });
  };
});

afterEach(() => {
  global.fetch = originalFetch;
  for (const key of ['RESEND_API_KEY', 'NODE_ENV', 'VERCEL', 'VERCEL_URL']) {
    if (originalEnv[key] === undefined) delete process.env[key];
    else process.env[key] = originalEnv[key];
  }
});
after(() => rmSync(output, { recursive: true, force: true }));

const inquiry = {
  messageId: 'abcdefghijklmnopqrst', name: 'Anna Kowalska',
  email: 'anna@example.com', phone: '+48 500 600 700',
  message: 'Proszę o ofertę na wybrany produkt.\nInteresuje mnie kolor czarny.',
  productId: 'product-1', productName: 'Torebka skórzana', consentGiven: true,
};
function request(data = inquiry, origin = 'https://www.voyagersopel.pl') {
  return new Request('https://www.voyagersopel.pl/api/contact-notification', {
    method: 'POST', headers: { 'Content-Type': 'application/json', Origin: origin },
    body: JSON.stringify(data),
  });
}

test('sends only to Voyager, with customer Reply-To and a stable idempotency key', async () => {
  assert.equal((await POST(request({ ...inquiry, to: 'attacker@example.com' }))).status, 200);
  const [url, options] = calls[0];
  assert.equal(url, 'https://api.resend.com/emails');
  const email = JSON.parse(options.body);
  assert.deepEqual(email.to, ['voyager.sopel@gmail.com']);
  assert.equal(email.from, 'Voyager — formularz <formularz@voyagersopel.pl>');
  assert.equal(email.reply_to, inquiry.email);
  assert.ok(email.text.includes(inquiry.message));
  assert.ok(email.text.includes(inquiry.productName));
  assert.equal(email.html, undefined);
  assert.equal(options.headers['Idempotency-Key'], `contact-notification/${inquiry.messageId}`);
  await POST(request());
  assert.equal(calls[1][1].headers['Idempotency-Key'], options.headers['Idempotency-Key']);
});

test('general inquiries work without product or phone fields', async () => {
  const { productId, productName, phone, ...general } = inquiry;
  assert.equal((await POST(request(general, 'https://voyagersopel.pl'))).status, 200);
  assert.ok(JSON.parse(calls[0][1].body).subject.includes('Zapytanie ogólne'));
});

test('rejects foreign or missing Origin before calling Resend', async () => {
  assert.equal((await POST(request(inquiry, 'https://attacker.example'))).status, 403);
  assert.equal((await POST(request(inquiry, ''))).status, 403);
  assert.equal(calls.length, 0);
});

test('permits the configured Vercel preview but rejects localhost in production', async () => {
  process.env.NODE_ENV = 'production';
  process.env.VERCEL_URL = 'voyager-test.vercel.app';
  assert.equal((await POST(request(inquiry, 'https://voyager-test.vercel.app'))).status, 200);
  assert.equal((await POST(request(inquiry, 'http://localhost:3000'))).status, 403);
});

test('rejects header injection, malformed email, missing consent, and honeypot', async () => {
  for (const patch of [
    { email: 'anna@example.com\r\nBcc: attacker@example.com' },
    { email: 'not-an-email' }, { name: 'Anna\nInjected' },
    { consentGiven: false }, { website: 'https://spam.example' },
  ]) {
    assert.equal((await POST(request({ ...inquiry, ...patch }))).status, 400);
  }
  assert.equal(calls.length, 0);
});

test('rejects oversized body and incorrect content type', async () => {
  assert.equal((await POST(request({ ...inquiry, message: 'x'.repeat(40_000) }))).status, 400);
  const plain = request();
  plain.headers.set('content-type', 'text/plain');
  assert.equal((await POST(plain)).status, 415);
  assert.equal(calls.length, 0);
});

test('rejects malformed JSON', async () => {
  const malformed = new Request('https://www.voyagersopel.pl/api/contact-notification', {
    method: 'POST', headers: { Origin: 'https://www.voyagersopel.pl', 'Content-Type': 'application/json' },
    body: '{',
  });
  assert.equal((await POST(malformed)).status, 400);
  assert.equal(calls.length, 0);
});

test('limits bursts per instance', async () => {
  for (let i = 0; i < 5; i++) assert.equal((await POST(request())).status, 200);
  assert.equal((await POST(request())).status, 429);
  assert.equal(calls.length, 5);
});

test('reports a missing server secret without sending anything', async () => {
  delete process.env.RESEND_API_KEY;
  assert.equal((await POST(request())).status, 503);
  assert.equal(calls.length, 0);
});

test('handles provider rejection and a network failure', async () => {
  global.fetch = async () => Response.json({ error: 'test failure' }, { status: 422 });
  assert.equal((await POST(request())).status, 502);
  global.fetch = async () => { throw new Error('offline'); };
  assert.equal((await POST(request())).status, 503);
});

test('client retries only notification with identical data after a transient failure', async () => {
  global.fetch = async (...args) => {
    calls.push(args);
    return new Response(null, { status: calls.length === 1 ? 503 : 200 });
  };
  assert.equal(await sendContactNotification(inquiry), true);
  assert.equal(calls.length, 2);
  assert.equal(calls[0][1].body, calls[1][1].body);
  assert.equal(calls[0][1].keepalive, true);
});

test('client notification failure resolves without throwing after a saved inquiry', async () => {
  global.fetch = async (...args) => {
    calls.push(args);
    throw new Error('offline');
  };
  assert.equal(await sendContactNotification(inquiry), false);
  assert.equal(calls.length, 2);
});

test('client does not retry validation or rate-limit rejection', async () => {
  global.fetch = async (...args) => {
    calls.push(args);
    return new Response(null, { status: 429 });
  };
  assert.equal(await sendContactNotification(inquiry), false);
  assert.equal(calls.length, 1);
});
