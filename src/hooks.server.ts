import type { Handle }  from '@sveltejs/kit';
import { redirect }     from '@sveltejs/kit';
import { authService }  from '$lib/services/api/auth';

const PUBLIC_ROUTES  = ['/splash', '/welcome', '/login', '/auth/callback'];

function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some(route => pathname.startsWith(route));
}

function isAppRoute(pathname: string): boolean {
  return !isPublicRoute(pathname);
}

export const handle: Handle = async ({ event, resolve }) => {
  try {
    event.locals.usuario = await authService.me(event.fetch);
  } catch {
    event.locals.usuario = null;
  }

  const { pathname } = event.url;

  if (event.locals.usuario && isPublicRoute(pathname)) {
    redirect(302, '/productos');
  }

  if (!event.locals.usuario && isAppRoute(pathname)) {
    const redirectUrl = encodeURIComponent(pathname + event.url.search);
    redirect(302, `/login?redirect=${redirectUrl}`);
  }

  return resolve(event);
};