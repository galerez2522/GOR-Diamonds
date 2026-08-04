import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

type Item = {
  productId: string;
  nameEn: string;
  nameHe: string;
  price: number;
  quantity: number;
  image: string;
};

export async function POST(req: Request) {
  if (!stripe) {
    return NextResponse.json(
      { message: 'Stripe is not configured. Set STRIPE_SECRET_KEY in .env.local' },
      { status: 501 },
    );
  }
  const body = await req.json().catch(() => null);
  if (!body?.items?.length) {
    return NextResponse.json({ message: 'Empty cart' }, { status: 400 });
  }

  const items = body.items as Item[];
  const locale: string = body.locale ?? 'en';
  const origin = req.headers.get('origin') ?? process.env.NEXT_PUBLIC_SITE_URL ?? '';

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: items.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: locale === 'he' ? item.nameHe : item.nameEn,
          images: [item.image],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    })),
    success_url: `${origin}/${locale}/cart/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/${locale}/cart`,
    locale: (locale === 'he' ? 'auto' : 'en') as 'auto' | 'en',
  });

  return NextResponse.json({ url: session.url });
}
