import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    include: { images: { orderBy: { order: 'asc' }, take: 1 } },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl">Products</h1>
          <p className="text-sm text-charcoal-500 mt-1">
            {products.length === 0
              ? 'No products yet — click "New product" to add your first piece.'
              : `${products.length} product${products.length === 1 ? '' : 's'}`}
          </p>
        </div>
        <Link href="/admin/products/new" className="btn-primary">
          + New product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="border border-dashed border-charcoal/20 rounded p-16 text-center bg-white">
          <p className="text-charcoal-500 mb-6">Your catalog is empty.</p>
          <Link href="/admin/products/new" className="btn-primary">Add your first product</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <Link
              key={p.id}
              href={`/admin/products/${p.id}`}
              className="group bg-white border border-charcoal/10 hover:border-champagne transition-colors"
            >
              <div className="relative aspect-[4/5] bg-ivory-200">
                {p.images[0] ? (
                  <Image
                    src={p.images[0].url}
                    alt={p.nameEn}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-xs text-charcoal-500">
                    No image
                  </div>
                )}
                {!p.isPublished && (
                  <span className="absolute top-2 left-2 px-2 py-1 text-[10px] tracking-luxe uppercase bg-charcoal text-ivory">
                    Draft
                  </span>
                )}
              </div>
              <div className="p-4">
                <div className="text-xs text-charcoal-500 uppercase tracking-wider mb-1">
                  {p.category.replace(/_/g, ' ').toLowerCase()}
                </div>
                <div className="font-serif text-lg">{p.nameEn}</div>
                <div className="text-sm text-charcoal-500" dir="rtl">{p.nameHe}</div>
                <div className="text-sm mt-2">
                  {p.currency} {p.basePrice.toString()}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
