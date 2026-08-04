import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';

export function SignatureStory() {
  const t = useTranslations('story');

  return (
    <section className="relative bg-ivory-200/40 py-24 md:py-32 overflow-hidden">
      <div className="container-luxe grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-center">
        <div className="relative aspect-[4/5] w-full">
          <Image
            src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1400&q=80"
            alt=""
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="max-w-xl">
          <div className="eyebrow mb-5">{t('eyebrow')}</div>
          <h2 className="display-serif text-3xl md:text-5xl leading-[1.15] mb-8 text-balance font-normal">
            {t('title')}
          </h2>
          <p className="text-charcoal-700 leading-loose mb-5 text-[15px]">
            {t('philosophy')}
          </p>
          <p className="text-charcoal-700 leading-loose mb-10 text-[15px]">
            {t('vision')}
          </p>
          <Link href="/about" className="btn-outline">
            {t('cta')}
          </Link>
        </div>
      </div>
    </section>
  );
}
