import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import type Stripe from 'stripe';

export async function POST(req: Request) {
  if (!stripe) return NextResponse.json({ ok: false }, { status: 501 });

  const signature = req.headers.get('stripe-signature');
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!signature || !secret) {
    return NextResponse.json({ message: 'Missing signature' }, { status: 400 });
  }

  const raw = await req.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(raw, signature, secret);
  } catch (err) {
    return NextResponse.json({ message: `Webhook error: ${(err as Error).message}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    await prisma.order.updateMany({
      where: { stripeSessionId: session.id },
      data: { status: 'PAID', stripePaymentIntentId: (session.payment_intent as string) ?? null },
    });
  }

  return NextResponse.json({ received: true });
}

// App Router route handlers stream the raw body via `req.text()` above —
// no `config` export needed (unlike Pages Router).
