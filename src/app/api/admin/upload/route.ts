import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { requireAdmin } from '@/lib/require-admin';

export async function POST(req: Request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  const form = await req.formData();
  const file = form.get('file');
  if (!(file instanceof File)) {
    return NextResponse.json({ message: 'No file provided' }, { status: 400 });
  }
  if (!file.type.startsWith('image/')) {
    return NextResponse.json({ message: 'Only image files are allowed' }, { status: 400 });
  }

  const ext = file.name.split('.').pop() || 'jpg';
  const key = `products/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const blob = await put(key, file, {
    access: 'public',
    contentType: file.type,
  });

  return NextResponse.json({ url: blob.url, pathname: blob.pathname });
}
