import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { formatCurrency } from '@/lib/utils';

export type ProductCardData = {
  slug: string;
  nameHe: string;
  nameEn: string;
  price: number;
  currency?: string;
  image: string;
  imageHover?: string;
};

export function ProductCard({
  product,
  locale,
}: {
  product: ProductCardData;
  locale: string;
}) {
  const name = locale === 'he' ? product.nameHe : product.nameEn;
  const priceLabel = formatCurrency(product.price, locale, product.currency ?? 'USD');

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-ivory-200">
        <Image
          src={product.image}
          alt={name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-opacity duration-700 group-hover:opacity-0"
        />
        {product.imageHover && (
          <Image
            src={product.imageHover}
            alt={name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          />
        )}
      </div>
      <div className="mt-5 text-center">
        <h3 className="font-serif text-lg text-charcoal">{name}</h3>
        <p className="mt-1 text-[13px] tracking-wider uppercase text-charcoal-500">
          {priceLabel}
        </p>
      </div>
    </Link>
  );
}
