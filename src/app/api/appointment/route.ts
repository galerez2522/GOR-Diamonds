import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const CATEGORY_VALUES = [
  'ENGAGEMENT_RINGS',
  'WEDDING_RINGS',
  'NECKLACES',
  'EARRINGS',
  'BRACELETS',
  'LOOSE_DIAMONDS',
] as const;

type CategoryValue = (typeof CATEGORY_VALUES)[number];

const schema = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional().nullable(),
  type: z.enum(['IN_STORE', 'VIRTUAL', 'PHONE']).default('IN_STORE'),
  scheduledAt: z.string().transform((v) => new Date(v)),
  interest: z
    .string()
    .optional()
    .nullable()
    .transform((v) => (v && (CATEGORY_VALUES as readonly string[]).includes(v) ? (v as CategoryValue) : null)),
  budget: z.union([z.string(), z.number()]).optional().nullable(),
  notes: z.string().optional().nullable(),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: 'Invalid input', issues: parsed.error.issues }, { status: 400 });
  }
  const d = parsed.data;

  const budgetNum =
    d.budget && d.budget !== '' ? Number(d.budget) : null;
  const interest = d.interest;

  const appt = await prisma.appointment.create({
    data: {
      fullName: d.fullName,
      email: d.email,
      phone: d.phone ?? null,
      type: d.type,
      scheduledAt: d.scheduledAt,
      interest,
      notes: d.notes ?? null,
    },
  });

  // Also create a CRM lead so the business tracks the request
  await prisma.lead.create({
    data: {
      fullName: d.fullName,
      email: d.email,
      phone: d.phone ?? null,
      budget: budgetNum,
      interest,
      message: d.notes ?? null,
      source: 'APPOINTMENT',
    },
  }).catch(() => null);

  return NextResponse.json({ ok: true, id: appt.id });
}
