export function getOs(userAgent: string | null): string | null {
  if (!userAgent) return null;

  const ua = userAgent.toLowerCase();

  if (ua.includes('win')) return 'windows';
  if (ua.includes('mac')) return 'mac';
  if (ua.includes('linux')) return 'linux';
  if (ua.includes('android')) return 'android';
  if (ua.includes('like mac') || ua.includes('ios')) return 'ios';

  return null;
}
