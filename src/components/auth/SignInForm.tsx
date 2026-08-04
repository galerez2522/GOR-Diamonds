'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export function SignInForm() {
  const t = useTranslations('auth');
  const params = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const res = await signIn('credentials', {
      email: fd.get('email'),
      password: fd.get('password'),
      redirect: false,
    });
    setLoading(false);
    if (res?.error) {
      setError('Invalid credentials');
      return;
    }
    const next = params?.get('next');
    window.location.href = next && next.startsWith('/') ? next : '/account';
  }

  const field = 'w-full bg-transparent border-b border-charcoal/30 focus:border-champagne-dark py-3 text-sm outline-none transition-colors';
  const label = 'block text-[11px] tracking-luxe uppercase text-charcoal-500 mb-1';

  return (
    <form onSubmit={onSubmit} className="space-y-6 max-w-md mx-auto">
      <div>
        <label htmlFor="email" className={label}>{t('email')}</label>
        <input id="email" name="email" type="email" required className={field} />
      </div>
      <div>
        <label htmlFor="password" className={label}>{t('password')}</label>
        <input id="password" name="password" type="password" required className={field} />
      </div>
      {error && <p className="text-sm text-red-700 text-center">{error}</p>}
      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading ? '…' : t('signInCta')}
      </button>
      <p className="text-center text-sm">
        {t('noAccount')}{' '}
        <Link href="/auth/signup" className="link-underline text-champagne-dark">
          {t('signUpCta')}
        </Link>
      </p>
    </form>
  );
}
