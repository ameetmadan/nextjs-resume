// Deploy platforms hand us either a bare host (Vercel: `example.com`) or a
// full URL (Netlify: `https://example.com`), so keep a supplied scheme and
// only add one for bare hosts. Throws on a value that can't form a URL
// instead of emitting a broken origin into metadata and the sitemap.
export function resolveOrigin(
  raw: string | undefined,
  defaultProtocol: 'http' | 'https',
): URL | undefined {
  const value = raw?.trim();
  if (!value) {
    return undefined;
  }

  const withScheme = /^[a-z][a-z\d+.-]*:\/\//i.test(value)
    ? value
    : `${defaultProtocol}://${value}`;

  try {
    return new URL(withScheme);
  } catch {
    throw new Error(`Invalid deploy URL: "${value}"`);
  }
}

// undefined when no deploy URL is configured (e.g. a local build)
export const deployOrigin = resolveOrigin(
  process.env.DEPLOY_URL ??
    process.env.URL ??
    process.env.NEXT_PUBLIC_VERCEL_URL,
  process.env.NODE_ENV === 'development' ? 'http' : 'https',
);
