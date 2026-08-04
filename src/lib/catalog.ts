import { prisma } from './prisma';
import { sampleProducts } from './sample-data';
import type { ProductCardData } from '@/components/product/ProductCard';
import type { Category } from '@prisma/client';

const CATEGORY_MAP: Record<string, { db: Category; sample: keyof typeof sampleProducts }> = {
  'engagement-rings': { db: 'ENGAGEMENT_RINGS', sample: 'engagement-rings' },
  'wedding-rings': { db: 'WEDDING_RINGS', sample: 'wedding-rings' },
  necklaces: { db: 'NECKLACES', sample: 'necklaces' },
  earrings: { db: 'EARRINGS', sample: 'earrings' },
  bracelets: { db: 'BRACELETS', sample: 'bracelets' },
  'loose-diamonds': { db: 'LOOSE_DIAMONDS', sample: 'engagement-rings' },
};

export function categoryFromSlug(slug: string) {
  return CATEGORY_MAP[slug];
}

export async function listCategory(slug: string): Promise<ProductCardData[]> {
  const cfg = CATEGORY_MAP[slug];
  if (!cfg) return [];

  const products = await prisma.product.findMany({
    where: { category: cfg.db, isPublished: true },
    include: { images: { orderBy: { order: 'asc' }, take: 2 } },
    orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
  });

  if (products.length === 0) {
    // Fallback to sample data while the catalog is being seeded
    return sampleProducts[cfg.sample] ?? [];
  }

  return products.map((p) => ({
    slug: p.slug,
    nameEn: p.nameEn,
    nameHe: p.nameHe,
    price: Number(p.basePrice),
    currency: p.currency,
    image: p.images[0]?.url ?? '',
    imageHover: p.images[1]?.url,
  }));
}

export async function findProduct(slug: string) {
  const dbProduct = await prisma.product.findUnique({
    where: { slug },
    include: { images: { orderBy: { order: 'asc' } }, diamond: true },
  });

  if (dbProduct) {
    return {
      source: 'db' as const,
      slug: dbProduct.slug,
      nameEn: dbProduct.nameEn,
      nameHe: dbProduct.nameHe,
      descEn: dbProduct.descEn,
      descHe: dbProduct.descHe,
      price: Number(dbProduct.basePrice),
      currency: dbProduct.currency,
      images: dbProduct.images.map((i) => i.url),
      diamond: dbProduct.diamond
        ? {
            shape: dbProduct.diamond.shape,
            caratWeight: Number(dbProduct.diamond.caratWeight),
            color: dbProduct.diamond.color,
            clarity: dbProduct.diamond.clarity,
            cut: dbProduct.diamond.cut,
            certificate: dbProduct.diamond.certificate,
          }
        : null,
    };
  }

  // fall back to sample data
  const sample = Object.values(sampleProducts).flat().find((p) => p.slug === slug);
  if (!sample) return null;
  return {
    source: 'sample' as const,
    slug: sample.slug,
    nameEn: sample.nameEn,
    nameHe: sample.nameHe,
    descEn: '',
    descHe: '',
    price: sample.price,
    currency: sample.currency ?? 'USD',
    images: [sample.image, ...(sample.imageHover ? [sample.imageHover] : [])],
    diamond: null,
  };
}
