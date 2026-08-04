'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { X, Upload, Loader2 } from 'lucide-react';

export type ProductFormValues = {
  id?: string;
  sku: string;
  slug: string;
  category:
    | 'ENGAGEMENT_RINGS'
    | 'WEDDING_RINGS'
    | 'NECKLACES'
    | 'EARRINGS'
    | 'BRACELETS'
    | 'LOOSE_DIAMONDS';
  nameEn: string;
  nameHe: string;
  descEn: string;
  descHe: string;
  basePrice: string;
  currency: string;
  isPublished: boolean;
  isFeatured: boolean;
  images: string[];
  diamond: {
    shape:
      | 'ROUND'
      | 'PRINCESS'
      | 'EMERALD'
      | 'OVAL'
      | 'CUSHION'
      | 'PEAR'
      | 'MARQUISE'
      | 'RADIANT'
      | 'ASSCHER'
      | 'HEART';
    caratWeight: string;
    color: string;
    clarity: string;
    cut: string;
    certificate: string;
  } | null;
};

const CATEGORIES: { value: ProductFormValues['category']; label: string }[] = [
  { value: 'ENGAGEMENT_RINGS', label: 'Engagement Rings' },
  { value: 'WEDDING_RINGS', label: 'Wedding Rings' },
  { value: 'NECKLACES', label: 'Necklaces' },
  { value: 'EARRINGS', label: 'Earrings' },
  { value: 'BRACELETS', label: 'Bracelets' },
  { value: 'LOOSE_DIAMONDS', label: 'Loose Diamonds' },
];

const SHAPES: ProductFormValues['diamond'] extends null
  ? never
  : NonNullable<ProductFormValues['diamond']>['shape'][] = [
  'ROUND',
  'PRINCESS',
  'EMERALD',
  'OVAL',
  'CUSHION',
  'PEAR',
  'MARQUISE',
  'RADIANT',
  'ASSCHER',
  'HEART',
];

export function ProductForm({ initial }: { initial: ProductFormValues }) {
  const router = useRouter();
  const [values, setValues] = useState<ProductFormValues>(initial);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [includeDiamond, setIncludeDiamond] = useState(!!initial.diamond);

  const isEdit = !!initial.id;

  function setField<K extends keyof ProductFormValues>(key: K, val: ProductFormValues[K]) {
    setValues((v) => ({ ...v, [key]: val }));
  }

  async function handleFiles(files: FileList | null) {
    if (!files?.length) return;
    setUploading(true);
    setError(null);
    try {
      const uploaded: string[] = [];
      for (const file of Array.from(files)) {
        const fd = new FormData();
        fd.append('file', file);
        const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message ?? 'Upload failed');
        uploaded.push(data.url);
      }
      setValues((v) => ({ ...v, images: [...v.images, ...uploaded] }));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setUploading(false);
    }
  }

  function removeImage(idx: number) {
    setValues((v) => ({ ...v, images: v.images.filter((_, i) => i !== idx) }));
  }

  function moveImage(idx: number, dir: -1 | 1) {
    setValues((v) => {
      const next = [...v.images];
      const target = idx + dir;
      if (target < 0 || target >= next.length) return v;
      [next[idx], next[target]] = [next[target], next[idx]];
      return { ...v, images: next };
    });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      ...values,
      diamond: includeDiamond ? values.diamond : null,
    };

    const url = isEdit ? `/api/admin/products/${initial.id}` : `/api/admin/products`;
    const method = isEdit ? 'PATCH' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message ?? 'Save failed');
      router.push('/admin/products');
      router.refresh();
    } catch (e) {
      setError((e as Error).message);
      setSaving(false);
    }
  }

  async function onDelete() {
    if (!isEdit || !confirm('Delete this product? This cannot be undone.')) return;
    setSaving(true);
    const res = await fetch(`/api/admin/products/${initial.id}`, { method: 'DELETE' });
    if (res.ok) {
      router.push('/admin/products');
      router.refresh();
    } else {
      setError('Delete failed');
      setSaving(false);
    }
  }

  const field = 'w-full bg-white border border-charcoal/20 focus:border-champagne px-4 py-2.5 text-sm outline-none transition-colors';
  const label = 'block text-xs tracking-wider uppercase text-charcoal-500 mb-1.5';

  return (
    <form onSubmit={onSubmit} className="max-w-3xl space-y-10">
      {/* Images */}
      <section className="bg-white p-6 border border-charcoal/10">
        <div className={label}>Images</div>
        <label
          className={`block border-2 border-dashed border-charcoal/20 hover:border-champagne rounded p-8 text-center cursor-pointer transition-colors ${uploading ? 'opacity-60' : ''}`}
        >
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            disabled={uploading}
            onChange={(e) => handleFiles(e.target.files)}
          />
          <div className="flex flex-col items-center gap-2">
            {uploading ? (
              <Loader2 className="animate-spin" size={22} />
            ) : (
              <Upload size={22} className="text-charcoal-500" />
            )}
            <div className="text-sm">
              {uploading ? 'Uploading…' : 'Click or drop images here'}
            </div>
            <div className="text-xs text-charcoal-500">JPG, PNG, WEBP. First image is the cover.</div>
          </div>
        </label>

        {values.images.length > 0 && (
          <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3">
            {values.images.map((url, idx) => (
              <div key={url} className="relative group">
                <div className="relative aspect-[4/5] bg-ivory-200">
                  <Image src={url} alt="" fill sizes="200px" className="object-cover" />
                  {idx === 0 && (
                    <span className="absolute top-1 left-1 px-2 py-0.5 text-[9px] tracking-luxe uppercase bg-charcoal text-ivory">
                      Cover
                    </span>
                  )}
                </div>
                <div className="absolute inset-x-0 bottom-0 flex justify-between p-1 opacity-0 group-hover:opacity-100 transition-opacity bg-charcoal/50">
                  <button type="button" onClick={() => moveImage(idx, -1)} className="text-ivory text-xs px-2">←</button>
                  <button type="button" onClick={() => removeImage(idx)} className="text-ivory">
                    <X size={14} />
                  </button>
                  <button type="button" onClick={() => moveImage(idx, 1)} className="text-ivory text-xs px-2">→</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Basics */}
      <section className="bg-white p-6 border border-charcoal/10 grid md:grid-cols-2 gap-5">
        <div className="md:col-span-2">
          <label className={label} htmlFor="nameEn">Name (English)</label>
          <input id="nameEn" required value={values.nameEn} onChange={(e) => setField('nameEn', e.target.value)} className={field} placeholder="Aurora Solitaire" />
        </div>
        <div className="md:col-span-2">
          <label className={label} htmlFor="nameHe">Name (Hebrew)</label>
          <input id="nameHe" dir="rtl" required value={values.nameHe} onChange={(e) => setField('nameHe', e.target.value)} className={field} placeholder="סוליטר אורורה" />
        </div>
        <div>
          <label className={label} htmlFor="category">Category</label>
          <select id="category" value={values.category} onChange={(e) => setField('category', e.target.value as ProductFormValues['category'])} className={field}>
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-[1fr_100px] gap-2">
          <div>
            <label className={label} htmlFor="basePrice">Price</label>
            <input id="basePrice" required type="number" min="0" step="1" value={values.basePrice} onChange={(e) => setField('basePrice', e.target.value)} className={field} placeholder="12800" />
          </div>
          <div>
            <label className={label} htmlFor="currency">Currency</label>
            <select id="currency" value={values.currency} onChange={(e) => setField('currency', e.target.value)} className={field}>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="ILS">ILS</option>
            </select>
          </div>
        </div>
        <div>
          <label className={label} htmlFor="sku">SKU</label>
          <input id="sku" required value={values.sku} onChange={(e) => setField('sku', e.target.value)} className={field} placeholder="GOR-ER-001" />
        </div>
        <div>
          <label className={label} htmlFor="slug">Slug (URL)</label>
          <input id="slug" required value={values.slug} onChange={(e) => setField('slug', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))} className={field} placeholder="aurora-solitaire" />
        </div>
        <div className="md:col-span-2">
          <label className={label} htmlFor="descEn">Description (English)</label>
          <textarea id="descEn" rows={3} value={values.descEn} onChange={(e) => setField('descEn', e.target.value)} className={field} />
        </div>
        <div className="md:col-span-2">
          <label className={label} htmlFor="descHe">Description (Hebrew)</label>
          <textarea id="descHe" dir="rtl" rows={3} value={values.descHe} onChange={(e) => setField('descHe', e.target.value)} className={field} />
        </div>
        <div className="md:col-span-2 flex items-center gap-6 pt-2">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={values.isPublished} onChange={(e) => setField('isPublished', e.target.checked)} />
            Published
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={values.isFeatured} onChange={(e) => setField('isFeatured', e.target.checked)} />
            Featured
          </label>
        </div>
      </section>

      {/* Diamond specs (optional) */}
      <section className="bg-white p-6 border border-charcoal/10">
        <label className="flex items-center gap-2 text-sm mb-4">
          <input type="checkbox" checked={includeDiamond} onChange={(e) => setIncludeDiamond(e.target.checked)} />
          Include diamond specifications (4Cs)
        </label>
        {includeDiamond && values.diamond && (
          <div className="grid md:grid-cols-3 gap-5">
            <div>
              <label className={label}>Shape</label>
              <select
                value={values.diamond.shape}
                onChange={(e) => setField('diamond', { ...values.diamond!, shape: e.target.value as NonNullable<ProductFormValues['diamond']>['shape'] })}
                className={field}
              >
                {SHAPES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className={label}>Carat weight</label>
              <input type="number" step="0.01" value={values.diamond.caratWeight} onChange={(e) => setField('diamond', { ...values.diamond!, caratWeight: e.target.value })} className={field} placeholder="1.20" />
            </div>
            <div>
              <label className={label}>Color</label>
              <input value={values.diamond.color} onChange={(e) => setField('diamond', { ...values.diamond!, color: e.target.value })} className={field} placeholder="D" />
            </div>
            <div>
              <label className={label}>Clarity</label>
              <input value={values.diamond.clarity} onChange={(e) => setField('diamond', { ...values.diamond!, clarity: e.target.value })} className={field} placeholder="VVS1" />
            </div>
            <div>
              <label className={label}>Cut</label>
              <input value={values.diamond.cut} onChange={(e) => setField('diamond', { ...values.diamond!, cut: e.target.value })} className={field} placeholder="Excellent" />
            </div>
            <div>
              <label className={label}>Certificate # (GIA)</label>
              <input value={values.diamond.certificate} onChange={(e) => setField('diamond', { ...values.diamond!, certificate: e.target.value })} className={field} placeholder="6472999999" />
            </div>
          </div>
        )}
      </section>

      {error && <div className="text-sm text-red-700 bg-red-50 border border-red-200 p-4">{error}</div>}

      <div className="flex items-center justify-between">
        <div>
          {isEdit && (
            <button type="button" onClick={onDelete} className="text-sm text-red-700 hover:underline">
              Delete product
            </button>
          )}
        </div>
        <div className="flex gap-3">
          <button type="button" onClick={() => router.back()} className="btn-outline">Cancel</button>
          <button type="submit" disabled={saving || uploading} className="btn-primary">
            {saving ? 'Saving…' : isEdit ? 'Save changes' : 'Create product'}
          </button>
        </div>
      </div>
    </form>
  );
}
