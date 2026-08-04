import { getServerSession } from 'next-auth';
import { authOptions } from './auth';
import { prisma } from './prisma';

function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const list = (process.env.ADMIN_EMAILS ?? '')
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  return list.includes(email.toLowerCase());
}

/**
 * Returns a session if the current user is an admin (from DB, not JWT).
 * Auto-promotes users whose email is in ADMIN_EMAILS.
 * Returns null otherwise.
 */
export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;

  const dbUser = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { role: true },
  });
  let role = dbUser?.role;

  if (isAdminEmail(session.user.email) && role !== 'ADMIN') {
    await prisma.user.update({
      where: { email: session.user.email },
      data: { role: 'ADMIN' },
    });
    role = 'ADMIN';
  }

  return role === 'ADMIN' ? session : null;
}
