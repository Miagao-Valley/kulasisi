import { getLangs } from '@/lib/langs/getLangs';
import { MetadataRoute } from 'next';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!siteUrl) {
    throw new Error('NEXT_PUBLIC_BASE_URL is not defined.');
  }

  const routes = [
    '/',
    '/phrases',
    '/phrases/categories',
    '/dictionary',
    '/dictionary/parts-of-speech',
    '/languages',
    '/users',
    '/tools',
    '/games',
  ];

  const staticRoutes = routes.map((route) => ({
    url: new URL(route, siteUrl).href,
    lastModified: new Date().toISOString(),
  }));

  const { results: langs } = await getLangs();
  const langRoutes = langs.map((lang) => ({
    url: new URL(`/languages/${lang.code}`, siteUrl).href,
    lastModified: new Date().toISOString(),
  }));

  return [...staticRoutes, ...langRoutes];
}
