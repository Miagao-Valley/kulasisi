import { NextResponse } from 'next/server';
import getPayload from '@/lib/tokens/getPayload';

export async function GET() {
  const payload = await getPayload();

  if (!payload) {
    return NextResponse.json(
      { error: 'You are not authenticated' },
      { status: 401 }
    );
  }

  return NextResponse.json(payload, { status: 200 });
}
