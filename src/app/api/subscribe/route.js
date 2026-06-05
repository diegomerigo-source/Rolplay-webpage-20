import { NextResponse } from 'next/server';
import { z } from 'zod';
import connectDB from '@/lib/db';
import Subscriber from '@/models/Subscriber';
import crypto from 'crypto';

const schema = z.object({
  email: z.string().email('Invalid email address'),
  locale: z.enum(['en', 'es', 'fr']).optional().default('en'),
  source: z.enum(['footer', 'blog', 'homepage']).optional().default('footer'),
});

// Send a welcome email via Resend — only runs when RESEND_API_KEY is configured.
// Completely optional: the subscriber is already saved before this runs.
async function sendWelcomeEmail(email, locale) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return; // gracefully skip

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rolplay.ai';
  const fromName = 'RolPlay';
  const fromEmail = 'noreply@rolplay.ai'; // must be a verified Resend sender domain

  const subject =
    locale === 'es'
      ? '¡Gracias por suscribirte al blog de RolPlay!'
      : 'Thanks for subscribing to the RolPlay blog!';

  const body =
    locale === 'es'
      ? `<p>Hola,</p>
<p>¡Bienvenido al blog de RolPlay! Te notificaremos cada vez que publiquemos nuevos artículos sobre ventas, IA y desarrollo comercial.</p>
<p><a href="${siteUrl}/blog">Ver los artículos más recientes →</a></p>
<p style="color:#999;font-size:12px;">Puedes cancelar tu suscripción en cualquier momento respondiendo a este correo.</p>`
      : `<p>Hi there,</p>
<p>Welcome to the RolPlay blog! We'll let you know whenever we publish new articles on sales, AI, and commercial team development.</p>
<p><a href="${siteUrl}/blog">Browse the latest articles →</a></p>
<p style="color:#999;font-size:12px;">You can unsubscribe at any time by replying to this email.</p>`;

  try {
    const { Resend } = await import('resend');
    const resend = new Resend(key);
    await resend.emails.send({
      from: `${fromName} <${fromEmail}>`,
      to: email,
      subject,
      html: body,
    });
  } catch {
    // Never throw — a failed welcome email must not affect the HTTP response
    console.warn('[subscribe] Welcome email failed (non-critical)');
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 422 }
      );
    }

    const { email, locale, source } = parsed.data;

    const db = await connectDB();
    if (!db) {
      // DB not configured — still return 200 so the form feels "working" in dev
      return NextResponse.json({ success: true, dev: true });
    }

    // Check for existing subscriber
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { error: 'already_subscribed' },
        { status: 409 }
      );
    }

    const token = crypto.randomBytes(32).toString('hex');

    await Subscriber.create({
      email,
      locale,
      source,
      unsubscribeToken: token,
    });

    // Fire-and-forget — do not await in the response path
    sendWelcomeEmail(email, locale);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error('[subscribe]', err);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
