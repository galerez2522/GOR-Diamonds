import { setRequestLocale, getTranslations } from 'next-intl/server';
import { ProductCard } from '@/components/product/ProductCard';
import { sampleProducts } from '@/lib/sample-data';
import Image from 'next/image';

type Params = { locale: string; category: string };

const CATEGORY_MAP: Record<
  string,
  { titleKey: string; descKey: string; hero: string; sampleKey: keyof typeof sampleProducts }
> = {
  'engagement-rings': {
    titleKey: 'engagementRings.title',
    descKey: 'engagementRings.description',
    hero: 'https://images.unsplash.com/photo-1602752275197-9e4f5efe2b1b?auto=format&fit=crop&w=2400&q=80',
    sampleKey: 'engagement-rings',
  },
  'wedding-rings': {
    titleKey: 'weddingRings.title',
    descKey: 'weddingRings.description',
    hero: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2400&q=80',
    sampleKey: 'wedding-rings',
  },
  'necklaces': {
    titleKey: 'necklaces.title',
    descKey: 'necklaces.description',
    hero: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=2400&q=80',
    sampleKey: 'necklaces',
  },
  'earrings': {
    titleKey: 'earrings.title',
    descKey: 'earrings.description',
    hero: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=2400&q=80',
    sampleKey: 'earrings',
  },
  'bracelets': {
    titleKey: 'bracelets.title',
    descKey: 'bracelets.description',
    hero: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=2400&q=80',
    sampleKey: 'bracelets',
  },
};

export function generateStaticParams() {
  return Object.keys(CATEGORY_MAP).map((category) => ({ category }));
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, category } = await params;
  setRequestLocale(locale);

  const cfg = CATEGORY_MAP[category];
  if (!cfg) {
    return (
      <div className="container-luxe py-32 text-center">
        <h1 className="display-serif text-4xl">Collection not found</h1>
      </div>
    );
  }

  const t = await getTranslations('collections');
  const products = sampleProducts[cfg.sampleKey] ?? [];

  return (
    <>
      {/* Category hero */}
      <section className="relative h-[52vh] min-h-[380px] w-full overflow-hidden">
        <Image
          src={cfg.hero}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/45" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-ivory container-luxe">
          <div className="eyebrow !text-champagne-light mb-4">GOR Diamonds</div>
          <h1 className="display-serif text-5xl md:text-7xl mb-4">
            {t(cfg.titleKey)}
          </h1>
          <p className="max-w-xl text-sm md:text-base text-ivory/85">
            {t(cfg.descKey)}
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 md:py-24">
        <div className="container-luxe grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} locale={locale} />
          ))}
        </div>
      </section>
    </>
  );
}
