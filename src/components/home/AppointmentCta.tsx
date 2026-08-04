import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';

export function AppointmentCta() {
  const t = useTranslations('appointment');
  const tCommon = useTranslations('common');

  return (
    <section className="relative py-32 md:py-40 overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1544376664-80b17f09d399?auto=format&fit=crop&w=2200&q=80"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-charcoal/70" />
      <div className="relative container-luxe text-center text-ivory">
        <h2 className="display-serif text-4xl md:text-6xl mb-6 max-w-2xl mx-auto text-balance">
          {t('title')}
        </h2>
        <p className="max-w-xl mx-auto text-ivory/85 mb-10 leading-relaxed">
          {t('subtitle')}
        </p>
        <Link href="/appointment" className="btn bg-ivory text-charcoal hover:bg-champagne">
          {tCommon('learnMore')}
        </Link>
      </div>
    </section>
  );
}
