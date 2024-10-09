import logout from '@/lib/auth/logout';

export async function GET() {
  await logout();
}
