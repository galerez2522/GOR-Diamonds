import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';

const items = [
  {
    key: 'engagementRings',
    href: '/collections/engagement-rings',
    image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=1200&q=80',
  },
  {
    key: 'necklaces',
    href: '/collections/necklaces',
    image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    key: 'earrings',
    href: '/collections/earrings',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=80',
  },
  {
    key: 'bracelets',
    href: '/collections/bracelets',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1200&q=80',
  },
] as const;

export function FeaturedCollections() {
  const t = useTranslations('collections');

  return (
    <section className="py-24 md:py-32">
      <div className="container-luxe text-center max-w-2xl mx-auto mb-16 md:mb-20">
        <div className="eyebrow mb-4">
          <span className="divider-luxe">{t('title')}</span>
        </div>
        <h2 className="display-serif text-4xl md:text-5xl mb-5">{t('subtitle')}</h2>
      </div>

      <div className="container-luxe grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {items.map(({ key, href, image }) => (
          <Link key={key} href={href} className="group block">
            <div className="relative aspect-[4/5] overflow-hidden bg-ivory-200">
              <Image
                src={image}
                alt=""
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-[1400ms] ease-luxe group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-charcoal/10 group-hover:bg-charcoal/25 transition-colors duration-700" />
            </div>
            <div className="mt-6 text-center">
              <h3 className="font-serif text-2xl md:text-3xl text-charcoal mb-2">
                {t(`${key}.title`)}
              </h3>
              <p className="text-sm text-charcoal-500 max-w-md mx-auto mb-4">
                {t(`${key}.description`)}
              </p>
              <span className="link-underline text-charcoal">{t('viewAll')}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
