import { setRequestLocale } from 'next-intl/server';
import { getServerSession } from 'next-auth';
import { redirect } from '@/i18n/routing';
import { authOptions } from '@/lib/auth';

export default async function AccountPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect({ href: '/auth/signin', locale });

  return (
    <section className="py-20 md:py-28">
      <div className="container-luxe max-w-2xl">
        <div className="eyebrow mb-4">GOR Diamonds</div>
        <h1 className="display-serif text-4xl md:text-5xl mb-8">
          {session?.user?.name ?? session?.user?.email}
        </h1>
        <div className="border-t border-charcoal/10 pt-6 space-y-4 text-sm text-charcoal-700">
          <p>Email: {session?.user?.email}</p>
        </div>
      </div>
    </section>
  );
}
