import { NextRequest, NextResponse } from 'next/server';
import getPayload from './lib/tokens/getPayload';

const protectedRoutes: string[] = [];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);

  const payload = await getPayload();

  if (isProtectedRoute && !payload) {
    return NextResponse.redirect(new URL(`/register/`, req.nextUrl));
  }

  return NextResponse.next();
}
