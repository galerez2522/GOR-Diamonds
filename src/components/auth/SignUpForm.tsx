'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export function SignUpForm() {
  const t = useTranslations('auth');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const body = Object.fromEntries(fd.entries());
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      setError(err.message ?? 'Registration failed');
      setLoading(false);
      return;
    }
    await signIn('credentials', {
      email: body.email,
      password: body.password,
      redirect: false,
    });
    window.location.href = '/account';
  }

  const field = 'w-full bg-transparent border-b border-charcoal/30 focus:border-champagne-dark py-3 text-sm outline-none transition-colors';
  const label = 'block text-[11px] tracking-luxe uppercase text-charcoal-500 mb-1';

  return (
    <form onSubmit={onSubmit} className="space-y-6 max-w-md mx-auto">
      <div>
        <label htmlFor="name" className={label}>{t('name')}</label>
        <input id="name" name="name" required className={field} />
      </div>
      <div>
        <label htmlFor="email" className={label}>{t('email')}</label>
        <input id="email" name="email" type="email" required className={field} />
      </div>
      <div>
        <label htmlFor="password" className={label}>{t('password')}</label>
        <input id="password" name="password" type="password" required minLength={8} className={field} />
      </div>
      {error && <p className="text-sm text-red-700 text-center">{error}</p>}
      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading ? '…' : t('signUpCta')}
      </button>
      <p className="text-center text-sm">
        {t('hasAccount')}{' '}
        <Link href="/auth/signin" className="link-underline text-champagne-dark">
          {t('signInCta')}
        </Link>
      </p>
    </form>
  );
}
