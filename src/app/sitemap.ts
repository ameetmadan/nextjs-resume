import { MetadataRoute } from 'next';
import { deployURL } from '@src/helpers/environment';

const baseURL = `https://${deployURL ?? ''}`;

// Update this whenever résumé content meaningfully changes. Using
// new Date() here would report "changed" on every deploy, even ones
// that don't touch content, which is misleading to crawlers.
const lastModified = '2026-09-28';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseURL,
      lastModified,
    },
  ];
}
