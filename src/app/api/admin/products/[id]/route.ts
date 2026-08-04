import { NextResponse } from 'next/server';
import { z } from 'zod';
import { del } from '@vercel/blob';
import { requireAdmin } from '@/lib/require-admin';
import { prisma } from '@/lib/prisma';

const patchSchema = z.object({
  sku: z.string().optional(),
  slug: z.string().regex(/^[a-z0-9-]+$/).optional(),
  category: z
    .enum(['ENGAGEMENT_RINGS', 'WEDDING_RINGS', 'NECKLACES', 'EARRINGS', 'BRACELETS', 'LOOSE_DIAMONDS'])
    .optional(),
  nameEn: z.string().optional(),
  nameHe: z.string().optional(),
  descEn: z.string().optional(),
  descHe: z.string().optional(),
  storyEn: z.string().optional().nullable(),
  storyHe: z.string().optional().nullable(),
  basePrice: z.union([z.string(), z.number()]).transform((v) => String(v)).optional(),
  currency: z.string().optional(),
  isFeatured: z.boolean().optional(),
  isPublished: z.boolean().optional(),
  images: z.array(z.string().url()).optional(),
  diamond: z
    .object({
      shape: z.enum(['ROUND','PRINCESS','EMERALD','OVAL','CUSHION','PEAR','MARQUISE','RADIANT','ASSCHER','HEART']),
      caratWeight: z.union([z.string(), z.number()]).transform((v) => String(v)),
      color: z.string().default(''),
      clarity: z.string().default(''),
      cut: z.string().default(''),
      certificate: z.string().optional().nullable(),
    })
    .optional()
    .nullable(),
});

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Params) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: { images: { orderBy: { order: 'asc' } }, diamond: true },
  });
  if (!product) return NextResponse.json({ message: 'Not found' }, { status: 404 });
  return NextResponse.json({ product });
}

export async function PATCH(req: Request, { params }: Params) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  const { id } = await params;

  const body = await req.json().catch(() => null);
  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ message: 'Invalid input' }, { status: 400 });
  const d = parsed.data;

  const { images, diamond, ...productData } = d;

  await prisma.product.update({
    where: { id },
    data: productData,
  });

  if (images) {
    await prisma.productImage.deleteMany({ where: { productId: id } });
    if (images.length) {
      await prisma.productImage.createMany({
        data: images.map((url, i) => ({ productId: id, url, order: i })),
      });
    }
  }

  if (diamond) {
    await prisma.diamond.upsert({
      where: { productId: id },
      update: {
        shape: diamond.shape,
        caratWeight: diamond.caratWeight,
        color: diamond.color,
        clarity: diamond.clarity,
        cut: diamond.cut,
        certificate: diamond.certificate ?? null,
      },
      create: {
        productId: id,
        shape: diamond.shape,
        caratWeight: diamond.caratWeight,
        color: diamond.color,
        clarity: diamond.clarity,
        cut: diamond.cut,
        certificate: diamond.certificate ?? null,
      },
    });
  } else if (diamond === null) {
    await prisma.diamond.deleteMany({ where: { productId: id } });
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: Request, { params }: Params) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  const { id } = await params;

  // Attempt to remove blob images (best-effort)
  const images = await prisma.productImage.findMany({ where: { productId: id } });
  const blobHost = 'blob.vercel-storage.com';
  const urls = images.map((i) => i.url).filter((u) => u.includes(blobHost));
  if (urls.length) {
    await del(urls).catch(() => null);
  }

  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
