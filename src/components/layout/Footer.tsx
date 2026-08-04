import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Instagram, Facebook, Mail } from 'lucide-react';

export function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const tBrand = useTranslations('brand');

  return (
    <footer className="mt-30 bg-charcoal text-ivory">
      {/* Newsletter */}
      <div className="border-b border-ivory/10">
        <div className="container-luxe py-16 md:py-20 text-center max-w-3xl mx-auto">
          <div className="eyebrow !text-champagne mb-4">{t('newsletter')}</div>
          <h3 className="display-serif text-3xl md:text-4xl mb-4">{tBrand('name')}</h3>
          <p className="text-ivory/70 text-sm md:text-base mb-8 leading-relaxed">
            {t('newsletterBody')}
          </p>
          <form className="flex flex-col sm:flex-row items-stretch gap-3 max-w-lg mx-auto">
            <input
              type="email"
              required
              placeholder={t('emailPlaceholder')}
              className="flex-1 bg-transparent border border-ivory/30 focus:border-champagne
                         px-5 py-3 text-sm text-ivory placeholder:text-ivory/40 outline-none
                         transition-colors"
            />
            <button
              type="submit"
              className="bg-champagne text-charcoal px-8 py-3 text-xs tracking-luxe uppercase
                         hover:bg-champagne-light transition-colors"
            >
              {t('newsletterCta')}
            </button>
          </form>
        </div>
      </div>

      {/* Columns */}
      <div className="container-luxe py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div>
          <h4 className="eyebrow !text-champagne mb-5">{t('explore')}</h4>
          <ul className="space-y-3 text-sm text-ivory/70">
            <li><Link href="/collections/engagement-rings" className="hover:text-champagne">{tNav('engagementRings')}</Link></li>
            <li><Link href="/collections/wedding-rings" className="hover:text-champagne">{tNav('weddingRings')}</Link></li>
            <li><Link href="/collections/necklaces" className="hover:text-champagne">{tNav('necklaces')}</Link></li>
            <li><Link href="/collections/earrings" className="hover:text-champagne">{tNav('earrings')}</Link></li>
            <li><Link href="/collections/bracelets" className="hover:text-champagne">{tNav('bracelets')}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="eyebrow !text-champagne mb-5">{t('service')}</h4>
          <ul className="space-y-3 text-sm text-ivory/70">
            <li><Link href="/appointment" className="hover:text-champagne">{tNav('appointment')}</Link></li>
            <li><a href="#" className="hover:text-champagne">{t('shipping')}</a></li>
            <li><a href="#" className="hover:text-champagne">{t('care')}</a></li>
          </ul>
        </div>
        <div>
          <h4 className="eyebrow !text-champagne mb-5">{t('house')}</h4>
          <ul className="space-y-3 text-sm text-ivory/70">
            <li><Link href="/about" className="hover:text-champagne">{tNav('about')}</Link></li>
            <li><a href="#" className="hover:text-champagne">{t('privacy')}</a></li>
            <li><a href="#" className="hover:text-champagne">{t('terms')}</a></li>
          </ul>
        </div>
        <div>
          <h4 className="eyebrow !text-champagne mb-5">{t('contact')}</h4>
          <ul className="space-y-3 text-sm text-ivory/70">
            <li>Ramat Gan, Israel</li>
            <li><a href="mailto:hello@gordiamonds.com" className="hover:text-champagne">hello@gordiamonds.com</a></li>
            <li>+972 (0) 3 000 0000</li>
          </ul>
          <div className="flex gap-4 mt-6">
            <a href="#" aria-label="Instagram" className="text-ivory/60 hover:text-champagne"><Instagram size={18} /></a>
            <a href="#" aria-label="Facebook" className="text-ivory/60 hover:text-champagne"><Facebook size={18} /></a>
            <a href="mailto:hello@gordiamonds.com" aria-label="Email" className="text-ivory/60 hover:text-champagne"><Mail size={18} /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="container-luxe py-6 text-center text-[11px] tracking-luxe uppercase text-ivory/50">
          © {new Date().getFullYear()} {tBrand('name')}. {t('rights')}
        </div>
      </div>
    </footer>
  );
}
