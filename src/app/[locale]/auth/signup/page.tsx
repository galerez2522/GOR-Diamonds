import { setRequestLocale, getTranslations } from 'next-intl/server';
import { SignUpForm } from '@/components/auth/SignUpForm';

export default async function SignUpPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('auth');

  return (
    <section className="py-20 md:py-28">
      <div className="container-luxe text-center mb-14">
        <div className="eyebrow mb-4"><span className="divider-luxe">GOR Diamonds</span></div>
        <h1 className="display-serif text-4xl md:text-5xl">{t('signUp')}</h1>
      </div>
      <div className="container-luxe">
        <SignUpForm />
      </div>
    </section>
  );
}
