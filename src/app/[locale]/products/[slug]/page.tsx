import { setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { findProduct } from '@/lib/catalog';
import { ProductActions } from '@/components/product/ProductActions';

export const dynamic = 'force-dynamic';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const product = await findProduct(slug);
  if (!product) notFound();

  const primary = product.images[0] ?? '';
  const secondary = product.images[1];

  return (
    <section className="py-16 md:py-24">
      <div className="container-luxe grid lg:grid-cols-2 gap-14 items-start">
        <div className="space-y-4">
          <div className="relative aspect-square bg-ivory-200">
            {primary && (
              <Image
                src={primary}
                alt=""
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            )}
          </div>
          {secondary && (
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-square bg-ivory-200">
                <Image src={secondary} alt="" fill sizes="25vw" className="object-cover" />
              </div>
              <div className="relative aspect-square bg-ivory-200">
                <Image src={primary} alt="" fill sizes="25vw" className="object-cover" />
              </div>
            </div>
          )}
        </div>
        <ProductActions
          product={{
            slug: product.slug,
            nameEn: product.nameEn,
            nameHe: product.nameHe,
            price: product.price,
            currency: product.currency,
            image: primary,
          }}
        />
      </div>
    </section>
  );
}
