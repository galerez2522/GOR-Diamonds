import { setRequestLocale, getTranslations } from 'next-intl/server';
import Image from 'next/image';

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('story');

  return (
    <>
      <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1587467512961-120760940315?auto=format&fit=crop&w=2400&q=80"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/50" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-ivory container-luxe">
          <div className="eyebrow !text-champagne-light mb-4">{t('eyebrow')}</div>
          <h1 className="display-serif text-5xl md:text-7xl max-w-3xl text-balance">
            {t('title')}
          </h1>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-luxe max-w-3xl mx-auto text-center">
          <p className="text-lg md:text-xl text-charcoal-700 leading-loose font-serif">
            {t('body')}
          </p>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container-luxe grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="relative aspect-square">
            <Image
              src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1400&q=80"
              alt=""
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-square">
            <Image
              src="https://images.unsplash.com/photo-1600804340584-c7db2eacf0bf?auto=format&fit=crop&w=1400&q=80"
              alt=""
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}
