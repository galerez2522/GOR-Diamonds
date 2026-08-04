'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { X, Minus, Plus } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import { formatCurrency } from '@/lib/utils';

export function CartView() {
  const t = useTranslations('cart');
  const locale = useLocale();
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const subtotal = useCartStore((s) => s.subtotal());

  async function onCheckout() {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ items, locale }),
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  }

  if (items.length === 0) {
    return (
      <div className="container-luxe py-32 text-center">
        <h1 className="display-serif text-4xl mb-6">{t('title')}</h1>
        <p className="text-charcoal-500 mb-10">{t('empty')}</p>
        <Link href="/" className="btn-outline">
          {t('continueShopping')}
        </Link>
      </div>
    );
  }

  return (
    <div className="container-luxe py-16 md:py-24">
      <h1 className="display-serif text-4xl md:text-5xl text-center mb-14">
        {t('title')}
      </h1>
      <div className="grid lg:grid-cols-[1fr_400px] gap-14">
        <div className="divide-y divide-charcoal/10">
          {items.map((item) => {
            const name = locale === 'he' ? item.nameHe : item.nameEn;
            return (
              <div key={`${item.productId}-${item.variantId ?? 'na'}`} className="flex gap-6 py-6">
                <div className="relative w-24 h-32 md:w-28 md:h-36 bg-ivory-200 shrink-0">
                  <Image src={item.image} alt={name} fill sizes="120px" className="object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-lg">{name}</h3>
                    {item.metal && (
                      <p className="text-xs tracking-wider uppercase text-charcoal-500 mt-1">{item.metal}</p>
                    )}
                    <p className="mt-2 text-sm">{formatCurrency(item.price * item.quantity, locale)}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center border border-charcoal/20">
                      <button
                        aria-label="-"
                        onClick={() => updateQuantity(item.productId, item.quantity - 1, item.variantId)}
                        className="p-2 hover:bg-ivory-200"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <button
                        aria-label="+"
                        onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variantId)}
                        className="p-2 hover:bg-ivory-200"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.productId, item.variantId)}
                      className="text-xs tracking-luxe uppercase text-charcoal-500 hover:text-charcoal flex items-center gap-1"
                    >
                      <X size={14} /> {t('remove')}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <aside className="bg-ivory-200/50 p-8 h-fit">
          <div className="flex justify-between text-sm py-2">
            <span>{t('subtotal')}</span>
            <span>{formatCurrency(subtotal, locale)}</span>
          </div>
          <div className="flex justify-between text-sm py-2">
            <span>{t('shipping')}</span>
            <span>{t('shippingFree')}</span>
          </div>
          <div className="border-t border-charcoal/20 mt-4 pt-4 flex justify-between font-serif text-xl">
            <span>{t('total')}</span>
            <span>{formatCurrency(subtotal, locale)}</span>
          </div>
          <button onClick={onCheckout} className="btn-primary w-full mt-8">
            {t('checkout')}
          </button>
          <Link href="/" className="block mt-4 text-center text-xs tracking-luxe uppercase link-underline">
            {t('continueShopping')}
          </Link>
        </aside>
      </div>
    </div>
  );
}
