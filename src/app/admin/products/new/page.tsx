import Link from 'next/link';
import { ProductForm, type ProductFormValues } from '@/components/admin/ProductForm';

const empty: ProductFormValues = {
  sku: '',
  slug: '',
  category: 'ENGAGEMENT_RINGS',
  nameEn: '',
  nameHe: '',
  descEn: '',
  descHe: '',
  basePrice: '',
  currency: 'USD',
  isPublished: true,
  isFeatured: false,
  images: [],
  diamond: null,
};

export default function NewProductPage() {
  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/products" className="text-xs tracking-luxe uppercase text-charcoal-500 hover:text-charcoal">
          ← Products
        </Link>
        <h1 className="font-display text-3xl mt-2">New product</h1>
      </div>
      <ProductForm initial={empty} />
    </div>
  );
}
