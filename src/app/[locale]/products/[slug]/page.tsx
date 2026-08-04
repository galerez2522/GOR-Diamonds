import { setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { sampleProducts } from '@/lib/sample-data';
import { ProductActions } from '@/components/product/ProductActions';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const product = Object.values(sampleProducts)
    .flat()
    .find((p) => p.slug === slug);
  if (!product) notFound();

  return (
    <section className="py-16 md:py-24">
      <div className="container-luxe grid lg:grid-cols-2 gap-14 items-start">
        <div className="space-y-4">
          <div className="relative aspect-square bg-ivory-200">
            <Image
              src={product.image}
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          {product.imageHover && (
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-square bg-ivory-200">
                <Image src={product.imageHover} alt="" fill sizes="25vw" className="object-cover" />
              </div>
              <div className="relative aspect-square bg-ivory-200">
                <Image src={product.image} alt="" fill sizes="25vw" className="object-cover" />
              </div>
            </div>
          )}
        </div>
        <ProductActions product={product} />
      </div>
    </section>
  );
}
