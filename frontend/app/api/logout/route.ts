import { NextResponse, NextRequest } from 'next/server';
import logout from '@/lib/auth/logout';

export async function GET(request: NextRequest) {
  await logout();
}
