import { setRequestLocale, getTranslations } from 'next-intl/server';
import { AppointmentForm } from '@/components/forms/AppointmentForm';

export default async function AppointmentPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('appointment');

  return (
    <section className="py-20 md:py-28">
      <div className="container-luxe max-w-3xl text-center mb-14">
        <div className="eyebrow mb-4">
          <span className="divider-luxe">GOR Diamonds</span>
        </div>
        <h1 className="display-serif text-4xl md:text-6xl mb-6">{t('title')}</h1>
        <p className="text-charcoal-700 leading-relaxed max-w-xl mx-auto">
          {t('subtitle')}
        </p>
      </div>
      <div className="container-luxe">
        <AppointmentForm />
      </div>
    </section>
  );
}
