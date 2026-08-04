'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { Link, usePathname } from '@/i18n/routing';
import { ShoppingBag, User, Search, Menu, X, Heart } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import { cn } from '@/lib/utils';

const nav = [
  { key: 'engagementRings', href: '/collections/engagement-rings' },
  { key: 'weddingRings', href: '/collections/wedding-rings' },
  { key: 'necklaces', href: '/collections/necklaces' },
  { key: 'earrings', href: '/collections/earrings' },
  { key: 'bracelets', href: '/collections/bracelets' },
  { key: 'about', href: '/about' },
  { key: 'appointment', href: '/appointment' },
] as const;

export function Header() {
  const t = useTranslations('nav');
  const tBrand = useTranslations('brand');
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const count = useCartStore((s) => s.count());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const otherLocale = locale === 'he' ? 'en' : 'he';

  // Header text color: white while transparent over the dark hero, charcoal once
  // scrolled onto the ivory page background.
  const fg = scrolled ? 'text-charcoal' : 'text-ivory';
  const fgHover = 'hover:text-champagne-light';
  const border = scrolled ? 'border-charcoal/10' : 'border-ivory/15';

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-luxe',
        scrolled
          ? 'bg-ivory/95 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.06)]'
          : 'bg-gradient-to-b from-charcoal/40 via-charcoal/15 to-transparent',
      )}
    >
      <div className="container-luxe flex items-center justify-between py-5 md:py-6">
        {/* Left utilities */}
        <div className="flex items-center gap-4 flex-1">
          <button
            className={cn('lg:hidden', fg)}
            aria-label="Menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={20} />
          </button>
          <button aria-label={t('search')} className={cn('hidden lg:block', fg, fgHover, 'transition-colors')}>
            <Search size={18} />
          </button>
          <Link
            href={pathname}
            locale={otherLocale}
            className={cn('hidden lg:inline-block text-[11px] tracking-luxe uppercase transition-colors', fg, fgHover)}
          >
            {otherLocale === 'he' ? 'עברית' : 'English'}
          </Link>
        </div>

        {/* Wordmark — same transparent logo on any background */}
        <Link
          href="/"
          className="flex-1 flex justify-center group"
          aria-label={tBrand('name')}
        >
          <Image
            src="/brand/gor-diamonds-logo-transparent.png"
            alt={tBrand('name')}
            width={789}
            height={532}
            priority
            className={cn(
              'w-auto object-contain transition-all duration-700 ease-luxe group-hover:scale-[1.02]',
              scrolled ? 'h-11 md:h-12' : 'h-14 md:h-16 drop-shadow-[0_4px_18px_rgba(0,0,0,0.35)]',
            )}
          />
        </Link>

        {/* Right utilities */}
        <div className="flex items-center justify-end gap-4 md:gap-5 flex-1">
          <Link href="/account" aria-label={t('account')} className={cn('transition-colors', fg, fgHover)}>
            <User size={18} />
          </Link>
          <Link href="/account/wishlist" aria-label={t('wishlist')} className={cn('hidden md:inline-block transition-colors', fg, fgHover)}>
            <Heart size={18} />
          </Link>
          <Link href="/cart" aria-label={t('cart')} className={cn('relative transition-colors', fg, fgHover)}>
            <ShoppingBag size={18} />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 min-w-[16px] h-4 px-1 rounded-full bg-champagne text-ivory text-[10px] flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Desktop nav */}
      <nav className={cn('hidden lg:block border-t transition-colors duration-500', border)}>
        <div className="container-luxe">
          <ul className="flex items-center justify-center gap-10 py-4">
            {nav.map(({ key, href }) => (
              <li key={key}>
                <Link
                  href={href}
                  className={cn('text-[11px] tracking-luxe uppercase transition-colors', fg, fgHover)}
                >
                  {t(key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={cn(
          'lg:hidden fixed inset-0 z-50 bg-ivory transition-transform duration-500 ease-luxe',
          mobileOpen ? 'translate-x-0' : locale === 'he' ? 'translate-x-full' : '-translate-x-full',
        )}
      >
        <div className="flex items-center justify-between p-6 border-b border-charcoal/10">
          <Image
            src="/brand/gor-diamonds-logo-transparent.png"
            alt={tBrand('name')}
            width={789}
            height={532}
            className="h-10 w-auto object-contain"
          />
          <button onClick={() => setMobileOpen(false)} aria-label="Close">
            <X size={22} />
          </button>
        </div>
        <ul className="p-6 space-y-5">
          {nav.map(({ key, href }) => (
            <li key={key}>
              <Link
                href={href}
                onClick={() => setMobileOpen(false)}
                className="block font-serif text-2xl text-charcoal"
              >
                {t(key)}
              </Link>
            </li>
          ))}
          <li className="pt-6 border-t border-charcoal/10">
            <Link
              href={pathname}
              locale={otherLocale}
              onClick={() => setMobileOpen(false)}
              className="text-xs tracking-luxe uppercase"
            >
              {otherLocale === 'he' ? 'עברית' : 'English'}
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
