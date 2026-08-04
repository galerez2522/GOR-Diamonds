import { useTranslations } from 'next-intl';
import { Gem, Sparkles, Hand } from 'lucide-react';

export function Craftsmanship() {
  const t = useTranslations('craft');

  const items = [
    { key: 'select', Icon: Gem },
    { key: 'design', Icon: Sparkles },
    { key: 'set', Icon: Hand },
  ] as const;

  return (
    <section className="py-24 md:py-32">
      <div className="container-luxe text-center max-w-2xl mx-auto mb-16">
        <div className="eyebrow mb-4">
          <span className="divider-luxe">{t('eyebrow')}</span>
        </div>
        <h2 className="display-serif text-4xl md:text-5xl mb-6">{t('title')}</h2>
        <p className="text-charcoal-700 leading-relaxed">{t('body')}</p>
      </div>
      <div className="container-luxe grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14">
        {items.map(({ key, Icon }) => (
          <div key={key} className="text-center">
            <div className="mx-auto w-14 h-14 rounded-full border border-champagne/60 flex items-center justify-center text-champagne-dark mb-6">
              <Icon size={22} strokeWidth={1.4} />
            </div>
            <h3 className="font-serif text-2xl mb-3">{t(`items.${key}.title`)}</h3>
            <p className="text-sm text-charcoal-500 max-w-xs mx-auto leading-relaxed">
              {t(`items.${key}.body`)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
