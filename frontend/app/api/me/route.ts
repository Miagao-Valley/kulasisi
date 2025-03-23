import { NextResponse } from 'next/server';
import { getAuth } from '@/lib/auth/getAuth';

export async function GET() {
  const auth = await getAuth();
  let status = 200;
  if (!auth.isAuthenticated) {
    status = 401;
  }
  return NextResponse.json(auth, { status: status });
}
