import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Exclude API routes, Next internals, static assets, and the /admin panel
  // (admin uses its own auth guard in the layout, not locale routing).
  matcher: ['/((?!api|admin|_next|_vercel|.*\\..*).*)'],
};
