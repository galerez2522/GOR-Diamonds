'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';

export function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=2400&q=80"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 via-charcoal/20 to-charcoal/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-end pb-20 md:pb-28 text-center text-ivory container-luxe">
        <div className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <div className="eyebrow !text-champagne-light mb-8 tracking-[0.32em]">
            {t('eyebrow')}
          </div>
        </div>
        <h1
          className="display-serif text-[40px] md:text-6xl lg:text-7xl max-w-4xl text-balance animate-fade-up font-light tracking-wide"
          style={{ animationDelay: '0.25s' }}
        >
          {t('title')}
        </h1>
        <div
          className="mt-6 h-px w-16 bg-champagne/70 animate-fade-up"
          style={{ animationDelay: '0.35s' }}
        />
        <p
          className="mt-8 max-w-xl text-sm md:text-base text-ivory/80 leading-relaxed animate-fade-up font-light"
          style={{ animationDelay: '0.45s' }}
        >
          {t('subtitle')}
        </p>
        <div
          className="mt-12 flex flex-col sm:flex-row items-center gap-4 animate-fade-up"
          style={{ animationDelay: '0.6s' }}
        >
          <Link href="/collections/engagement-rings" className="btn bg-ivory text-charcoal hover:bg-champagne hover:text-charcoal">
            {t('cta')}
          </Link>
          <Link href="/appointment" className="btn border border-ivory/60 text-ivory hover:bg-ivory hover:text-charcoal">
            {t('ctaSecondary')}
          </Link>
        </div>
      </div>
    </section>
  );
}
