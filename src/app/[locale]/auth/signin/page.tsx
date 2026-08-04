import { setRequestLocale, getTranslations } from 'next-intl/server';
import { SignInForm } from '@/components/auth/SignInForm';

export const dynamic = 'force-dynamic';

export default async function SignInPage({
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
        <h1 className="display-serif text-4xl md:text-5xl">{t('signIn')}</h1>
      </div>
      <div className="container-luxe">
        <SignInForm />
      </div>
    </section>
  );
}
