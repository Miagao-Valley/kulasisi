import { NextRequest, NextResponse } from 'next/server';
import getAuth from './lib/auth/getAuth';

const protectedRoutes: string[] = ['/settings'];
const restrictedRoutes: string[] = ['/login', '/register'];

export default async function middleware(req: NextRequest) {
  const path =
    req.nextUrl.pathname.endsWith('/') && req.nextUrl.pathname !== '/'
      ? req.nextUrl.pathname.slice(0, -1)
      : req.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.includes(path);
  const isRestrictedRoute = restrictedRoutes.includes(path);

  const { isAuthenticated } = await getAuth();

  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL(`/register/`, req.nextUrl));
  }

  if (isRestrictedRoute && isAuthenticated) {
    return NextResponse.redirect(new URL(`/`, req.nextUrl));
  }

  return NextResponse.next();
}
