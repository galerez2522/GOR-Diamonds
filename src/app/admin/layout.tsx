import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { Cinzel, Assistant } from 'next/font/google';
import { authOptions } from '@/lib/auth';
import { requireAdmin } from '@/lib/require-admin';
import '../globals.css';

export const dynamic = 'force-dynamic';

const display = Cinzel({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const sans = Assistant({
  subsets: ['hebrew', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const rawSession = await getServerSession(authOptions);
  if (!rawSession?.user?.email) {
    redirect('/en/auth/signin?next=/admin/products');
  }

  const adminSession = await requireAdmin();

  return (
    <html lang="en" dir="ltr" className={`${display.variable} ${sans.variable}`}>
      <body className="bg-ivory">
        {!adminSession ? (
          <div className="min-h-screen bg-ivory flex items-center justify-center px-6">
            <div className="max-w-md text-center">
              <h1 className="font-display text-3xl mb-4">Access denied</h1>
              <p className="text-charcoal-500 mb-8">
                You are signed in as <b>{rawSession.user.email}</b>, but this account is not an administrator.
              </p>
              <Link href="/" className="btn-outline">Back to site</Link>
            </div>
          </div>
        ) : (
          <div className="min-h-screen flex bg-ivory">
            {/* Sidebar */}
            <aside className="w-64 shrink-0 bg-charcoal text-ivory p-6 flex flex-col">
              <Link href="/" className="font-display text-xl tracking-[0.32em] mb-1">GØR</Link>
              <div className="text-[10px] tracking-luxe uppercase text-champagne-light mb-10">Admin</div>

              <nav className="space-y-1 flex-1">
                <Link href="/admin/products" className="block px-3 py-2 text-sm hover:bg-ivory/10 rounded">
                  Products
                </Link>
                <Link href="/admin/products/new" className="block px-3 py-2 text-sm hover:bg-ivory/10 rounded text-champagne-light">
                  + New product
                </Link>
              </nav>

              <div className="border-t border-ivory/10 pt-4 mt-4">
                <div className="text-xs text-ivory/60 mb-1">Signed in as</div>
                <div className="text-sm truncate">{adminSession.user?.email}</div>
                <Link href="/" className="mt-3 inline-block text-[11px] tracking-luxe uppercase text-ivory/70 hover:text-champagne-light">
                  ← Back to site
                </Link>
              </div>
            </aside>

            <main className="flex-1 p-8 md:p-12 overflow-x-hidden">{children}</main>
          </div>
        )}
      </body>
    </html>
  );
}
