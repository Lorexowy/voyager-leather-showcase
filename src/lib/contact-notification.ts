export interface ContactNotification {
  messageId: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  productId?: string;
  productName?: string;
  consentGiven: boolean;
  website?: string;
}

// Notification failure must never turn a successful Firestore write into a
// failed submission. Retry only the email request, with the same message ID.
export async function sendContactNotification(data: ContactNotification): Promise<boolean> {
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const response = await fetch('/api/contact-notification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        keepalive: true,
        signal: AbortSignal.timeout(12_000),
      });
      if (response.ok) return true;
      if (response.status < 500) break;
    } catch {
      // A timeout can occur after Resend accepted the email. The server uses
      // an idempotency key so retrying does not send it a second time.
    }
  }
  console.warn('Contact notification failed; the inquiry remains in the admin panel.');
  return false;
}
