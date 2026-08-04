import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      id: string;
      role?: 'CUSTOMER' | 'STAFF' | 'ADMIN';
    };
  }
  interface User {
    role?: 'CUSTOMER' | 'STAFF' | 'ADMIN';
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    role?: 'CUSTOMER' | 'STAFF' | 'ADMIN';
  }
}
