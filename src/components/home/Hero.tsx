'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';

export function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="relative h-[100svh] min-h-[720px] w-full overflow-hidden bg-charcoal text-ivory">
      {/* Mobile: full-bleed image + heavy overlay */}
      <div className="lg:hidden absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1400&q=85"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-charcoal/75" />
      </div>

      {/* Desktop SPLIT LAYOUT — copy on reading side, image on the other. Order is set
          by DOM order so RTL/LTR are handled automatically by `dir` on <html>. */}
      <div className="absolute inset-0 hidden lg:grid grid-cols-2">
        {/* Copy column (first in DOM = reading side) */}
        <div className="relative bg-charcoal">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(176,138,71,0.14),transparent_60%)]" />
        </div>

        {/* Image column (second in DOM = far side) */}
        <div className="relative overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1800&q=85"
            alt=""
            fill
            priority
            sizes="50vw"
            className="object-cover object-center scale-105"
          />
          {/* seam gradient blending into the copy side */}
          <div className="pointer-events-none absolute inset-y-0 ltr:left-0 rtl:right-0 w-32 bg-gradient-to-r rtl:bg-gradient-to-l from-charcoal to-transparent" />
          {/* subtle darkening at edges */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.35)_100%)]" />
        </div>
      </div>

      {/* Shared content overlay — sits over the copy column (or full mobile bg) */}
      <div className="relative z-10 h-full flex items-center">
        <div className="w-full px-6 lg:w-1/2 lg:px-14 xl:px-20">
          <div className="max-w-md mx-auto lg:mx-0 text-center lg:text-start">
            <div
              className="eyebrow !text-champagne-light animate-fade-up"
              style={{ animationDelay: '0.1s' }}
            >
              {t('eyebrow')}
            </div>

            <h1
              className="display-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] mt-6 text-balance animate-fade-up font-normal"
              style={{ animationDelay: '0.25s' }}
            >
              {t('title')}
            </h1>

            <div
              className="mt-7 h-px w-14 mx-auto lg:mx-0 bg-champagne animate-fade-up"
              style={{ animationDelay: '0.4s' }}
            />

            <p
              className="mt-7 max-w-md mx-auto lg:mx-0 text-[15px] text-ivory/80 leading-[1.85] animate-fade-up font-light"
              style={{ animationDelay: '0.55s' }}
            >
              {t('subtitle')}
            </p>

            <div
              className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 animate-fade-up"
              style={{ animationDelay: '0.7s' }}
            >
              <Link
                href="/collections/engagement-rings"
                className="btn bg-champagne text-charcoal hover:bg-champagne-light"
              >
                {t('cta')}
              </Link>
              <Link
                href="/appointment"
                className="btn border border-ivory/40 text-ivory hover:bg-ivory hover:text-charcoal"
              >
                {t('ctaSecondary')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
