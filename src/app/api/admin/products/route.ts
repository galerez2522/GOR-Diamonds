import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  const role = (session?.user as { role?: string } | undefined)?.role;
  if (role !== 'ADMIN') return null;
  return session;
}

const productSchema = z.object({
  sku: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, 'lowercase letters, digits and dashes only'),
  category: z.enum([
    'ENGAGEMENT_RINGS',
    'WEDDING_RINGS',
    'NECKLACES',
    'EARRINGS',
    'BRACELETS',
    'LOOSE_DIAMONDS',
  ]),
  nameEn: z.string().min(1),
  nameHe: z.string().min(1),
  descEn: z.string().default(''),
  descHe: z.string().default(''),
  storyEn: z.string().optional().nullable(),
  storyHe: z.string().optional().nullable(),
  basePrice: z.union([z.string(), z.number()]).transform((v) => String(v)),
  currency: z.string().default('USD'),
  isFeatured: z.boolean().default(false),
  isPublished: z.boolean().default(true),
  images: z.array(z.string().url()).default([]),
  diamond: z
    .object({
      shape: z.enum([
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
      ]),
      caratWeight: z.union([z.string(), z.number()]).transform((v) => String(v)),
      color: z.string().default(''),
      clarity: z.string().default(''),
      cut: z.string().default(''),
      certificate: z.string().optional().nullable(),
    })
    .optional()
    .nullable(),
});

export async function GET() {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ message: 'Forbidden' }, { status: 403 });

  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      images: { orderBy: { order: 'asc' } },
      diamond: true,
    },
  });
  return NextResponse.json({ products });
}

export async function POST(req: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ message: 'Forbidden' }, { status: 403 });

  const body = await req.json().catch(() => null);
  const parsed = productSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { message: 'Invalid input', issues: parsed.error.issues },
      { status: 400 },
    );
  }
  const d = parsed.data;

  const product = await prisma.product.create({
    data: {
      sku: d.sku,
      slug: d.slug,
      category: d.category,
      nameEn: d.nameEn,
      nameHe: d.nameHe,
      descEn: d.descEn,
      descHe: d.descHe,
      storyEn: d.storyEn ?? null,
      storyHe: d.storyHe ?? null,
      basePrice: d.basePrice,
      currency: d.currency,
      isFeatured: d.isFeatured,
      isPublished: d.isPublished,
      images: {
        create: d.images.map((url, i) => ({ url, order: i })),
      },
      ...(d.diamond
        ? {
            diamond: {
              create: {
                shape: d.diamond.shape,
                caratWeight: d.diamond.caratWeight,
                color: d.diamond.color,
                clarity: d.diamond.clarity,
                cut: d.diamond.cut,
                certificate: d.diamond.certificate ?? null,
              },
            },
          }
        : {}),
    },
  });

  return NextResponse.json({ ok: true, id: product.id });
}
