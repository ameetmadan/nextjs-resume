import { MetadataRoute } from 'next';
import { vercelURL } from 'src/helpers/env';

const baseURL = `https://${vercelURL}`;

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
