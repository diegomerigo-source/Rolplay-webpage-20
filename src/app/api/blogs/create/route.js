import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Blog } from '@/models/Blog';
import Subscriber from '@/models/Subscriber';
import { blogCreateSchema } from '@/lib/validations';

function generateSlug(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function calculateReadingTime(content) {
  const text = content.replace(/<[^>]+>/g, ' ');
  return Math.max(1, Math.ceil(text.split(/\s+/).length / 200));
}

// Build a localised notification email for a single subscriber.
function buildNotificationEmail({ title, summary, coverImage, postUrl, readingTime, locale }) {
  const isEs = locale === 'es';

  const subject = isEs
    ? `Nuevo artículo: ${title}`
    : `New article: ${title}`;

  const ctaLabel   = isEs ? 'Leer el artículo →' : 'Read the article →';
  const minRead    = isEs ? 'min de lectura' : 'min read';
  const unsubLabel = isEs ? 'Cancelar suscripción' : 'Unsubscribe';
  const tagline    = isEs
    ? 'Ventas · Coaching con IA · Equipos comerciales'
    : 'Sales · AI Coaching · Commercial Teams';

  const coverHtml = coverImage
    ? `<img src="${coverImage}" alt="${title}" style="width:100%;border-radius:8px;margin-bottom:24px;" />`
    : '';

  const html = `
<!DOCTYPE html>
<html lang="${locale}">
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
<body style="margin:0;padding:0;background:#0A0A0E;font-family:'Helvetica Neue',Arial,sans-serif;color:#e4e4e7;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0A0A0E;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#111115;border-radius:12px;border:1px solid rgba(255,255,255,0.06);overflow:hidden;">

        <!-- Header -->
        <tr><td style="padding:28px 36px;border-bottom:1px solid rgba(255,255,255,0.06);">
          <span style="font-size:26px;font-weight:800;letter-spacing:-0.5px;">
            <span style="color:#C0392B;">Rol</span><span style="color:#fff;">Play</span>
          </span>
        </td></tr>

        <!-- Body -->
        <tr><td style="padding:36px;">
          ${coverHtml}
          <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#C0392B;font-family:monospace;">
            // ${isEs ? 'NUEVO ARTÍCULO' : 'NEW ARTICLE'}
          </p>
          <h1 style="margin:0 0 16px;font-size:26px;font-weight:800;line-height:1.2;color:#fff;">
            ${title}
          </h1>
          <p style="margin:0 0 8px;font-size:11px;color:#71717a;font-family:monospace;">
            ${readingTime} ${minRead}
          </p>
          <p style="margin:0 0 28px;font-size:15px;line-height:1.7;color:#a1a1aa;">
            ${summary}
          </p>
          <a href="${postUrl}"
             style="display:inline-block;padding:14px 28px;background:#C0392B;color:#fff;text-decoration:none;border-radius:9999px;font-size:14px;font-weight:600;">
            ${ctaLabel}
          </a>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:20px 36px;border-top:1px solid rgba(255,255,255,0.06);text-align:center;">
          <p style="margin:0 0 6px;font-size:11px;color:#52525b;font-family:monospace;letter-spacing:0.1em;">
            ${tagline}
          </p>
          <p style="margin:0;font-size:11px;color:#3f3f46;">
            <a href="${postUrl}?unsubscribe=1" style="color:#52525b;">${unsubLabel}</a>
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  return { subject, html };
}

// Fire-and-forget — response is already sent before this resolves.
// Sends in batches of 100 (Resend batch limit).
async function notifySubscribers({ title, summary, coverImage, postUrl, readingTime }) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return;

  try {
    const subscribers = await Subscriber.find({ confirmed: true }, 'email locale').lean();
    if (!subscribers.length) return;

    const { Resend } = await import('resend');
    const resend = new Resend(key);
    const fromAddress = 'RolPlay Blog <noreply@rolplay.ai>';

    // Build one email object per subscriber (locale-aware subject line)
    const emails = subscribers.map((sub) => {
      const { subject, html } = buildNotificationEmail({
        title, summary, coverImage, postUrl, readingTime,
        locale: sub.locale || 'en',
      });
      return { from: fromAddress, to: sub.email, subject, html };
    });

    // Resend batch limit is 100 emails per call
    const BATCH = 100;
    for (let i = 0; i < emails.length; i += BATCH) {
      await resend.batch.send(emails.slice(i, i + BATCH));
    }
  } catch (err) {
    // Never surface to the HTTP response — a failed notification must not
    // block or error the blog creation.
    console.warn('[notify-subscribers] Non-critical error:', err?.message ?? err);
  }
}

export async function POST(request) {
  const apiKey = request.headers.get('x-api-key');
  if (!process.env.ADMIN_API_KEY || apiKey !== process.env.ADMIN_API_KEY) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const result = blogCreateSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ success: false, error: 'Validation failed', message: result.error.issues.map((e) => e.message).join(', ') }, { status: 400 });
  }

  const { title, summary, content, coverImage, tags, source, published } = result.data;
  await dbConnect();

  const baseSlug = generateSlug(title);
  const existing = await Blog.find({ slug: new RegExp(`^${baseSlug}(-\\d+)?$`, 'i') }, 'slug').lean();
  const existingSlugs = existing.map((s) => s.slug);
  let slug = baseSlug;
  let counter = 1;
  while (existingSlugs.includes(slug)) { slug = `${baseSlug}-${counter++}`; }

  const blog = await Blog.create({
    title, slug, summary, content, coverImage,
    tags: tags || [], source,
    published: published ?? true,
    readingTime: calculateReadingTime(content),
  });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rolplay.ai';
  const postUrl = `${siteUrl}/blog/${blog.slug}`;

  // Only notify when the post is actually published (not a draft)
  if (blog.published) {
    notifySubscribers({ title, summary, coverImage, postUrl, readingTime: blog.readingTime });
  }

  return NextResponse.json({ success: true, data: { slug: blog.slug, url: postUrl } }, { status: 201 });
}
