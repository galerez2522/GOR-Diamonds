import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { ProductForm, type ProductFormValues } from '@/components/admin/ProductForm';

export const dynamic = 'force-dynamic';

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: { images: { orderBy: { order: 'asc' } }, diamond: true },
  });
  if (!product) notFound();

  const initial: ProductFormValues = {
    id: product.id,
    sku: product.sku,
    slug: product.slug,
    category: product.category,
    nameEn: product.nameEn,
    nameHe: product.nameHe,
    descEn: product.descEn,
    descHe: product.descHe,
    basePrice: product.basePrice.toString(),
    currency: product.currency,
    isPublished: product.isPublished,
    isFeatured: product.isFeatured,
    images: product.images.map((i) => i.url),
    diamond: product.diamond
      ? {
          shape: product.diamond.shape,
          caratWeight: product.diamond.caratWeight.toString(),
          color: product.diamond.color,
          clarity: product.diamond.clarity,
          cut: product.diamond.cut,
          certificate: product.diamond.certificate ?? '',
        }
      : null,
  };

  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/products" className="text-xs tracking-luxe uppercase text-charcoal-500 hover:text-charcoal">
          ← Products
        </Link>
        <h1 className="font-display text-3xl mt-2">{product.nameEn}</h1>
      </div>
      <ProductForm initial={initial} />
    </div>
  );
}
