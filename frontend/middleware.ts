import { NextRequest, NextResponse } from 'next/server';
import updateToken from './lib/tokens/updateToken';
import verifyToken from './lib/tokens/verifyToken';

const protectedRoutes: string[] = [];

export default async function middleware(req: NextRequest) {
  updateToken();

  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);

  const authToken = await verifyToken();

  if (isProtectedRoute && !authToken) {
    return NextResponse.redirect(new URL(`/register/`, req.nextUrl));
  }

  return NextResponse.next();
}
