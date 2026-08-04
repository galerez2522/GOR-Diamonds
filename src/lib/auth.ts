import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import bcrypt from 'bcryptjs';
import { prisma } from './prisma';

function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const list = (process.env.ADMIN_EMAILS ?? '')
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  return list.includes(email.toLowerCase());
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/auth/signin',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user?.passwordHash) return null;
        const ok = await bcrypt.compare(credentials.password, user.passwordHash);
        if (!ok) return null;

        // Auto-promote admin emails on sign-in
        let role = user.role;
        if (isAdminEmail(user.email) && role !== 'ADMIN') {
          await prisma.user.update({
            where: { id: user.id },
            data: { role: 'ADMIN' },
          });
          role = 'ADMIN';
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: role as 'CUSTOMER' | 'STAFF' | 'ADMIN',
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as { id: string }).id;
        token.role = (user as { role: 'CUSTOMER' | 'STAFF' | 'ADMIN' }).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string }).id = token.id as string;
        (session.user as { role?: 'CUSTOMER' | 'STAFF' | 'ADMIN' }).role =
          token.role as 'CUSTOMER' | 'STAFF' | 'ADMIN';
      }
      return session;
    },
  },
};
