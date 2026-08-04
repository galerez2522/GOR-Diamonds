import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';

export function AppointmentCta() {
  const t = useTranslations('appointment');
  const tStory = useTranslations('story');

  return (
    <section className="relative py-32 md:py-44 overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1544376664-80b17f09d399?auto=format&fit=crop&w=2200&q=80"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-charcoal/80" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(176,138,71,0.18),transparent_60%)]" />
      <div className="relative container-luxe text-center text-ivory">
        <div className="font-display text-xs md:text-sm tracking-[0.4em] uppercase text-champagne-light mb-8">
          GØR Diamonds
        </div>
        <p className="display-serif text-3xl md:text-5xl lg:text-6xl leading-[1.15] max-w-3xl mx-auto text-balance italic font-light">
          {tStory('signature')}
        </p>
        <div className="mt-10 h-px w-14 mx-auto bg-champagne/70" />
        <p className="mt-10 max-w-xl mx-auto text-ivory/80 leading-relaxed text-[15px]">
          {t('subtitle')}
        </p>
        <div className="mt-10">
          <Link href="/appointment" className="btn bg-champagne text-charcoal hover:bg-champagne-light">
            {t('title')}
          </Link>
        </div>
      </div>
    </section>
  );
}
