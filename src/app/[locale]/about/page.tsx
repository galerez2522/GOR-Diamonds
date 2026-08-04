import { setRequestLocale, getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/i18n/routing';

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('story');
  const tHero = await getTranslations('hero');

  return (
    <>
      {/* Editorial hero — no image, just typography */}
      <section className="relative bg-charcoal text-ivory pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(176,138,71,0.15),transparent_65%)]" />
        <div className="relative container-luxe max-w-3xl mx-auto text-center">
          <div className="eyebrow !text-champagne-light mb-6">{t('eyebrow')}</div>
          <p className="display-serif text-3xl md:text-5xl leading-[1.15] text-balance font-normal">
            {t('opening')}
          </p>
          <div className="mt-10 h-px w-16 mx-auto bg-champagne" />
        </div>
      </section>

      {/* The poem — the four moments */}
      <section className="py-24 md:py-28">
        <div className="container-luxe max-w-2xl mx-auto text-center">
          <p className="font-serif text-2xl md:text-3xl leading-relaxed text-charcoal-700 italic text-balance">
            {t('poem')}
          </p>
        </div>
      </section>

      {/* Origin — the birth of GØR */}
      <section className="relative bg-ivory-200/40 py-24 md:py-32">
        <div className="container-luxe grid md:grid-cols-2 gap-14 items-center max-w-6xl mx-auto">
          <div className="relative aspect-[4/5]">
            <Image
              src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1400&q=85"
              alt=""
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <div className="eyebrow mb-4">{t('eyebrow')}</div>
            <h2 className="display-serif text-3xl md:text-5xl leading-tight mb-8 text-balance">
              {t('title')}
            </h2>
            <p className="text-charcoal-700 leading-loose text-[15px] md:text-base mb-6">
              {t('philosophy')}
            </p>
            <p className="text-charcoal-700 leading-loose text-[15px] md:text-base">
              {t('vision')}
            </p>
          </div>
        </div>
      </section>

      {/* Selection & Belief */}
      <section className="py-24 md:py-32">
        <div className="container-luxe max-w-3xl mx-auto text-center">
          <p className="font-serif text-xl md:text-2xl leading-loose text-charcoal-700 text-balance mb-16">
            {t('selection')}
          </p>
          <div className="h-px w-16 mx-auto bg-champagne mb-16" />
          <p className="display-serif text-2xl md:text-4xl leading-[1.3] text-charcoal text-balance font-normal">
            {t('belief')}
          </p>
        </div>
      </section>

      {/* Signature — the closing line */}
      <section className="relative bg-charcoal text-ivory py-24 md:py-32 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(176,138,71,0.18),transparent_65%)]" />
        <div className="relative container-luxe text-center max-w-2xl mx-auto">
          <div className="font-display text-2xl md:text-3xl tracking-[0.32em] uppercase text-champagne-light mb-8">
            GØR Diamonds
          </div>
          <p className="display-serif text-3xl md:text-5xl leading-[1.15] italic font-light text-ivory/95 text-balance">
            {t('signature')}
          </p>
          <div className="mt-12">
            <Link
              href="/appointment"
              className="btn bg-champagne text-charcoal hover:bg-champagne-light"
            >
              {tHero('ctaSecondary')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
