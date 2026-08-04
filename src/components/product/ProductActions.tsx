'use client';

import { useTranslations, useLocale } from 'next-intl';
import type { ProductCardData } from '@/components/product/ProductCard';
import { useCartStore } from '@/lib/cart-store';
import { formatCurrency } from '@/lib/utils';
import { useState } from 'react';

export function ProductActions({ product }: { product: ProductCardData }) {
  const t = useTranslations('product');
  const locale = useLocale();
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

  const name = locale === 'he' ? product.nameHe : product.nameEn;

  function onAdd() {
    addItem({
      productId: product.slug,
      slug: product.slug,
      nameEn: product.nameEn,
      nameHe: product.nameHe,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  return (
    <div className="space-y-8">
      <div>
        <div className="eyebrow mb-3">GOR Diamonds</div>
        <h1 className="display-serif text-4xl md:text-5xl mb-4">{name}</h1>
        <p className="text-lg text-charcoal-700">
          {formatCurrency(product.price, locale)}
        </p>
      </div>

      <div className="border-t border-charcoal/10 pt-6 space-y-2 text-sm">
        <div className="flex justify-between py-1">
          <span className="text-charcoal-500 uppercase tracking-wider text-xs">{t('shape')}</span>
          <span>Round Brilliant</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="text-charcoal-500 uppercase tracking-wider text-xs">{t('carat')}</span>
          <span>1.20 ct</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="text-charcoal-500 uppercase tracking-wider text-xs">{t('color')}</span>
          <span>D</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="text-charcoal-500 uppercase tracking-wider text-xs">{t('clarity')}</span>
          <span>VVS1</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="text-charcoal-500 uppercase tracking-wider text-xs">{t('cut')}</span>
          <span>Excellent</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="text-charcoal-500 uppercase tracking-wider text-xs">{t('metal')}</span>
          <span>Platinum 950</span>
        </div>
      </div>

      <div className="space-y-3">
        <button onClick={onAdd} className="btn-primary w-full">
          {added ? t('addedToCart') : t('addToCart')}
        </button>
        <button className="btn-outline w-full">{t('bookViewing')}</button>
      </div>
    </div>
  );
}
