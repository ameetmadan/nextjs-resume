import { MetadataRoute } from 'next';
import { deployOrigin } from '@src/helpers/environment';

// Update this whenever résumé content meaningfully changes. Using
// new Date() here would report "changed" on every deploy, even ones
// that don't touch content, which is misleading to crawlers.
const lastModified = '2026-09-28';

export default function sitemap(): MetadataRoute.Sitemap {
  // no deploy URL (local build): an empty sitemap beats an invalid <loc>
  if (!deployOrigin) {
    return [];
  }

  return [
    {
      url: deployOrigin.origin,
      lastModified,
    },
  ];
}
