'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export function AppointmentForm() {
  const t = useTranslations('appointment.form');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch('/api/appointment', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  const field = 'w-full bg-transparent border-b border-charcoal/30 focus:border-champagne-dark py-3 text-sm outline-none transition-colors';
  const label = 'block text-[11px] tracking-luxe uppercase text-charcoal-500 mb-1';

  return (
    <form onSubmit={onSubmit} className="space-y-6 max-w-xl mx-auto">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className={label} htmlFor="fullName">{t('name')}</label>
          <input id="fullName" name="fullName" required className={field} />
        </div>
        <div>
          <label className={label} htmlFor="email">{t('email')}</label>
          <input id="email" name="email" type="email" required className={field} />
        </div>
        <div>
          <label className={label} htmlFor="phone">{t('phone')}</label>
          <input id="phone" name="phone" className={field} />
        </div>
        <div>
          <label className={label} htmlFor="type">{t('type')}</label>
          <select id="type" name="type" className={field} defaultValue="IN_STORE">
            <option value="IN_STORE">{t('typeInStore')}</option>
            <option value="VIRTUAL">{t('typeVirtual')}</option>
            <option value="PHONE">{t('typePhone')}</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className={label} htmlFor="scheduledAt">{t('date')}</label>
          <input id="scheduledAt" name="scheduledAt" type="datetime-local" required className={field} />
        </div>
        <div className="md:col-span-2">
          <label className={label} htmlFor="interest">{t('interest')}</label>
          <select id="interest" name="interest" className={field}>
            <option value="">—</option>
            <option value="ENGAGEMENT_RINGS">Engagement Rings</option>
            <option value="WEDDING_RINGS">Wedding Rings</option>
            <option value="NECKLACES">Necklaces</option>
            <option value="EARRINGS">Earrings</option>
            <option value="BRACELETS">Bracelets</option>
            <option value="LOOSE_DIAMONDS">Loose Diamonds</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className={label} htmlFor="budget">{t('budget')}</label>
          <input id="budget" name="budget" type="number" min="0" step="100" className={field} />
        </div>
        <div className="md:col-span-2">
          <label className={label} htmlFor="notes">{t('message')}</label>
          <textarea id="notes" name="notes" rows={4} className={field} />
        </div>
      </div>

      <button type="submit" disabled={status === 'loading'} className="btn-primary w-full md:w-auto">
        {status === 'loading' ? '…' : t('submit')}
      </button>

      {status === 'success' && (
        <p className="text-sm text-champagne-dark text-center">{t('success')}</p>
      )}
      {status === 'error' && (
        <p className="text-sm text-red-700 text-center">{t('error')}</p>
      )}
    </form>
  );
}
